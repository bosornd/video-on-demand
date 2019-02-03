var mongoose = require('mongoose');

var MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  genres: [
    {
      id: Number,
      name: String
    }
  ],
  description: String,
  poster: String,
  released_date: String,
  running_time: Number,
  vote_average: Number
});

MovieSchema.index({title:'text', description:'text'})

module.exports = mongoose.model('Movie', MovieSchema);
