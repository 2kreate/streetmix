/* eslint-env jest */
import request from 'supertest'
import express from 'express'
import admin from '../admin'
import bodyParser from 'body-parser'

function setupMockServer () {
  const app = express()

  app.use(bodyParser.json())
  app.post('/api/v1/admin', admin.post)
  app.get('/api/v1/admin', function (req, res) { res.status(400).send('You do not belong here!') })

  return app
}

describe('test /api/v1/admin GET and POST', function () {
  const app = setupMockServer()

  // I understand that this GET test is somewhat arbitrary,
  // but I left it anyway
  it('makes a GET request', () => {
    return request(app)
      .get('/api/v1/admin')
      .then((response) => {
        expect(response.statusCode).toEqual(400)
      })
  })

  it('respond with 201 created', function (done) {
    request(app)
      .post('/api/v1/admin')
      .send({
        email: 'test@email.com',
        name: 'name',
        dob: '2018-04-16T08:44:55+00:00'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })

  it('respond with 201 created', function (done) {
    request(app)
      .post('/api/v1/admin')
      .send({
        name: 'name',
        dob: '2018-04-16T08:44:55+00:00'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })
})
