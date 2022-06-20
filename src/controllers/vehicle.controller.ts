import { VehicleService } from "../services/vehicle.service";
import { Request, Response } from 'express';


export class VehicleController {
    constructor() {
    }

    public async getAllVehiclesMake (req: Request, res: Response) {
        const page = req.query.page ? req.query.page:0;
        const limit = req.query.limit ? req.query.limit:0;
        const vehicleService = new VehicleService();
        const vehicleResponse  =  await vehicleService.getAllVehiclesTypesByMake(page, limit);
        res.json(vehicleResponse);
    }


}