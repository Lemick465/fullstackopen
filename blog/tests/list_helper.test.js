const { test } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = [
    {
      title: 'Exploring the JavaScript Universe',
      author: 'Alice Johnson',
      url: 'https://example.com/js-universe',
      likes: 125,
    },
  ]

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})
