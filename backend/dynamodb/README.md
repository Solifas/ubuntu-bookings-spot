
# BookSpot DynamoDB Schema

DynamoDB table definitions for the BookSpot application.

## Tables Overview

### Core Tables
- **profiles**: User accounts for both providers and clients
- **businesses**: Service provider business information  
- **services**: Services offered by businesses
- **bookings**: Appointment bookings between clients and providers
- **business_hours**: Provider availability schedules
- **reviews**: Client reviews and ratings for completed services

## DynamoDB Design Patterns

### Primary Keys
- All tables use a single partition key (id) for simple access patterns
- UUID strings are used as primary keys for global uniqueness

### Global Secondary Indexes (GSI)
- **profiles**: email-index, user_type-index
- **businesses**: provider_id-index, city-index
- **services**: business_id-index, category-index
- **bookings**: client_id-index, provider_id-index, booking_date-index, status-index
- **business_hours**: business_id-day_of_week-index (composite)
- **reviews**: booking_id-index, provider_id-index, business_id-rating-index (composite)

### Access Patterns Supported
1. Get user profile by ID or email
2. List businesses by provider or city
3. List services by business or category
4. List bookings by client, provider, date, or status
5. Get business hours by business and day
6. List reviews by booking, provider, or business with rating sort

## Setup Instructions

1. **Configure AWS Credentials**:
   ```bash
   export AWS_REGION="us-east-1"
   export AWS_ACCESS_KEY_ID="your-access-key"
   export AWS_SECRET_ACCESS_KEY="your-secret-key"
   ```

2. **Install Dependencies**:
   ```bash
   npm install aws-sdk
   ```

3. **Run Setup Script**:
   ```bash
   node setup.js
   ```

## Field Types

### DynamoDB Attribute Types Used
- **S**: String (text, UUIDs, timestamps)
- **N**: Number (integers, decimals)
- **BOOL**: Boolean (true/false)
- **M**: Map (nested objects like business_hours)

### Timestamp Format
All timestamps stored as ISO 8601 strings:
```javascript
created_at: new Date().toISOString()
```

### Price Storage
Prices stored as numbers in cents to avoid decimal precision issues:
```javascript
price: 2500 // R25.00
```

## Capacity Planning

### Initial Provisioned Throughput
- **Read Capacity**: 10 RCU per table, 5 RCU per GSI
- **Write Capacity**: 10 WCU per table, 5 WCU per GSI

### Scaling Recommendations
- Monitor CloudWatch metrics
- Enable auto-scaling for production
- Consider on-demand billing for unpredictable workloads

## Query Examples

### Get User Profile
```javascript
const params = {
  TableName: 'profiles',
  Key: { id: { S: 'user-uuid' } }
};
```

### List Services by Business
```javascript
const params = {
  TableName: 'services',
  IndexName: 'business_id-index',
  KeyConditionExpression: 'business_id = :bid',
  ExpressionAttributeValues: {
    ':bid': { S: 'business-uuid' }
  }
};
```

### Get Business Hours
```javascript
const params = {
  TableName: 'business_hours',
  IndexName: 'business_id-day_of_week-index',
  KeyConditionExpression: 'business_id = :bid AND day_of_week = :dow',
  ExpressionAttributeValues: {
    ':bid': { S: 'business-uuid' },
    ':dow': { N: '1' } // Monday
  }
};
```

