const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

//checkID middelware
exports.checkID = (req, res, next, val) => {
    if(req.params.id *1 <= 0 || req.params.id *1 > (tours.length - 1)){
        return res.status(404).json({
            ststus:'fail',
            message:"ID not found"
        });
    }
    next();
}

//checkbody middelware
exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            ststus:'fail',
            message:"Name or Price not found"
        });
    }
    next();
}

//getTours
exports.getTours = (req, res) =>{
    res.status(200).json({
        ststus:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
}

//get tour
exports.getTour = (req, res) =>{
    const id = req.params.id * 1;
    const tour= tours.find(el => el.id === id);
    res.status(200).json({
        ststus:'success',
        data:{
            tour
        }
    });
    
}

//createTour
exports.createTours = (req, res) =>{
    const newId = tours[tours.length - 1].id + 1; 
    const newTour = Object.assign({id:newId},req.body)
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status:"success",
            data: {
                tour:newTour
            }
        });
    });
}

//updateTour
exports.updateTours = (req, res) =>{
    res.status(200).json({
        status:"success",
        data:{
            tour:"<Updated Tours here>"
        }
    });
}

//deleteTour
exports.deleteTours = (req, res) =>{
    res.status(204).json({
        status:"success",
        data:null
    });
}