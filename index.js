import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3001;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_FILE = path.join(__dirname, 'data', 'tournaments.json');

app.use(cors());
app.use(express.json());

app.get('/api/tournaments', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data file');
    res.json(JSON.parse(data));
  });
});

app.post('/api/tournaments', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error reading data file');
    const tournaments = JSON.parse(data);
    tournaments.push(req.body);
    fs.writeFile(DATA_FILE, JSON.stringify(tournaments, null, 2), (err) => {
      if (err) return res.status(500).send('Error writing data file');
      res.status(201).send('Tournament added');
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});