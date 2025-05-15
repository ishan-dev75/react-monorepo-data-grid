import express from 'express';
import { users } from './data/users';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables from the root .env file
dotenv.config({ path: resolve(__dirname, '../../../.env') });

// Get environment variables with fallbacks
const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const nodeEnv = process.env.NODE_ENV ?? 'development';

const app = express();

// Add CORS middleware
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse JSON bodies
app.use(express.json());

app.get('/', (_req, res) => {
  res.send({
    message: `Hello API`,
    environment: nodeEnv,
    server: `${host}:${port}`
  });
});

// Users API endpoint
app.get('/api/users', (_req, res) => {
  res.json(users);
});

app.listen(port, host, () => {
  console.log(`[ ready ] Server running in ${nodeEnv} mode at http://${host}:${port}`);
});
