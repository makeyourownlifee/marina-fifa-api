const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Dummy data (minta)
let tournaments = [
    { id: 1, name: 'FIFA 2022', year: 2022 },
    { id: 2, name: 'FIFA 2026', year: 2026 },
];

// API végpontok
app.get('/api/tournaments', (req, res) => {
    res.json(tournaments);
});

app.post('/api/tournaments', (req, res) => {
    const { name, year } = req.body;
    const newTournament = {
        id: tournaments.length + 1,
        name,
        year,
    };
    tournaments.push(newTournament);
    res.status(201).json(newTournament);
});

app.post('/api/results', (req, res) => {
    const { team1Name, team2Name, team1Score, team2Score } = req.body;
    // Eredmények kezelése itt (lehet adatbázisba mentés)
    res.status(201).json({ message: "Eredmény sikeresen felvéve!" });
});

// Server indítása
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
