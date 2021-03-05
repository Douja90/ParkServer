const Parking = require('../models/Parking');
const parking = require('../models/Parking');

//Get all parkings
//@route get /api/parkings
//@access public
exports.getParkings = async (req, res, next) =>{
    try{
        const parkings = await parking.find();

        return res.status(200).json({
            success: true,
            count: parkings.lengtn,
            data: parkings
        })
    } catch(error){
        console.error(error);
        res.status(500).json(error, 'server error');

    }
};

//creat parking
//@route POST /api/parkings
//@access public
exports.addParking = async (req, res, next) =>{
    try{
        const parking = await Parking.create(req.body);
        return res.status(200).json({
            success: true,
            data: parking
        })
    } catch(error){
        console.error(error);
          if(error.code === 11000)
          return res.status(400).json({error: 'This parking is already existing'});
        res.status(500).json({error:'server error'});

    }
};