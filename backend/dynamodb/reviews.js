
// DynamoDB table definition for reviews
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createReviewsTable = {
  TableName: 'reviews',
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
      AttributeName: 'booking_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'provider_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'business_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'rating',
      AttributeType: 'N'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'booking_id-index',
      KeySchema: [
        {
          AttributeName: 'booking_id',
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
      IndexName: 'business_id-rating-index',
      KeySchema: [
        {
          AttributeName: 'business_id',
          KeyType: 'HASH'
        },
        {
          AttributeName: 'rating',
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
// - booking_id (String) - Foreign Key to bookings (unique)
// - client_id (String) - Foreign Key to profiles
// - provider_id (String) - Foreign Key to profiles
// - business_id (String) - Foreign Key to businesses
// - service_id (String) - Foreign Key to services
// - rating (Number) - 1-5 star rating
// - review_text (String)
// - is_public (Boolean) - Default: true
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createReviewsTable };
