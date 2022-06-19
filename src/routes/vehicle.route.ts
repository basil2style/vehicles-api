import { VehicleController } from '../controllers/vehicle.controller';

export class VehicleRoutes {
    public vehicleController: VehicleController = new VehicleController();

    public routes(app): void {
        
        
        app.route('/vehicle')
        // GET endpoint
        .get(this.vehicleController.getAllVehiclesMake);

    }
}