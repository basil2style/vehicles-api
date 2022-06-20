import axios from "axios";
import * as convert from "xml-js";
import * as mongoose from 'mongoose';

import { VehicleSchema } from '../models/vehicle';


const Vehicle = mongoose.model('Vehicle', VehicleSchema);

const URL: string = "https://vpic.nhtsa.dot.gov/api/vehicles";

export class VehicleService {

  constructor() {

  }

  public async getAllVehiclesMakes() {
    try {
      const { data } = await axios.get(`${URL}/getallmakes?format=XML`);
      const options = { ignoreComment: true, alwaysChildren: false, compact: true };
      const result = JSON.parse(convert.xml2json(data, options))
      return vehicleMakesDTO(result.Response["Results"].AllVehicleMakes);
    } catch (error) {
      throw new Error('Axios Error');
    }
  }

  public async getVehicleTypesByMake(vehicleMakeId) {

    try {
      const { data } = await axios.get(`${URL}/GetVehicleTypesForMakeId/${vehicleMakeId}?format=xml`);

      const options = { ignoreComment: true, alwaysChildren: false, compact: true };
      const result = JSON.parse(convert.xml2json(data, options));

      return vehicleTypesDTO(result.Response["Results"]);
    } catch (error) {
      throw new Error('Axios Error');
    }
  }

  public async getAllVehiclesTypesByMake(page, limit) {
    let vehiclesMakesData: IVehicleMakes[] = [];
    let vehicleResponse = [];

    return Promise.allSettled([
      this.getAllVehiclesMakes()
    ]).then(async ([$vehiclesMakesData]) => {
      vehiclesMakesData = getVehicleResult($vehiclesMakesData);
      
      if (vehiclesMakesData) {
        
        if (parseInt(page) > 0 && parseInt(limit) > 0) {
          const startIndex = (page - 1) * limit;
          const endIndex = page * limit;
          vehiclesMakesData = vehiclesMakesData.slice(startIndex, endIndex);
          
        }
        for (const vehiclesMake of vehiclesMakesData) {
          const vehicleTypes = this.getVehicleTypesByMake(vehiclesMake.makeId).then((vehicleTypes) => {
            return { ...vehiclesMake, vehicleTypes }
          }).catch((err => {
            return vehiclesMake;
          }))
          vehicleResponse.push(vehicleTypes);
        }
      }
      
      const responseData = await Promise.all(vehicleResponse);
      await saveToDb(responseData);
    

      return responseData;
    })
  }

}

function getVehicleResult<T>(result: PromiseSettledResult<T>): T | undefined {
  
  if (result.status === 'fulfilled') return result.value;
}

function vehicleMakesDTO(vehicleMakes) {

  return vehicleMakes.map((vehicleMake) => {
    return {
      makeId: vehicleMake.Make_ID["_text"],
      makeName: vehicleMake.Make_Name["_text"]
    }
  })
}

async function saveToDb(vehicleData){
  vehicleData.map((vehicle) => {
    const saveToVehicle = new Vehicle(vehicle);
    saveToVehicle.save()  
  })
}

async function vehicleTypesDTO(vehicleTypes) {

  const vehicles = await vehicleTypes.VehicleTypesForMakeIds.map((vehicleType) => {
    return {
      typeId: vehicleType.VehicleTypeId["_text"],
      typeName: vehicleType.VehicleTypeName["_text"]
    }
  })



  return vehicles;
}


export interface IVehicleMakes {
  makeId: string,
  makeName: string,
  vehicleTypes?: IVehicleTypes[]
}

export interface IVehicleTypes {
  typeId: string,
  typeName: string
}

