const _= require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Huaolelo = mongoose.model('huaolelo')

module.exports = app => {
    app.get('/api/huaolelo', requireLogin, async (req, res) => {
        console.log('reached the back')
        return
    })
}
