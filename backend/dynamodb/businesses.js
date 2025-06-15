
// DynamoDB table definition for businesses
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createBusinessesTable = {
  TableName: 'businesses',
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
      AttributeName: 'provider_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'city',
      AttributeType: 'S'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'provider_id-index',
      KeySchema: [
        {
          AttributeName: 'provider_id',
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
      IndexName: 'city-index',
      KeySchema: [
        {
          AttributeName: 'city',
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
// - provider_id (String) - Foreign Key to profiles
// - business_name (String)
// - description (String)
// - address (String)
// - city (String)
// - province (String)
// - postal_code (String)
// - country (String) - Default: 'South Africa'
// - phone (String)
// - email (String)
// - website (String)
// - logo_url (String)
// - business_hours (Map) - JSON object for opening hours
// - is_active (Boolean) - Default: true
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createBusinessesTable };
