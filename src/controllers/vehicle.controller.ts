import { VehicleService } from "../services/vehicle.service";
import { Request, Response } from 'express';


export class VehicleController {
    public vehicleService: VehicleService = new VehicleService();
    constructor() {}

    public async getAllVehiclesMake (_req: Request, res: Response) {

        const vehicleResponse  =  await this.vehicleService.getAllVehiclesMakes;
        res.json(vehicleResponse);
    }


}