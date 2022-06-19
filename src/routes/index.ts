import { Request, Response } from 'express';

import { VehicleRoutes } from './vehicle.route'

export class Routes {
    public vehicleRoutes: VehicleRoutes = new VehicleRoutes();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: "Welcome to the awesome api.. :)!!"
                });
            });
        this.vehicleRoutes.routes(app);
    }
}