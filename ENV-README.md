# Environment Variables

This project uses environment variables to configure different aspects of the application, including both frontend and backend settings.

## Available Environment Variables

### Frontend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Base URL for all API requests | `http://localhost:3000` |

### Backend Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `HOST` | Host to bind the server to | `localhost` |
| `PORT` | Port to run the server on | `3000` |
| `NODE_ENV` | Node environment | `development` |

## Environment Files

The project uses different environment files for different environments:

- `.env`: Default environment variables (development)
- `.env.production`: Production environment variables (used when building for production)
- `.env.example`: Example file showing available variables (for documentation)

## How to Use

### Root-Level Configuration

This project uses a single set of environment files at the root level to configure both the frontend and backend applications.

1. Copy `.env.example` to `.env` for local development
2. Modify the values as needed for your environment

### In Frontend Code

Access environment variables in your frontend code using:

```typescript
// In your frontend code
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
```

### In Backend Code

The backend automatically loads environment variables from the root `.env` file using dotenv:

```typescript
// In your backend code
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const nodeEnv = process.env.NODE_ENV ?? 'development';
```

## Building for Different Environments

- Development: `npm run dev` (uses `.env`)
- Production: `npm run build` (uses `.env.production`)

## Adding New Environment Variables

When adding new environment variables:

1. Add them to `.env.example` with documentation
2. Add them to the appropriate environment files (`.env`, `.env.production`)
3. For frontend variables, make sure to prefix with `VITE_` so they are exposed to the client-side code

## Security Considerations

- Never commit sensitive information (API keys, secrets) to version control
- Use `.env.local` for local overrides (this file is git-ignored)
- For production deployments, set environment variables through your hosting platform
