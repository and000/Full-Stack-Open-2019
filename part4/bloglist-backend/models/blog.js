const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);


const commentSchema = mongoose.Schema({
  text: String,
  date: { type: Date, default: Date.now }
});

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [commentSchema]
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject._id;
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // toString is needed for correctly passing tests!!
    delete returnedObject._id;
    delete returnedObject.__v;

    
  }
});

module.exports = mongoose.model('Blog', blogSchema);
