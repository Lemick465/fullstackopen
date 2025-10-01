const totalLikes = (blogs) => {
  let likes = 0
  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      likes += blog.likes
    })
  }
  return likes
}

module.exports = { totalLikes }
