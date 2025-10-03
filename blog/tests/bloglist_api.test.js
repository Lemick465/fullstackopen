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
  assert(titles.includes(newBlog.title))
})

after(async () => {
  await mongoose.connection.close()
})
