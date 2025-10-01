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
    (favorite, blog) => blog.likes > favorite.likes ? blog : favorite,
    blogs[0]
  )
  return favorite
}

module.exports = { totalLikes, favoriteBlog }
