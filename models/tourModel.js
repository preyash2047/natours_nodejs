const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required : [true, "A tour mast have a Name"],
      unique: true,
      trim: true,
      minlength : [10, "A tour must have at least 10 characters"],
      maxlength : [40, "A tour can have at most 40 characters"],
      // validate : [validator.isAlpha, "Ture name must only contain letters"]
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
      required : [true, "A tour mast have a difficulty"],
      enum: {
        values: ['easy', "medium", "difficult"],
        message: ["Difficulty must be one of easy, medium and difficult"]
      }
    },
    ratingsAverage: {
      type: Number,
      default : 4,
      min: [1, "A Tour ratingsAverage must be at least 1"],
      max: [5, "A Tour ratingsAverage at most can be 5"]
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
      required : [true, "A tour mast have a Summary"],
      validate: {
        validator: function(val){
          //this. online point for new document creation not for update 
          return val < this.price; //100 < 200
        },
        message : "Discount Price ({VALUE}) should be below Price"
      }
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
    secretTour:{
      type: Boolean,
      default : false
    }
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

//Query Middelware
tourSchema.pre(/^find/, function(next){
  this.find({ secretTour : {$ne : true}});
  this.startTime = Date.now();
  next();
});

tourSchema.post(/^find/, function(docs, next){
  console.log(docs);
  console.log("Quert Took :", Date.now() - this.startTime);
  next();
});

//Aggrigation middelwares
tourSchema.pre("aggregate", function(next) {
  this.pipeline().unshift({ $match : { secretTour : { $ne : true}} });
  console.log(this.pipeline());
  next();
});


const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;