const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change if needed

app.use(bodyParser.json());

// Replace <username>, <password>, and <dbname> in this URI
const mongoURI = 'mongodb+srv://MahekPatel:Mahek724@cluster0.vmdziee.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define schema
const sensorDataSchema = new mongoose.Schema({
  towerId: Number,
  timestamp: { type: Date, required: true },
  temperature: Number,
  humidity: Number,
  pressure: Number,
  gas_resistance: Number,
  altitude: Number,
  voltage: Number
});

// Create model
const SensorData = mongoose.model('SensorData', sensorDataSchema);

// POST route to receive sensor data
app.post('/api/sensor', async (req, res) => {
  try {
    const data = new SensorData(req.body);
    await data.save();
    res.status(201).json({ message: 'Data saved successfully', data });
  } catch (err) {
    res.status(400).json({ error: 'Failed to save data', details: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
