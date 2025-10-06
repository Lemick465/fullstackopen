const helper = require('./test_helper')
const { describe, test, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')

const api = supertest(app)

describe('blogs', async () => {
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
})

describe('users', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'testUser', name: 'test', passwordHash })
    await user.save()
  })

  test('are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('can be created', async () => {
    const userAtStart = await helper.usersInDB()

    const newUser = {
      username: 'nextUser',
      name: 'next',
      password: 'txen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    const usernames = usersAtEnd.map((user) => user.username)
    assert(usernames.includes('nextUser'))

    assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)
  })

  test('are not created if invalid', async () => {
    const usersAtStart = await helper.usersInDB()

    const invalidUser = {
      username: 'ab',
      name: 'testName',
      password: 'emaNtset',
    }

    await api
      .post('/api/users')
      .send(invalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDB()
    const usernames = usersAtEnd.map((user) => user.username)
    assert(!usernames.includes('ab'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('with duplcate usernames are not allowed', async () => {
    const duplcateUser = {
      username: 'testUser',
      name: 'test',
      password: 'sekret',
    }

    const response = await api
      .post('/api/users')
      .send(duplcateUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('expected `username` to be unique'))
  })

  test('with missing fields are not created', async () => {
    const newUser = {
      name: 'trial',
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('username and password are required'))
  })

  test('with short passwords are not created', async () => {
    const newUser = {
      username: 'newUser',
      name: 'trial',
      password: '12'
    }

    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(response.body.error.includes('password is too short'))
  })
})

after(async () => {
  await mongoose.connection.close()
})
