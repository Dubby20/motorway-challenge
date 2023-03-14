import { Router } from 'express';
import validateParams from '../middlewares/validateParams';
import getVehicleSchema from '../middlewares/vehicle';

const createVehicleRoute = ({
  vehicleController
}) => {
  const router = Router();

  router.get(
    "/:vehicleId/:timestamp",
    validateParams(getVehicleSchema, "params"),
    vehicleController.getVehicle
  );
  return router;
};
export default createVehicleRoute;
