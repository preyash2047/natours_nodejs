//getUsers
exports.getUsers = (req, res) =>{
    res.status(200).json({
        ststus:'success',
        requestedAt:req.requestTime,
        results:tours.length,
        data:{
            tours
        }
    });
}

//get user
exports.getUser = (req, res) =>{
    const id = req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if (!tour){
        return res.status(404).json({
            ststus:'fail',
            message:"ID not found"
        });
    }
    res.status(200).json({
        ststus:'success',
        data:{
            tour
        }
    });
    
}

//createUser
exports.createUsers = (req, res) =>{
    //console.log(req.body);
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

//updateUser
exports.updateUsers = (req, res) =>{
    if(req.params.id *1 <= 0 || req.params.id *1 > (tours.length - 1)){
        return res.status(404).json({
            ststus:'fail',
            message:"ID not found"
        });
    }
    res.status(200).json({
        status:"success",
        data:{
            tour:"<Updated Tour here>"
        }
    });
}

//deleteUser
exports.deleteUsers = (req, res) =>{
    if(req.params.id *1 <= 0 || req.params.id *1 > (tours.length - 1)){
        return res.status(404).json({
            ststus:'fail',
            message:"ID not found"
        });
    }
    res.status(204).json({
        status:"success",
        data:null
    });
}