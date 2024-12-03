# 🛠️ LS1124 Application

A modern ls1124 system built with Next.js, TypeScript, Prisma, Knex and Docker.

https://github.com/user-attachments/assets/1ee7b6aa-e0a0-445c-b755-4c4e656dd81e


## 📥 Installation

```bash
# Clone the repository
git clone https://github.com/lateemaspencer/ls1124.git

# Install dependencies
pnpm install

# Setup environment variables
cp .env.example .env

# Generate prisma file
pnpm prisma generate

# Run database migrations
pnpm db:migrate

# Run seed files
pnpx knex seed:run

# Start development server
pnpm dev
```

## 🐳 Docker Database Setup

### PostgreSQL Container and PGAdmin Container

```
docker compose up -d
```

### Connecting to the Database

1. Access pgAdmin at http://localhost:5050
2. Login with:
   - Email: admin@admin.com
   - Password: admin
3. Add new server in pgAdmin:
   - Name: ls1124
   - Host: host.docker.internal
   - Port: 5432
   - Database: ls1124
   - Username: postgres
   - Password: postgres

### Environtmental Variables

Add to your .env file

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ls1124"
```

#### This setup provides:

- Isolated database environment
- Web-based database management
- Persistent data storage
- Easy database administration

## PRISMA VISUALIZATION TOOL

### You can interact directly with the Prisma database and view your Schema by running

```
pnpm prisma studio
```

This should launch a browser automatically at
http://localhost:5555/

## Caching

- There is React Query for Caching and optimistic updates.
- You should see an icon at the bottom right of your browser (this represents the react query dev tools)

## 🏗️ Architecture Overview

### Core Design Principles

- 🔒 **Repository Pattern** for data access abstraction
- 🎯 **Domain-Driven Design** for business logic organization
- 🧪 **Test-Driven Development** approach
- 🔄 **Clean Architecture** for separation of concerns

### Project Structure

```
src/
├── components/    # UI components
├── dal/          # Data Access Layer (Repositories)
├── lib/          # Shared utilities
├── models/       # Domain models
└── schemas/      # Validation schemas
```

## 🔒 Security Benefits

### Data Access Security

- Repositories abstract data access mechanisms
- Centralized interface controls data modifications
- Input validation and sanitization at repository level

### SQL Injection Protection

- Enforced parameterized queries
- Consistent input sanitization
- Protected query execution

### 💡 Key Features

### Repository Pattern Benefits

- Database agnostic implementation
- Centralized caching strategies
- Cross-cutting concerns management
- Service Layer Architecture
- Dependency injection for testability
- Business rules encapsulation
- Complex calculations handling

### 🧪 Testing Strategy

- Unit tests for business logic
- Component tests for UI

### 📱 UI/UX Features

- Consistent design system
- Accessibility compliance
- Responsive design
- Performance optimization
- Light and Dark Theme
