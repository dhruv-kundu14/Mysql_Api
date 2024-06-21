// server side

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3004;
const mysql = require('mysql2');

// Database connection
const conn = mysql.createConnection({
  host: 'your_host_name',
  user: 'your_user_name',
  password: 'your_password',
  database: 'your_database_name',
});

conn.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1); // Exit the process with an error code
  } else {
    console.log('DB connected');
  }
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/greet', (req, res) => {
  res.status(200).json({ message: 'Hello, welcome to our application!' });
});

// Create a new marker
app.post('/createMarker', (req, res) => {
  const { name, latitude, longitude, description } = req.body;
  const sql = 'INSERT INTO `geomaker` (name, latitude, longitude, description) VALUES (?, ?, ?, ?)';
  conn.query(sql, [name, latitude, longitude, description], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Marker created', markerId: result.insertId });
  });
});

// Get all markers
app.get('/getMarkers', (req, res) => {
  const sql = 'SELECT * FROM `YOUR_TABLE_NAME`';
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

// Get a marker by ID
app.get('/getMarker/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM `YOUR_TABLE_NAME` WHERE id = ?';
  conn.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'Marker not found' });
    }
    res.status(200).json(result[0]);
  });
});

// Update a marker
app.put('/updateMarker/:id', (req, res) => {
  const { id } = req.params;
  const { name, latitude, longitude, description } = req.body;
  const sql = 'UPDATE `YOUR_TABLE_NAME` SET name = ?, latitude = ?, longitude = ?, description = ? WHERE id = ?';
  conn.query(sql, [name, latitude, longitude, description, id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Marker not found' });
    }
    res.status(200).json({ message: 'Marker updated' });
  });
});

// Delete a marker
app.delete('/deleteMarker/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM `YOUR_TABLE_NAME` WHERE id = ?';
  conn.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Marker not found' });
    }
    res.status(200).json({ message: 'Marker deleted' });
  });
});

// Start the server
app.listen(port, () => {
  console.log('Server started listening on port :' + port);
});
