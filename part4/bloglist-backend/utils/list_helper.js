const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  const reducer = (accumulator, currentvalue) =>
    accumulator + currentvalue.likes;

  return blogs.reduce(reducer, 0);
};

const favouriteBlog = blogs => {
  if (!blogs || blogs.length === 0) return null;

  const max = blogs.reduce((prev, current) =>
    prev.likes > current.likes ? prev : current
  );

  const returnobject = {
    title: max.title,
    author: max.author,
    likes: max.likes
  };
  return returnobject;
};

const mostBlogs = blogs => {
  const autharr = blogs.map(blog => blog.author);

  let resultarray = [];
  for (let i = 0; i < autharr.length; i++) {
    if (!resultarray[autharr[i]]) resultarray[autharr[i]] = 1;
    else resultarray[autharr[i]]++;
  }

  let most = 0;
  let topauth = '';

  for (let key in resultarray) {
    if (resultarray[key] > most) {
      topauth = key;
      most = resultarray[key];
    }
  }

  if (most === 0) return null;

  return { author: topauth, blogs: most };
};

const mostLikes = blogs => {
  let resultarray = [];
  for (let i = 0; i < blogs.length; i++) {
    if (!resultarray[blogs[i].author])
      resultarray[blogs[i].author] = blogs[i].likes;
    else resultarray[blogs[i].author] += blogs[i].likes;
  }

  let most = 0;
  let topauth = '';

  for (let key in resultarray) {
    if (resultarray[key] > most) {
      topauth = key;
      most = resultarray[key];
    }
  }

  if (most === 0) return null;

  return { author: topauth, likes: most };
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
};
