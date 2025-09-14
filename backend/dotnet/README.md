# BookSpot .NET Backend

This folder contains an AWS Lambda backend for BookSpot written in C# and targeting .NET 8.

## Features
- AWS Lambda running ASP.NET Core controllers via API Gateway
- DynamoDB persistence for core entities (profiles, businesses, services, bookings, business hours, reviews)
- CQRS pattern implemented with MediatR
- Dependency injection and async/await usage

## Build and Deploy
1. Ensure the [.NET SDK 8.0](https://dotnet.microsoft.com/) is installed.
2. Restore and build:
   ```bash
   dotnet restore
   dotnet build
   ```
3. Deploy using the AWS Lambda Tools for .NET:
   ```bash
   dotnet tool install -g Amazon.Lambda.Tools
   dotnet lambda deploy-function
   ```

The default configuration deploys a function named `bookspot-api` in `us-east-1`.

## API
Each core entity exposes CRUD endpoints. For example:

- `GET /profiles/{id}` – retrieve a profile
- `POST /businesses` – create a business
- `PUT /services/{id}` – update a service
- `DELETE /bookings/{id}` – remove a booking

Handlers for these endpoints are implemented as separate commands and queries following the CQRS pattern.
