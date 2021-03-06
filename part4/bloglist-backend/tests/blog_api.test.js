const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper');
const Blog = require('../models/blog');
const app = require('../app');
const api = supertest(app);


beforeEach(async () => {
  jest.setTimeout(7000); // CRANK UP timeout, otherwise tests fail!
  await Blog.remove({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs/')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const titles = response.body.map(r => r.title);
  expect(titles).toContain('React patterns');
});


test('blog without content is not added', async () => {
  const newBlog = {
    likes: 5
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(blogsAtEnd.length);
});

test('a specific blog can be viewed', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  console.log('expected ', blogToView);
  console.log('got ', resultBlog.body);

  expect(resultBlog.body).toEqual(blogToView);
});

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

  const titles = blogsAtEnd.map(r => r.title);

  expect(titles).not.toContain(blogToDelete.title);
});

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'Some Blog',
    author: 'Peter Corleone',
    url: 'https://corleone.com/'
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd.length).toBe(blogsAtEnd.length) + 1;

  const titles = blogsAtEnd.map(n => n.title);
  expect(titles).toContain('Some Blog');
});

afterAll(() => {
  mongoose.connection.close();
});

