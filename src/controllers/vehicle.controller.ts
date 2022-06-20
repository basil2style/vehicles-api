import { VehicleService } from "../services/vehicle.service";
import { Request, Response } from 'express';


export class VehicleController {
    constructor() {
    }

    public async getAllVehiclesMake (req: Request, res: Response) {
        const vehicleService = new VehicleService();
        const vehicleResponse  =  await vehicleService.getAllVehiclesTypesByMake();
        res.json(vehicleResponse);
    }


}