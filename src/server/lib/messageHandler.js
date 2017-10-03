import request from 'request'
import { FB_PAGE_ACCESS_TOKEN } from '../../config/keys'
import apiai from '../services/apiai'

const callSendAPI = (messageData) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: FB_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData,
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const recipientId = body.recipient_id
      const messageId = body.message_id
      console.log('Successfully sent generic message with id %s to recipient %s', messageId, recipientId)
    } else {
      console.error('Unable to send message.')
      // console.error(response)
      console.error(error)
    }
  })
}

const sendTextMessage = (recipientID, messageText) => {
  const messageData = {
    recipient: {
      id: recipientID,
    },
    message: {
      text: messageText,
    },
  }
  callSendAPI(messageData)
}

const interpretMessage = (recipientID, messageText) => {
  apiai(recipientID, messageText, (response) => {
    // console.log('response', response.result)
    const responseMessageText = response.result.fulfillment.speech
    sendTextMessage(recipientID, responseMessageText)
  }, (error) => {
    console.log(error)
  })
}

export default (event) => {
  const { message, timestamp } = event
  const senderID = event.sender.id
  const recipientID = event.recipient.id
  const messageText = message ? message.text : null

  console.log('Received message for user %d and page %d at %d', senderID, recipientID, timestamp)

  // if it's a message interpret it otherwise it was a delivery recipient
  if (messageText) {
    interpretMessage(senderID, messageText)
  }
}
