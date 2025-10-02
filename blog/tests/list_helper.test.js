const { describe, test } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const blogs = [
      {
        title: 'Exploring the JavaScript Universe',
        author: 'Alice Johnson',
        url: 'https://example.com/js-universe',
        likes: 125,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 125)
  })

  test('of a bigger list is calculated right', () => {
    const blogs = [
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
      {
        title: 'Understanding Async/Await',
        author: 'Carol Lee',
        url: 'https://example.com/async-await-guide',
        likes: 142,
      },
      {
        title: 'A Guide to Modern Web Development',
        author: 'David Kim',
        url: 'https://example.com/modern-web-dev',
        likes: 77,
      },
    ]

    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 442)
  })
})

describe('blogs', () => {
  test('favorite blog', () => {
    const blogs = [
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
      {
        title: 'Understanding Async/Await',
        author: 'Carol Lee',
        url: 'https://example.com/async-await-guide',
        likes: 142,
      },
      {
        title: 'A Guide to Modern Web Development',
        author: 'David Kim',
        url: 'https://example.com/modern-web-dev',
        likes: 77,
      },
    ]

    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[2])
  })

  test('author with most blogs', () => {
    const blogs = [
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
      {
        title: 'Understanding Async/Await',
        author: 'Carol Lee',
        url: 'https://example.com/async-await-guide',
        likes: 142,
      },
      {
        title: 'A Guide to Modern Web Development',
        author: 'Bob Smith',
        url: 'https://example.com/modern-web-dev',
        likes: 77,
      },
    ]

    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: 'Bob Smith', blogs: 2 })
  })

  test('author with most likes', () => {
    const blogs = [
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
      {
        title: 'Understanding Async/Await',
        author: 'Carol Lee',
        url: 'https://example.com/async-await-guide',
        likes: 142,
      },
      {
        title: 'A Guide to Modern Web Development',
        author: 'Bob Smith',
        url: 'https://example.com/modern-web-dev',
        likes: 77,
      },
    ]

    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: 'Bob Smith', likes: 175 })
  })
})
