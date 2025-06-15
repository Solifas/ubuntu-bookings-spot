
// DynamoDB table definition for profiles
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createProfilesTable = {
  TableName: 'profiles',
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
      AttributeName: 'email',
      AttributeType: 'S'
    },
    {
      AttributeName: 'user_type',
      AttributeType: 'S'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'email-index',
      KeySchema: [
        {
          AttributeName: 'email',
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
      IndexName: 'user_type-index',
      KeySchema: [
        {
          AttributeName: 'user_type',
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
// - email (String) - Unique
// - name (String)
// - phone (String)
// - avatar_url (String)
// - user_type (String) - 'provider' or 'client'
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createProfilesTable };
