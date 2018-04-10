/* eslint-env jest */
import request from 'supertest'
import express from 'express'
import admin from '../admin'

function setupMockServer () {
  const app = express()

  app.post('api/v1/admin', admin.post)

  return app
}

describe('post api/v1/admin', function () {
  const app = setupMockServer()

  it('makes a GET request', () => {
    return request(app)
      .post('/api/v1/admin')
      .then((response) => {
        expect(response.statusCode).toEqual(400)
      })
  })
})
