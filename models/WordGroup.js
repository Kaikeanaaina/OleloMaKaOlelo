const mongoose = require('mongoose')
const { Schema } = mongoose

const wordGroupSchema = new Schema ({
    title: String,
    isShow: {type: Boolean, default: false}
})

mongoose.model('wordgroups', wordGroupSchema)