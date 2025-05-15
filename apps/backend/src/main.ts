import express from 'express';
import { users } from './data/users';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

// Add CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ message: 'Hello API' });
});

// Users API endpoint
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
