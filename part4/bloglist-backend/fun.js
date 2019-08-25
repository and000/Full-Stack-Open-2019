const mostauthored = blogs => {
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

const blogs = [
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Other',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
];

console.log(mostauthored(blogs));
