const helper = require('./test_helper')
const { test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/blog')
const supertest = require('supertest')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('check if blog has a unique id', async () => {
  const blogs = await helper.blogsInDB()
  const verifyIdExist = Object.hasOwn(blogs[0], 'id')
  assert.strictEqual(verifyIdExist, true)
})

test('check if blogs are saved successfully', async () => {
  const initialBlogs = await helper.blogsInDB()

  const newBlog = {
    title: 'A blog created by test',
    author: 'Test Author',
    url: 'http://example.com/test-blog',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()

  assert.strictEqual(blogsAtEnd.length, initialBlogs.length + 1)

  const titles = blogsAtEnd.map((blog) => blog.title)
  assert.strictEqual(titles.includes(newBlog.title), true)
})

test('set default value if likes property is missing', async () => {
  const newBlog = {
    title: 'A blog created by test',
    author: 'Test Author',
    url: 'http://example.com/test-blog',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const recentSave = blogsAtEnd.find((blog) => blog.title === newBlog.title)
  const likesFieldExist = Object.hasOwn(recentSave, 'likes')
  assert.strictEqual(likesFieldExist, true)
  assert.strictEqual(recentSave.likes, 0)
})

test('status code 400 is returned if title or url is missing', async () => {
  const newBlog = {
    // title: 'A blog created by test',
    author: 'Test Author',
    url: 'http://example.com/test-blog',
    likes: 0,
  }

  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('delete a blog successfully', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDB()
  const titlesAtEnd = blogsAtEnd.map((b) => b.title)

  assert.strictEqual(blogsAtStart.length - 1, blogsAtEnd.length)
  assert.strictEqual(titlesAtEnd.includes(blogToDelete.title), false)
})

test('blog is updated successfully', async () => {
  const blogsAtStart = await helper.blogsInDB()
  const blogToUpdate = { ...blogsAtStart[0], likes: 130 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDB()
  const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id)
  assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
})

after(async () => {
  await mongoose.connection.close()
})
