import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
// import { serveStatic } from 'hono/serve-static'
import { cors } from 'hono/cors'
const app = new Hono()


type BLOG = {
  id: number,
  title: string,
  content: string
}

const blogs: BLOG[] = [];


app.use('/api/*', cors());
app.use('/api/*', basicAuth({
  username: 'ankraft',
  password: '1234'
}))

// app.use('/static/*', serveStatic({ root: './' }));
// app.use('/', serveStatic({ path: './index.html' }));

app.get('/api/blogs', (c) => {
  return c.json(blogs);
})

app.get('/api/blogs/:id', (c) => {
  const { id } = c.req.param();
  const blog = blogs.filter((data) => {
    if (data.id === parseInt(id)) return 1;
    return -1;
  });

  return c.json(blog);
})

app.post('/api/blogs', async (c) => {
  const body = await c.req.parseBody() as unknown as BLOG;
  if (!body) {
    return c.json({ status: 401, message: 'Request payload is required' });
  }

  const newBlog = {
    id: blogs.length + 1,
    title: body.title,
    content: body.content
  }
  blogs.push(newBlog);
  return c.json({ data: newBlog });
})

export default app