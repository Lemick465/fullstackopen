import React, { useState } from 'react'

const CreateBlog = ({
  initialValues = { title: '', author: '', url: '' },
  onSubmit,
}) => {
  const [values, setValues] = useState(initialValues)

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title
          <input
            type='text'
            name='title'
            value={values.title}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          author
          <input
            type='text'
            name='author'
            value={values.author}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          url
          <input
            type='text'
            name='url'
            value={values.url}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type='submit'>create</button>
    </form>
  )
}

export default CreateBlog
