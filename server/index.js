const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Log = require('./schema/log');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log("DB Connection Error:", err));

app.get('/api/logs', async (req, res) => {
  const logs = await Log.find();
  res.json(logs);
});

app.post('/api/newLog', async (req, res) => {
  try {
    const {_id, date, hours, acftType, comments} = req.body;
    const savedLog = await Log.findOneAndUpdate(
      {_id:_id || new mongoose.Types.ObjectId() },
      {date,hours,acftType,comments},
      {upsert: true,new: true}
    );
    res.json(savedLog);
  } catch (err) {
    res.status(500).json({error: "Unable to save log"});
  }
});

app.delete('/api/logs/:id', async (req, res) => {
  try {
    await Log.findByIdAndDelete(req.params.id);
    res.json({message: "Log deleted."});
  } catch (err) {
    res.status(500).json({error: "Unable to delete log."});
  }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

