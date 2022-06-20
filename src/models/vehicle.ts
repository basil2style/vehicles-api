import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VehicleSchema = new Schema({
    makeId: {
        type: String,
    },
    makeName: {
        type: String,
    },
    vehicleTypes: [{       
    }]
});