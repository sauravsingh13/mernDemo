import request from 'supertest'
import app from '../src/app'

describe('API basic', () => {
  it('health returns ok', async () => {
    const res = await request(app).get('/health')
    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
  })
})
