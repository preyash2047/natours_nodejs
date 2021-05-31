const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const Tour = require('./models/tourModel');

dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.
  connect(DB, {
  //connect(process.env.LOCAL_DATABASE, {
  useNewUrlParser : true,
  useCreateIndex: true,
  useFindAndModify : false,
}).then(con => console.log("DB Connected Succesfully!"));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on Port ${port}`);
});


//createTour
const createTours = async (req, res) =>{
  try{    
      const newTour = await Tour.create(req.body);
      res.status(201).json({
          status:"success",
          data : {
              tour: newTour
          }
      });
  } catch(err){
      res.status(400).json({
          status: "fail",
          message: "Invalid data sent!" + err
      });
  }
}