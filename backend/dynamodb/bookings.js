
// DynamoDB table definition for bookings
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB();

const createBookingsTable = {
  TableName: 'bookings',
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
      AttributeName: 'client_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'provider_id',
      AttributeType: 'S'
    },
    {
      AttributeName: 'booking_date',
      AttributeType: 'S'
    },
    {
      AttributeName: 'status',
      AttributeType: 'S'
    }
  ],
  GlobalSecondaryIndexes: [
    {
      IndexName: 'client_id-index',
      KeySchema: [
        {
          AttributeName: 'client_id',
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
      IndexName: 'booking_date-index',
      KeySchema: [
        {
          AttributeName: 'booking_date',
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
      IndexName: 'status-index',
      KeySchema: [
        {
          AttributeName: 'status',
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
// - service_id (String) - Foreign Key to services
// - client_id (String) - Foreign Key to profiles
// - provider_id (String) - Foreign Key to profiles
// - business_id (String) - Foreign Key to businesses
// - booking_date (String) - YYYY-MM-DD format
// - start_time (String) - HH:MM format
// - end_time (String) - HH:MM format
// - status (String) - 'pending', 'confirmed', 'completed', 'cancelled', 'no_show'
// - client_name (String)
// - client_email (String)
// - client_phone (String)
// - service_name (String)
// - service_price (Number) - Price in cents
// - duration_minutes (Number)
// - notes (String)
// - cancellation_reason (String)
// - payment_status (String) - 'pending', 'paid', 'refunded', 'failed'
// - created_at (String) - ISO timestamp
// - updated_at (String) - ISO timestamp

module.exports = { createBookingsTable };
