const mongoose = require('mongoose');

const levelSchema = mongoose.Schema({
    userID: String,
    xp: Number,
    level: Number,
    totxp: Number,
})

module.exports = mongoose.model("Level", levelSchema);