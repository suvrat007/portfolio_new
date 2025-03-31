const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TopFourSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    github: {type: String, required: true},
})

module.exports = mongoose.model('TopFourSchema', TopFourSchema);