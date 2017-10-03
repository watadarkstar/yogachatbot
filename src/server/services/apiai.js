import apiai from 'apiai'
import { APIAI_ACCESS_TOKEN } from '../../config/keys'

export default (recipientID, messageText, success, error) => {
  console.log('apiai called')
  const app = apiai(APIAI_ACCESS_TOKEN)
  const request = app.textRequest(messageText, {
    sessionId: recipientID,
  })
  request.on('response', success)
  request.on('error', error)
  request.end()
}
