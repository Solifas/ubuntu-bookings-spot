output "bucket_name" {
  description = "S3 bucket hosting the static site."
  value       = aws_s3_bucket.website.id
}

output "website_endpoint" {
  description = "Regional S3 website endpoint."
  value       = aws_s3_bucket_website_configuration.website.website_endpoint
}

output "website_url" {
  description = "HTTP URL to reach the site."
  value       = "http://${aws_s3_bucket_website_configuration.website.website_endpoint}"
}
