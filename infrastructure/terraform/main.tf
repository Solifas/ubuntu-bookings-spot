terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.65"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  bucket_name = coalesce(var.bucket_name, "${var.project_slug}-${var.environment}")
  dist_path   = "${path.module}/../../dist"
  files       = fileset(local.dist_path, "**")

  mime_types = {
    css          = "text/css"
    html         = "text/html"
    ico          = "image/x-icon"
    js           = "text/javascript"
    json         = "application/json"
    map          = "application/json"
    png          = "image/png"
    svg          = "image/svg+xml"
    txt          = "text/plain"
    webmanifest  = "application/manifest+json"
    webp         = "image/webp"
    woff2        = "font/woff2"
  }
}

resource "aws_s3_bucket" "website" {
  bucket        = local.bucket_name
  force_destroy = true

  tags = {
    Project     = var.project_slug
    Environment = var.environment
  }
}

resource "aws_s3_bucket_public_access_block" "website" {
  bucket                  = aws_s3_bucket.website.id
  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_versioning" "website" {
  bucket = aws_s3_bucket.website.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_s3_bucket_server_side_encryption_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

resource "aws_s3_bucket_website_configuration" "website" {
  bucket = aws_s3_bucket.website.id

  index_document {
    suffix = var.index_document
  }

  error_document {
    key = var.error_document
  }
}

data "aws_iam_policy_document" "public_read" {
  statement {
    sid       = "PublicReadGetObject"
    effect    = "Allow"
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.website.arn}/*"]

    principals {
      type        = "*"
      identifiers = ["*"]
    }
  }
}

resource "aws_s3_bucket_policy" "public_read" {
  bucket = aws_s3_bucket.website.id
  policy = data.aws_iam_policy_document.public_read.json
}

resource "aws_s3_object" "assets" {
  for_each = { for file in local.files : file => file }

  bucket = aws_s3_bucket.website.id
  key    = each.key
  source = "${local.dist_path}/${each.value}"
  etag   = filemd5("${local.dist_path}/${each.value}")

  content_type = lookup(
    local.mime_types,
    regex("([^.]+)$", each.value)[0],
    "application/octet-stream"
  )

  cache_control = contains(var.cacheable_paths, each.key) ? "public, max-age=604800, immutable" : "no-cache"

  depends_on = [aws_s3_bucket_website_configuration.website]
}
