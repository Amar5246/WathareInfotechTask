const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    ts: {
        type: Date,
        required: true
    },
    machine_status: {
        type: Number,
        required: true
    },
    vibration: {
        type: Number,
        required: true
    }
});

// Specify the collection name explicitly
const Data = mongoose.model('Data', dataSchema, 'sample-data');

module.exports = Data;

