const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');
dotenv.config({path: './config.env'});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.
  connect(DB, {
  //connect(process.env.LOCAL_DATABASE, {
  useNewUrlParser : true,
  useCreateIndex: true,
  useFindAndModify : false,
}).then(con => console.log("DB Connected Succesfully!"));

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, "utf-8"));

const importData = async () =>{
    try{
        await Tour.create(tours);
        console.log("Data Succesfully Import!")
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

//DELETE all data from db
const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log("Data Delated Succesfully!")
        process.exit();
    } catch (err) {
        console.log(err);
    }
}

if (process.argv[2] === "--import"){
    importData();
}

if (process.argv[2] === "--delete"){
    deleteData();
}

console.log(process.argv)