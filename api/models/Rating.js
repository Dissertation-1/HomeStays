const mongoose = require('mongoose')

const ratingSchema = new mongoose.Schema({
    rating: Number,
    user : {
      type : mongoose.Schema.Types.String,
      ref : 'User'
    },
    bookedPlaces : {
      type : [mongoose.Schema.Types.ObjectId],
      ref : 'Place'
    }
})

const Rating = mongoose.model('Rating',ratingSchema);

module.exports = Rating;