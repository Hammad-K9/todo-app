const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  }
});

/* 
When todo is returned to frontend, remove Mongo's versioning field __v and 
change Mongo's ID property _id (which is an object) to id (which is a string)
*/
todoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
