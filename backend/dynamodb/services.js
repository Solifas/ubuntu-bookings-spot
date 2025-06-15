
// DynamoDB table definition for services
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createServicesTable = {
  TableName: 'services',
  KeySchema: [
    {
      AttributeName: 'id',
      KeyType: 'HASH' // Partition key
    }
  ],
  AttributeDefinitions: [
    {
      AttributeName: 'id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'business_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'category',
      AttributeType: 'S'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'business_id-index',
      KeySchema: [
        {
          AttributeName: 'business_id',
          KeyType: 'HASH'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    },
    {
      IndexName: 'category-index',
      KeySchema: [
        {
          AttributeName: 'category',
          KeyType: 'HASH'
        }
      ],
      Projection: {
        ProjectionType: 'ALL'
      },
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 10,
    WriteCapacityUnits: 10
  }
};

// Fields stored in DynamoDB:
// - id (String) - Primary Key
// - business_id (String) - Foreign Key to businesses
// - name (String)
// - description (String)
// - duration_minutes (Number)
// - price (Number) - Price in cents
// - currency (String) - Default: 'ZAR'
// - category (String)
// - is_active (Boolean) - Default: true
// - image_url (String)
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createServicesTable };
