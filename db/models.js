const mongoose = require('mongoose')

/**
 * ### Supported methods
 * - `Model.deleteMany()`
 * - `Model.deleteOne()`
 * - `Model.find()`
 * - `Model.findById()`
 * - `Model.findByIdAndDelete()`
 * - `Model.findByIdAndRemove()`
 * - `Model.findByIdAndUpdate()`
 * - `Model.findOne()`
 * - `Model.findOneAndDelete()`
 * - `Model.findOneAndRemove()`
 * - `Model.findOneAndReplace()`
 * - `Model.findOneAndUpdate()`
 * - `Model.replaceOne()`
 * - `Model.updateMany()`
 * - `Model.updateOne()`
 */
const Schema = {
    browsingHistory: new mongoose.Schema({
        url: {
            type: String,
            required: true,
            trim: false
        },
        frequency: {
            type: Number,
            required: true,
            trim: true
        },
        lastUpdated: {
            type: String,
            required: true,
            trim: true
        },
    })
}

const models = {
    browsingHistory: mongoose.model('browsingHistory', Schema.browsingHistory)
}

module.exports = models;
