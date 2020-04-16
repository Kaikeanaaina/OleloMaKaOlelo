const _ = require('lodash')
const Path = require('path-parser')
const { URL } = require('url')
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')

const Huaolelo = mongoose.model('huaolelo')
const WordGroup = mongoose.model('wordgroups')

module.exports = app => {
    app.get('/api/huaolelo', requireLogin, async (req, res) => {
        const naHuaolelo = await Huaolelo.find({}).select({})
        res.send(naHuaolelo)
    })

    app.post('/api/huaolelo', requireLogin, async (req, res) => {
        const { huaoleloHou, unuhi, wordGroup } = req.body
        const huaoleloInDatabase = await Huaolelo.find({ huaoleloHou }).select({})

        if(huaoleloInDatabase.length){
            return res.send({error: 'HuaOlelo already exists'})
        }

        const arrayString = huaoleloHou.split('')
        const firstLetterWillCapital = arrayString[0].toUpperCase()
        arrayString.splice(0, 1, firstLetterWillCapital)

        var readyToCapitalize = false
        var theIndexCapitalize = 0

        arrayString.forEach((element) => {
            if (element === ' ') {
                theIndexCapitalize++
                return readyToCapitalize = true
            }
            if (readyToCapitalize) {
                arrayString.splice(theIndexCapitalize, 1, element.toUpperCase())
                readyToCapitalize = false
                theIndexCapitalize++
                return
            }
            theIndexCapitalize++
            return
        })

        var theIndexOkina = 0
        arrayString.forEach((element) => {
            if (element === "'"){
                arrayString.splice(theIndexOkina, 1, "ʻ")
                theIndexOkina++
                return
            }
            theIndexOkina++
            return 
        })

        const joiningAllTheStringLetters = arrayString.join('')

        // // create new object for audio
        // // var audioObject1 = {title: req.body.audioTitleOne, body: req.body.audioOne}
        // // var audioObject2 = {title: req.body.audioTitleTwo, body: req.body.audioTwo}
        // // var audioObject3 = {title: req.body.audioTitleThree, body: req.body.audioThree}
        // // var audioObject4 = {title: req.body.audioObjectFour, body: req.body.audioFour}
        // // var allAudioArray = [audioObject1, audioObject2, audioObject3, audioObject4]

        // // create new object for image        
        // // var imageObject1 = {title: req.body.imageTitleOne, body: req.body.imageOne}
        // // var imageObject2 = {title: req.body.imageTitleTwo, body: req.body.imageTwo}
        // // var imageObject3 = {title: req.body.imageTitleThree, body: req.body.imageThree}
        // // var imageObject4 = {title: req.body.imageTitleFour, body: req.body.imageFour}
        // // var allImageArray = [imageObject1, imageObject2, imageObject3, imageObject4]

        // // create array of examples
        // // var exampleArray = [
        // // req.body.exampleOne, 
        // // req.body.exampleTwo, 
        // // req.body.exampleThree, 
        // // req.body.exampleFour
        // // ]

        // // create new object for audio example
        // // var audioExampleObject1 = {title: req.body.audioExampleTitleOne, body: req.body.audioExampleOne}
        // // var audioExampleObject2 = {title: req.body.audioExampleTitleTwo, body: req.body.audioExampleTwo}
        // // var audioExampleObject3 = {title: req.body.audioExampleTitleThree, body: req.body.audioExampleThree}
        // // var audioExampleObject4 = {title: req.body.audioExampleTitleFour, body: req.body.audioExampleFour}
        // // var allAudioExampleArray = [audioExampleObject1, audioExampleObject2, audioExampleObject3, audioExampleObject4]

        // // validator for new huaolelo

        // //create a new Huaolelo
        // // huaolelo: req.body.huaoleloHou.toUpperCase()
        // // unuhi: req.body.unuhi
        // // wordGroups: req.body.wordGroup //this is where we connect to the WordGroup Schema
        // // audio: allImageArray,
        // // image: allImageArray,
        // // example: exampleArray,
        // // audioExample: allAudioExampleArray

        const huaoleloHouCreated = new Huaolelo({
            huaolelo: joiningAllTheStringLetters,
            unuhi: unuhi,
            wordGroups: wordGroup
        })

        try {
            await huaoleloHouCreated.save()
            const allHuaolelo = await Huaolelo.find({}).select({})
            res.send(allHuaolelo)
        } catch (err) {
            res.status(422).send(err)
        }
    })

    app.get('/api/wordGroups', requireLogin, async (req, res) => {
        const wordgroups = await WordGroup.find({}).select({})
        res.send(wordgroups)
    })

    app.post('/api/wordGroup', requireLogin, async (req, res) => {

        if (!req.body) {
            return res.send({ error: 'there is no body in the request' })
        }

        const { newWordGroup, newWordGroupUnuhi } = req.body
        const arrayString = newWordGroup.split('')
        const firstLetterWillCapital = arrayString[0].toUpperCase()
        arrayString.splice(0, 1, firstLetterWillCapital)

        var readyToCapitalize = false
        var theIndexCapitalize = 0

        arrayString.forEach((element) => {
            if (element === ' ') {
                theIndexCapitalize++
                return readyToCapitalize = true
            }
            if (readyToCapitalize) {
                arrayString.splice(theIndexCapitalize, 1, element.toUpperCase())
                readyToCapitalize = false
                theIndexCapitalize++
                return
            }
            theIndexCapitalize++
            return
        })

        var theIndexOkina = 0
        arrayString.forEach((element) => {
            if (element === "'"){
                arrayString.splice(theIndexOkina, 1, "ʻ")
                theIndexOkina++
                return
            }
            theIndexOkina++
            return 
        })

        const joiningAllTheStringLetters = arrayString.join('')
        const existingTitle = await WordGroup.find({ title: newWordGroup.toUpperCase() })

        if (existingTitle.length) {
            return res.send({ error: 'title already exists in the database' })
        }

        const wordGroup = new WordGroup({
            title: joiningAllTheStringLetters,
            unuhi: newWordGroupUnuhi
        })

        try {
            await wordGroup.save()
            const wordgroups = await WordGroup.find({}).select({})
            res.send(wordgroups)
        } catch (err) {
            res.status(422).send(err)
        }
    })

    app.put('/api/wordGroup', requireLogin, async (req, res) => {
        console.log('11111111111PUT', req.body)

        // if (!req.body) {
        //     return res.send({ error: 'there is no body in the request' })
        // }

        // const { editWordGroup, editWordGroupUnuhi, _id } = req.body

        // const arrayString = editWordGroup.split('')
        // const firstLetterWillCapital = arrayString[0].toUpperCase()
        // arrayString.splice(0, 1, firstLetterWillCapital)

        // var readyToCapitalize = false
        // var theIndex = 0

        // arrayString.forEach((element) => {
        //     if (element === ' ') {
        //         theIndex++
        //         return readyToCapitalize = true
        //     }
        //     if (readyToCapitalize) {
        //         arrayString.splice(theIndex, 1, element.toUpperCase())
        //         readyToCapitalize = false
        //         theIndex++
        //         return
        //     }
        //     theIndex++
        //     return
        // })

        // var theIndexOkina = 0
        // arrayString.forEach((element) => {
        //     if (element === "'"){
        //         arrayString.splice(theIndexOkina, 1, "ʻ")
        //         theIndexOkina++
        //         return
        //     }
        //     theIndexOkina++
        //     return 
        // })

        // const joiningAllTheStringLetters = arrayString.join('')

        // const wordGroupToEdit = await WordGroup.find({ _id })

        // if (!wordGroupToEdit.length) {
        //     return res.send({ error: 'title does not exists' })
        // }

        // try {
        //     await WordGroup.updateMany({ _id }, { $set: { title: joiningAllTheStringLetters, unuhi: editWordGroupUnuhi } })

        //     const wordgroups = await WordGroup.find({}).select({})
        //     return res.send(wordgroups)
        // } catch (err) {
        //     res.status(422).send(err)
        // }
    })

    app.delete('/api/wordGroup/:id', requireLogin, async (req, res) => {
        console.log('2222222222DELETE', req.params.id)
        // try {
        //     await WordGroup.deleteOne({ title: req.params.id })
        //     const wordgroups = await WordGroup.find({}).select({})
        //     return res.send(wordgroups)
        // } catch (err) {
        //     res.status(422).send(err)
        // }
    })
}
