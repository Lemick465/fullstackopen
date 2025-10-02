const totalLikes = (blogs) => {
  let likes = 0
  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      likes += blog.likes
    })
  }
  return likes
}

const favoriteBlog = (blogs) => {
  const favorite = blogs.reduce(
    (favorite, blog) => (blog.likes > favorite.likes ? blog : favorite),
    blogs[0]
  )
  return favorite
}

const authorCounts = (blogs) => {
  const authors = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})
  return authors
}

const mostBlogs = (blogs) => {
  const counts = authorCounts(blogs)
  const entries = Object.entries(counts).map(([author, count]) => ({
    author,
    blogs: Number(count),
  }))
  if (entries.length === 0) return null
  return entries.reduce((max, current) => (current.blogs > max.blogs ? current : max))
}

const authorLikesCounts = (blogs) => {
  const authors = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + blog.likes
    return counts
  }, {})
  return authors
}

const mostLikes = (blogs) => {
  const counts = authorLikesCounts(blogs)
  const entries = Object.entries(counts).map(([author, count]) => ({
    author,
    likes: Number(count),
  }))
  if (entries.length === 0) return null
  return entries.reduce((max, current) => (current.likes > max.likes ? current : max))
}

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes }
