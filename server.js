const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

/*
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
*/
app.use(express.static('frontend'));

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});

app.use(bodyParser.json());

// POST endpoint to save JSON data
app.post('/api/storeData', (req, res) => {
  const data = req.body;

  // Read the existing data from the file
  let jsonData = { mapData: [] };
  try {
    if (fs.existsSync('database/data.json')) {
      const fileData = fs.readFileSync('database/data.json', 'utf8');
      jsonData = JSON.parse(fileData);
    }
  } catch (err) {
    console.log('Error', err);
  }

  // Append the new data to the existing data
  jsonData.mapData.push(data);

  // Write the updated data to the file
  fs.writeFileSync('database/data.json', JSON.stringify(jsonData));

  res.json({
    success: true,
    message: 'Data added successfully'
  });
});

// GET endpoint to retrieve JSON data
app.get('/api/getData', (req, res) => {
  // Read the data from the file
  let jsonData = { mapData: [] };
  try {
    if (fs.existsSync('database/data.json')) {
      const fileData = fs.readFileSync('database/data.json', 'utf8');
      jsonData = JSON.parse(fileData);
    }
  } catch (err) {
    console.log('Error', err);
  }
  res.json(jsonData);
});

// running server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));