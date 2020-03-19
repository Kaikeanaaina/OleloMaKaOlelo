const {GoogleId} = require('../config/dev')

module.exports = (req, res, next) => {
    if (!req.user) {
      return res.status(401).send({ error: 'You must log in!'})
    }

    if (req.user.googleId===GoogleId) {
      return res.status(401).send({ error: 'You are not my master!!!'})
    }
  
    next()
  }

  //this is for protecting backend queries/routes
  //this is an example of how to use

// const keys = require('../config/keys')
// const stripe = require('stripe')(keys.stripeSecretKey)
// const requireLogin = require('../middlewares/requireLogin')

// module.exports = app => {
//   app.post('/api/stripe', requireLogin, async (req, res) => {

//     const charge = await stripe.charges.create({
//       amount: 500,
//       currency: 'usd',
//       description: '$5 for 5 credits',
//       source: req.body.id
//     })

//     req.user.credits += 5
//     const user = await req.user.save()

//     res.send(user)
//   })
// }







//========================= or 




// app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
//   const { title, subject, body, recipients } = req.body

//   const survey = new Survey({
//     title,
//     subject,
//     body,
//     recipients: recipients.split(',').map(email => ({ email: email.trim() })),
//     _user: req.user.id,
//     dateSent: Date.now()
//   })

//   // great place to send an email!
//   const mailer = new Mailer(survey, surveyTemplate(survey) )

//   try {
//     await mailer.send()
//     await survey.save()
//     req.user.credits -= 1
//     const user = await req.user.save()

//     res.send(user)
//   } catch (err) {
//     res.status(422).send(err)
//   }

// })