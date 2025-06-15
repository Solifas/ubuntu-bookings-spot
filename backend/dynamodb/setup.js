
// DynamoDB setup script - creates all tables
const AWS = require('aws-sdk');
const { createProfilesTable } = require('./profiles');
const { createBusinessesTable } = require('./businesses');
const { createServicesTable } = require('./services');
const { createBookingsTable } = require('./bookings');
const { createBusinessHoursTable } = require('./business_hours');
const { createReviewsTable } = require('./reviews');

// Configure AWS SDK
AWS.config.update({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const dynamodb = new AWS.DynamoDB();

async function createAllTables() {
  const tables = [
    { name: 'profiles', config: createProfilesTable },
    { name: 'businesses', config: createBusinessesTable },
    { name: 'services', config: createServicesTable },
    { name: 'bookings', config: createBookingsTable },
    { name: 'business_hours', config: createBusinessHoursTable },
    { name: 'reviews', config: createReviewsTable }
  ];

  for (const table of tables) {
    try {
      console.log(`Creating table: ${table.name}`);
      const result = await dynamodb.createTable(table.config).promise();
      console.log(`✅ Table ${table.name} created successfully`);
      
      // Wait for table to become active
      await dynamodb.waitFor('tableExists', { TableName: table.name }).promise();
      console.log(`✅ Table ${table.name} is now active`);
      
    } catch (error) {
      if (error.code === 'ResourceInUseException') {
        console.log(`⚠️ Table ${table.name} already exists`);
      } else {
        console.error(`❌ Error creating table ${table.name}:`, error);
      }
    }
  }
}

// Run the setup
if (require.main === module) {
  createAllTables()
    .then(() => {
      console.log('🎉 All DynamoDB tables setup complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Setup failed:', error);
      process.exit(1);
    });
}

module.exports = { createAllTables };
