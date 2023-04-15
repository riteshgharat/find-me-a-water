const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

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
  let jsonData = [];
  try {
    jsonData = JSON.parse(fs.readFileSync('database/data.json'));
  } catch (err) {
    console.log('Error', err);
  }
  // Append the new data to the existing data
  jsonData.push(data);

  // Write the updated data to the file
  fs.writeFileSync('databse/data.json', JSON.stringify(jsonData));

  res.json({ success: true, message: 'Data added successfully' });
});

// GET endpoint to retrieve JSON data
app.get('/api/getData', (req, res) => {
  // Read the data from the file
  let jsonData = [];
  try {
    jsonData = JSON.parse(fs.readFileSync('database/data.json'));
  } catch (err) {
    console.log('Error', err);
  }
  res.json(jsonData);
});

// running server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));