const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required : [true, "A tour mast have a Name"],
      unique: true,
      trim: true
    },
    slug : String,
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
},
{
  toJSON: { virtuals: true},
  toObject: { virtuals: true}
}
);

tourSchema.virtual('durationWeeks').get(function (){
  return this.duration / 7 
});

//DOCUMENT Middelware run before save and create
tourSchema.pre('save', function(next){
  this.slug = slugify(this.name, {lower: true});
  next();
});

// tourSchema.pre('save', function(next){
//   console.log('will save document');
//   next();
// });

// tourSchema.post('save', function(doc, next){
//   console.log(doc);
//   next();
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;