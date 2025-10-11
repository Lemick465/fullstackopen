import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUserJSON')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    console.log('here')
    event.preventDefault()
    console.log(username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUserJSON', JSON.stringify(user))
      setUser(user)
      console.log(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error.message)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const login = (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )

  const handleSubmit = (data) => {
    console.log(data)
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      {!user && login}
      {user && `${user.name} logged in`}
      {user && (
        <button
          onClick={() => {
            window.localStorage.removeItem('loggedUserJSON')
            setUser(null)
          }}
        >
          log out
        </button>
      )}
      {user && (<CreateBlog onSubmit={handleSubmit}/>)}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
