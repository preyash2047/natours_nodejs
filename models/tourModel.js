const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required : [true, "A tour mast have a Name"],
      unique: true,
      trim: true
    },
    duration: {
      type: Number,
      required : [true, "A tour mast have a duration"]
    },
    maxGroupSize: {
      type: Number,
      required : [true, "A tour mast have a Group Size"]
    },
    difficulty: {
      type: String,
      required : [true, "A tour mast have a difficulty"]
    },
    ratingsAverage: {
      type: Number,
      default : 4
    },
    ratingsQuantity: {
      type: Number,
      default : 4
    },
    price: {
      type: Number,
      required : [true, "A tour must have a price"]
    },
    PriceDiscount: Number,
    summary: {
      type: String,
      trim: true, 
      required : [true, "A tour mast have a Summary"]
    },
    description: {
      type: String,
      trim : true,
    },
    imageCover:{
      type: String,
      required : [true, "A tour mast have a Cover Image"]
    },
    images: [String],
    createdAt: {
      type : Date,
      default: Date.now(),
      select : false
    },
    startDate: [Date],


})

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;