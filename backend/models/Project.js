const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    }
  ]
});

/* 
When project is returned to frontend, remove Mongo's versioning field __v and 
change Mongo's ID property _id (which is an object) to id (which is a string)
*/
projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
