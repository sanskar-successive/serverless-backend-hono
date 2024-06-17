import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('using cloudflare workers with hono!')
})

export default app
