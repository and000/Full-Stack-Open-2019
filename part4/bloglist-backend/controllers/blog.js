const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// JWT can be extracted from the request like so-or done via middleware - see middleware.js tokenExtractor!
// const getTokenFrom = request => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7);
//   }
//   return null;
// };

// pupulates users via foreign key
blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1
  });

  response.json(blogs.map(blog => blog.toJSON()));
});

blogRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      response.json(blog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post('/', async (request, response, next) => {
  const body = request.body;

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: 'title or author or url missing'
    });
  }

  try {
    const token = request.token;

    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: parseInt(body.likes) || 0,
      //user: someUsers[0]._id
      user: user._id
    });

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    const popBlog = await Blog.findById(savedBlog._id).populate('user', {
      username: 1,
      name: 1,
      id: 1
    });

    response.json(popBlog.toJSON());
  } catch (exception) {
    next(exception);
  }
});

blogRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body;

  if (!body.text) {
    return response.status(400).json({
      error: 'comment text missing'
    });
  }

  try {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
      blog.comments.push({ text: body.text });

      const savedBlog = await blog.save();

      const popBlog = await Blog.findById(savedBlog._id).populate('user', {
        username: 1,
        name: 1,
        id: 1
      });

      response.json(popBlog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.delete('/:id', async (request, response, next) => {
  try {
    const token = request.token;

    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const user = await User.findById(decodedToken.id);
    const blogToDelete = await Blog.findById(request.params.id);

    if (!blogToDelete)
      return response.status(404).json({ error: 'blog Post does not exist' });

    if (blogToDelete.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: 'not authorized' });
    }
  } catch (exception) {
    next(exception);
  }
});

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    user: body.user,
    likes: parseInt(body.likes) || 0
  };

  try {
    const newblog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    }).populate('user', {
      username: 1,
      name: 1,
      id: 1
    });
    if (newblog) {
      console.log('NEWBLOG ', newblog);
      response.json(newblog.toJSON());
    } else {
      response.status(404).end();
    }
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogRouter;
