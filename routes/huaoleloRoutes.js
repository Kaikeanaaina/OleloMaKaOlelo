const _= require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Huaolelo = mongoose.model('huaolelo')
const WordGroup = mongoose.model('wordgroups')

module.exports = app => {
    app.get('/api/huaolelo', requireLogin, async (req, res) => {
        console.log('reached the back')
        return
    })

    app.post('/api/huaolelo', requireLogin, async (req, res) => {
        console.log('this is the huaolelo posting', req.body)
        return
    })

    app.get('/api/wordGroups', async (req, res) => {
        const wordgroups = await WordGroup.find({}).select({})

        res.send(wordgroups)
    })

    app.post('/api/wordGroup', async (req, res) => {
        console.log('this is the word group posting, ', req.body )
        return
        // if (!req.body.title) {
        //     return res.send('there is no body in the request')
        // }

        // const { title } = req.body
        // const existingTitle = await WordGroup.find({title})

        // if (existingTitle.length) {
        //     return res.send('title already exists in the database')
        // } 

        // const wordGroup = new WordGroup({
        //     title
        // })

        // try {
        //     await wordGroup.save()

        //     res.send(wordGroup)
        //   } catch (err) {
        //     res.status(422).send(err)
        //   }
    })

    app.delete('/api/wordGroups', async (req, res) => {
        return console.log('delete wordgroup')
        //const { title } = req.body

        // const wordGroups = WordGroup.deleteMany({ title }, function (err) {});
        // console.log('these are the deleted wordgroups', wordGroups)
        // try {
        //     await wordGroups.save()
      
        //     res.send(wordGroups)
        //   } catch (err) {
        //     res.status(422).send(err)
        //   }
    })
}
