const forceDatabaseRefresh = false;

// I'm imagining here that dotenv is "listening" to the .env file in this src folder
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves static files in the entire client's dist folder
const clientPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientPath));

app.use(express.json());
app.use(routes);

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});


// What exactly does force do here?
sequelize.sync({force: forceDatabaseRefresh}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});