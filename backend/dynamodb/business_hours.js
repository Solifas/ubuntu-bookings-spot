
// DynamoDB table definition for business_hours
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createBusinessHoursTable = {
  TableName: 'business_hours',
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
      AttributeName: 'day_of_week',
      AttributeType: 'N'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'business_id-day_of_week-index',
      KeySchema: [
        {
          AttributeName: 'business_id',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'day_of_week',
          KeyType: 'RANGE'
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
// - day_of_week (Number) - 0 = Sunday, 6 = Saturday
// - is_open (Boolean) - Default: true
// - open_time (String) - HH:MM format
// - close_time (String) - HH:MM format
// - break_start_time (String) - HH:MM format
// - break_end_time (String) - HH:MM format
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createBusinessHoursTable };
