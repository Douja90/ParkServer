const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder')

const ParkingSchema = new mongoose.Schema({
    parkingId:{
        type: String,
        required: [true, 'Please add parking ID'],
        unique: true,
        trim: true,
        maxlength: [10, 'Parking ID must be less than 10 chars']
    },
    name: {
      type:String,
      required: [true, 'name of parking']
    },
    address:{
        type: String,
        required: [true, 'Please add an address']
    },
    location: {
        type: {
          type: String, 
          enum: ['Point']
        },
        coordinates: {
          type: [Number],
          index: '2dsphere' // 2dsphere supports queries that calculate geometries on an earth like sphere
        },
        formattedAddress: String
      },
      createAt:{
          type: Date,
          default: Date.now
      } 
    });
      //create location
      ParkingSchema.pre('save', async function(next){
          const location = await geocoder.geocode(this.address, this.name);
          this.location = {
            type :'point',
            coordinates: [location[0].longitude, location[0].latitude],
            formattedAddress: location[0].formattedAddress
          }
          //do not save address in the database
          this.address = undefined;
          next();
      });

module.exports = mongoose.model('parking', ParkingSchema);