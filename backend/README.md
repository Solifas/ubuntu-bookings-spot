
# BookSpot Database Schema

This folder contains the SQL schema files for the BookSpot application database.

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

- **Row Level Security (RLS)**: All tables have appropriate RLS policies
- **Audit Trails**: Created/updated timestamps on all tables
- **Data Integrity**: Foreign key constraints and check constraints
- **Performance**: Indexes on frequently queried columns
- **Flexibility**: JSON fields for complex data like business hours

## Setup Instructions

1. Connect your Lovable project to Supabase
2. Run the SQL files in your Supabase SQL editor in this order:
   - `profiles.sql`
   - `businesses.sql`
   - `services.sql`
   - `business_hours.sql`
   - `bookings.sql`
   - `reviews.sql`
   - Or run `setup.sql` to create everything at once

## Field Descriptions

### Profiles
- Stores both provider and client information
- Links to Supabase Auth users
- User type determines access permissions

### Businesses
- One business per provider
- Stores location and contact information
- Business hours stored as JSON for flexibility

### Services
- Multiple services per business
- Price in cents for precision
- Duration in minutes

### Bookings
- Links client, provider, service, and business
- Stores booking time slots
- Multiple status states for workflow
- Denormalized client/service info for historical accuracy

### Business Hours
- One record per day of week per business
- Supports break times
- Flexible open/closed status

### Reviews
- One review per completed booking
- 1-5 star rating system
- Optional text feedback
- Public/private visibility control
