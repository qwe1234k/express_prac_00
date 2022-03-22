const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    PostId: {
        type: String,
        required: true,
        unique: true
    },
    NowDate: {
        type: String,
        required: true,
    },
    Name: {
        type: String,
        required: true,
    },
    Pw: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("poster", schema);