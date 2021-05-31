const Tour = require('./../models/tourModel');

//getTours
exports.getTours = async (req, res) =>{
    try{

        //1.1. Filtering
        const queryObject = {...req.query};
        const excludeFields = ['page', 'sort', 'limit', 'fields']
        excludeFields.forEach(el => delete queryObject[el]);
        //console.log(req.query);  

        //1.2.Advance Filtering
        let queryString = JSON.stringify(queryObject);
        //prefixing bellow operators with "$" symbole
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        //console.log(JSON.parse(queryString));


        //2.Sorting
        let query = Tour.find(JSON.parse(queryString));
        //const query = Tour.find().where('duration').equals(5).where("difficulty").equals("easy");

        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else{
            query = query.sort("-createdAt");   
        }

        //3. fields
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else{
            query = query.select("-__v");
        }

        //4. pagination
        const page = req.query.page *1 || 1;
        const limit = req.query.limit *1 || 100;
        const skip = (page - 1) *limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page){
            const numberTours = await Tour.countDocuments();
            if(skip >= numberTours) throw new Error("This page does not Exist")
        }

        //Executive Query
        const tours = await query;

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

