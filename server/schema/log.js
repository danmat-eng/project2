const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
    date: String,
    hours: Number,
    acftType: String,
    comments: String
});

module.exports = mongoose.model('FlightLog', LogSchema)