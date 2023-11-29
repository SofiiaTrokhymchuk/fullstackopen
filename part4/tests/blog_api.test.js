const db = require('../db');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/blogs');
const apiHelper = require('./api_helper');

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogsArray = apiHelper.initialBlogs.map((b) => new Blog(b));
  await Blog.insertMany(blogsArray);
});

describe('when there are initially some blogs saved', () => {
  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body.length).toBe(apiHelper.initialBlogs.length);
  });

  test('blogs have id property', async () => {
    const response = await api.get('/api/blogs');

    for (const blog of response.body) {
      expect(blog.id).toBeDefined();
    }
  });
}, 100000);

describe('addition of a new blog', () => {
  test('new blog is added', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogs = await apiHelper.blogsInDb();
    expect(blogs).toHaveLength(apiHelper.initialBlogs.length + 1);
  });

  test('new blog has 0 likes as default', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    };

    const response = await api.post('/api/blogs').send(newBlog);
    expect(response.body.likes).toBeDefined();
    expect(response.body.likes).toBe(0);
  });

  test('if blog properties are missing status 400 is returned', async () => {
    const newBlog = {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    };

    await api.post('/api/blogs').send(newBlog).expect(400);
  });
}, 100000);

describe('update of a blog', () => {
  test('succeeds with status 200 if id is valid', async () => {
    const newBlog = {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
    };
    const addResponse = await api.post('/api/blogs').send(newBlog);
    const addedBlog = addResponse.body;

    const newBlogData = {
      title: 'New Title',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
    };
    const updateResponse = await api
      .put('/api/blogs/' + addedBlog.id)
      .send(newBlogData)
      .expect(200);
    const updatedBlog = updateResponse.body;

    newBlogData.id = addedBlog.id;
    expect(newBlogData).toEqual(updatedBlog);
  });
}, 100000);

describe('deletion of a blog', () => {
  test('succeeds with status 204 if id is valid', async () => {
    const blogsBefore = await apiHelper.blogsInDb();
    const blog = blogsBefore[0];

    await api.delete('/api/blogs/' + blog.id).expect(204);

    const blogsAfter = await apiHelper.blogsInDb();
    expect(blogsBefore).toHaveLength(blogsAfter.length + 1);
  });
}, 100000);

afterAll(async () => await db.disconnect());
