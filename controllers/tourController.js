const Tour = require('./../models/tourModel');
const APIFeatures = require('../utils/apiFeatures.js')

exports.aliesTopTours = async (req, res, next) =>{
    req.query.limit = 5;
    req.query.sort = "price";
    next();
}

//getTours
exports.getTours = async (req, res) =>{
    try{
        //Executive Query
        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limitFields().pagination();
        const tours = await features.query;

        res.status(200).json({
            ststus:'success',
            requestedAt:req.requestTime,
            results: tours.length,
            data:{
                tours
            }
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

//get tour
exports.getTour = async (req, res) =>{
    try{
        const tour = await Tour.findById(req.params.id);
        //Tour.findOne({ _id : req.params.id })
        res.status(200).json({
            ststus:'success',
            requestedAt:req.requestTime,
            data:{
                tour
            }
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

//createTour
exports.createTours = async (req, res) =>{
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

//updateTour
exports.updateTours = async (req, res) =>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new : true,
            runValidators : true
        });
        res.status(200).json({
            ststus:'success',
            requestedAt:req.requestTime,
            data:{
                tour
            }
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

//deleteTour
exports.deleteTours = async (req, res) =>{
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            ststus:'success',
            requestedAt:req.requestTime,
            data:null
        });
    } catch(err){
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

exports.getTourStats = async (req, res) => {
    try{
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte : 4.5 } }
            },
            {
                $group: {
                    _id : null,
                    averageRating: { $avg : '$ratingsAverage'},
                    avgPrice : { $avg : '$price'},
                    minPrice : { $min : '$price'}
                }
            }
        ]);

        res.status(200).json({
            status: "success",
            data: {
                stats
            }
        });

    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}

exports.getMonthlyPlan = async (req, res) =>{
    try {
        const year = req.params.year * 1;
        const plan = await Tour.aggregate([
           {
                $unwind : "$startDate"
           }
        ]);

        res.status(200).json({
            status: "success",
            data: {
                plan
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: err
        });
    }
}