const _ = require('lodash');

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((prev, curr) => prev + curr.likes, 0);
};

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((b) => b.likes));
  return blogs.find((b) => b.likes === maxLikes);
};

const mostBlogs = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((blogsList, author) => ({
      author,
      blogs: blogsList.length,
    }))
    .maxBy('blogs')
    .value();
};

const mostLikes = (blogs) => {
  return _.chain(blogs)
    .groupBy('author')
    .map((blogsList, author) => ({
      author,
      likes: _.sumBy(blogsList, 'likes'),
    }))
    .maxBy('likes')
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
