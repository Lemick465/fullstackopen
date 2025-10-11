const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Exploring the JavaScript Universe',
    author: 'Alice Johnson',
    url: 'https://example.com/js-universe',
    likes: 125,
  },
  {
    title: 'Deep Dive into MongoDB',
    author: 'Bob Smith',
    url: 'https://example.com/mongodb-deep-dive',
    likes: 98,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'toBeRemoved',
    author: 'someAuthor',
    url: 'https://example.com/mongodb-deep-dive',
    likes: 1,
  })

  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})
  return users.map((user) => user.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDB,
  usersInDB,
}
