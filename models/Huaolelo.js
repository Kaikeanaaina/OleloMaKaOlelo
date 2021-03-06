const mongoose = require('mongoose')
const { Schema } = mongoose
const WordGroup = require('./WordGroup')

const huaoleloSchema = new Schema({
    huaolelo: String,
    unuhi: String,
    audio: [{title: String, body: String, isShow: Boolean}],
    image: [{title: String, content: String, isShow: Boolean}],
    example: [String],
    audioExample: [{title: String, content: String}],
    wordGroups: [WordGroup],
    dateCreated: {type: Date, default: Date.now},
    dateLastEdited: Date,
})

mongoose.model('huaolelo', huaoleloSchema)