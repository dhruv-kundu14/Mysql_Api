//server side

const express = require('express');
const app = express();
const cors = require('cors');
const port = 3004;
const mysql = require('mysql2');

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

app.post('/create', (req, res) => {
  console.log(req.body);
  res.status(200).json({ message: 'Data received', data: req.body });
});

app.get('/getMarkers', (req, res) => {
  const sql = 'SELECT * FROM `geomaker`';
  conn.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(result);
  });
});

// Start the server
app.listen(port, () => {
  console.log('Server started listening on port :' + port);
});
