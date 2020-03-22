const mongoose = require('mongoose')
const { Schema } = mongoose
const WordGroup = require('./WordGroup')

const huaoleloSchema = new Schema({
    huaolelo: String,
    definition: String,
    audio: [{title: String, body: String, isShow: Boolean}],
    image: [{title: String, content: String, isShow: Boolean}],
    example: [String],
    audioExample: [{title: String, content: String}],
    wordGroups: [WordGroup],
    date: {type: Date, default: Date.now}
})

mongoose.model('huaolelo', huaoleloSchema)