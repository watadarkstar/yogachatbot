// @flow

import _ from 'lodash'

export const homePage = () => null

export const fbMessageCtrl = (req: Object) => {
  const data = req.body
  console.log(data)
  _.each(data.entry, (entry) => {
    _.each(entry.messaging, (event) => {
      if (event.message) {
        console.log('Message', event.message)
      } else {
        console.log('Webhook recieved unknown event')
      }
    })
  })
}

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})
