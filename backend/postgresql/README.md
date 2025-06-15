
# BookSpot PostgreSQL Schema

PostgreSQL database schema for the BookSpot application.

## Tables Overview

### Core Tables
- **profiles**: User accounts for both providers and clients
- **businesses**: Service provider business information
- **services**: Services offered by businesses
- **bookings**: Appointment bookings between clients and providers
- **business_hours**: Provider availability schedules
- **reviews**: Client reviews and ratings for completed services

## Table Relationships

```
profiles (providers) → businesses → services
                   ↓
profiles (clients) → bookings ← services
                   ↓
                 reviews
```

## Key Features

### Data Integrity
- **Foreign Key Constraints**: Proper referential integrity
- **Check Constraints**: Data validation at database level
- **Unique Constraints**: Prevent duplicate data
- **NOT NULL Constraints**: Ensure required fields

### Performance Optimization
- **Primary Indexes**: On all primary keys (UUID)
- **Foreign Key Indexes**: On all foreign key columns
- **Composite Indexes**: For common query patterns
- **Partial Indexes**: For filtered queries

### Audit & Timestamps
- **created_at/updated_at**: Automatic timestamping
- **Triggers**: Auto-update timestamps on record changes
- **Historical Data**: Denormalized fields for historical accuracy

## Setup Instructions

### Prerequisites
```sql
-- Required PostgreSQL extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Installation Options

#### Option 1: Run Individual Files
```bash
psql -d your_database -f profiles.sql
psql -d your_database -f businesses.sql
psql -d your_database -f services.sql
psql -d your_database -f business_hours.sql
psql -d your_database -f bookings.sql
psql -d your_database -f reviews.sql
```

#### Option 2: Run Setup Script
```bash
psql -d your_database -f setup.sql
```

## Field Specifications

### UUID Fields
All primary keys use `UUID DEFAULT gen_random_uuid()`

### Timestamp Fields
- **created_at**: `TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- **updated_at**: `TIMESTAMP WITH TIME ZONE DEFAULT NOW()`
- Auto-updated via triggers

### Price Fields
- Stored as `DECIMAL(10,2)` for precision
- Supports up to 99,999,999.99

### JSON Fields
- **business_hours**: Flexible schedule storage
- Indexed with GIN for efficient querying

## Views

### business_summary
Aggregated business data with statistics:
```sql
SELECT * FROM business_summary 
WHERE city = 'Cape Town' 
ORDER BY average_rating DESC;
```

### booking_summary
Detailed booking information:
```sql
SELECT * FROM booking_summary 
WHERE booking_date = CURRENT_DATE 
AND status = 'confirmed';
```

## Common Queries

### Find Available Time Slots
```sql
SELECT bh.open_time, bh.close_time
FROM business_hours bh
JOIN businesses b ON bh.business_id = b.id
WHERE b.id = $1 
AND bh.day_of_week = EXTRACT(DOW FROM $2)
AND bh.is_open = true;
```

### Get Business Reviews
```sql
SELECT r.rating, r.review_text, r.created_at, p.name as client_name
FROM reviews r
JOIN profiles p ON r.client_id = p.id
WHERE r.business_id = $1 
AND r.is_public = true
ORDER BY r.created_at DESC;
```

### Calculate Business Rating
```sql
SELECT 
    AVG(rating) as average_rating,
    COUNT(*) as total_reviews
FROM reviews 
WHERE business_id = $1 
AND is_public = true;
```

## Indexes

### Single Column Indexes
- All foreign keys
- Frequently queried fields (email, status, date)
- Boolean flags (is_active, is_public)

### Composite Indexes
- `(provider_id, booking_date)` - Provider schedule
- `(client_id, booking_date)` - Client bookings
- `(business_id, rating)` - Business reviews
- `(business_id, day_of_week)` - Business hours

## Constraints

### Check Constraints
- Rating: 1-5 range
- Day of week: 0-6 range
- Valid time ranges
- Positive durations and prices

### Unique Constraints
- One business per provider
- One review per booking
- Unique business hours per day

## Backup & Migration

### Backup Schema
```bash
pg_dump -s -d your_database > schema_backup.sql
```

### Backup Data
```bash
pg_dump -a -d your_database > data_backup.sql
```

### Migration Scripts
Consider using tools like:
- **Flyway**: Version-controlled migrations
- **Liquibase**: Database change management
- **PostgreSQL Extensions**: pg_migrate, pgmigrate

