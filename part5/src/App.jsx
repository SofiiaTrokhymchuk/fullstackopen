import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const user = window.localStorage.getItem('user');
    if (user) {
      setUser(JSON.parse(user));
    }
  }, []);

  const showMessage = (error, message) => {
    if (error) {
      console.log(error.message);
      const message = error.response.data.error || error.message;
      setMessage(message);
    } else {
      setMessage(message);
    }

    setTimeout(() => {
      setMessage('');
    }, 5000);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem('user', JSON.stringify(user));

      loginService.setToken(user.token);

      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
      showMessage(error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  );

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs([...blogs, blog]);
      showMessage(null, `Blog "${blog.title}" was added`);
    } catch (error) {
      console.error(error);
      showMessage(error);
    }
  };

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>save</button>
    </form>
  );

  return (
    <div>
      <Notification message={message} />
      {!user && (
        <div>
          <h1>log in to application</h1>
          {loginForm()}
        </div>
      )}

      {user && (
        <div>
          <h1>blogs</h1>
          <p>
            {user.username} logged in{' '}
            <button onClick={handleLogout}>logout</button>
          </p>
          {blogForm()}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
