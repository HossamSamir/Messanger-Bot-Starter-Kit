const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: '<PAGE_TOKEN>',
  verify: '<WEBHOOK_VERIFY>',
  app_secret: '<APP_SECRET>'
})

bot.on('error', (err) => {
  console.log(err.message);
})



//handle coming texts
bot.on('message', (payload, reply) => {

  let text = payload.message.text;

  switch (text) {
    case 'hi':
    case 'hey':
    case 'hello':
      bot.on('message', (payload, reply, actions) => {
        reply({ text: 'hi there :D !'}, (err, info) => {})
      })
      break;
    default:
      bot.on('message', (payload, reply, actions) => {
        reply({ text: 'wassup ;) ?'}, (err, info) => {})
      })
  }

})



//handle coming postbacks
bot.on('postback', (payload, reply, actions) => {

  switch (payload.postback.payload) {


    case "USER_DEFINED_PAYLOAD_ONE":
      bot.on('message', (payload, reply, actions) => {
        reply({ text: 'hey!'}, (err, info) => {})
      })
      break;

    default:
      bot.on('message', (payload, reply, actions) => {
        reply({ text: 'this is a default message!'}, (err, info) => {})
      })
  }

})



http.createServer(bot.middleware()).listen(3000)
console.log('Echo bot server running at port 3000.')
