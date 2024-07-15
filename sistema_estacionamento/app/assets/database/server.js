const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'parking',
    password: 'BemVindo!',
    port: 5432,
});

app.use(bodyParser.json());

app.post('/vehicles', async (req, res) => {
    const { plate, owner, entryTime, exitTime, value } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO vehicles (plate, owner, entry_time, exit_time, value) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [plate, owner, entryTime, exitTime, value]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/vehicles/:id', async (req, res) => {
    const { id } = req.params;
    const { exitTime, value } = req.body;
    try {
        const result = await pool.query(
            'UPDATE vehicles SET exit_time = $1, value = $2 WHERE id = $3 RETURNING *',
            [exitTime, value, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});