// @flow

import _ from 'lodash'
import messageHandler from './lib/messageHandler'

export const homePage = () => null

export const fbMessageCtrl = (req: Object) => {
  const data = req.body
  _.each(data.entry, (entry) => {
    _.each(entry.messaging, (event) => {
      messageHandler(event)
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
