/* eslint-disable no-useless-constructor */
import autoBind from "auto-bind";

/**
 * Creates an instance of VehicleController.
 */
class VehicleController {
  /**
   * Creates an instance of VehicleController.
   * @param {object} param
   * @memberof VehicleController
   */
  constructor({ vehicleService }) {
    this.vehicleService = vehicleService;
    autoBind(this);
  }

  /**
   * Retrieves vehicle details
   * @param {object} req
   * @param {object} res
   *@returns {object} - vehicle
   */
  async getVehicle(req, res, next) {
    const { vehicleId, timestamp } = req.params;
    try {
      const vehicle = await this.vehicleService.retrieveVehicle(
        vehicleId,
        timestamp
      );
      if (!vehicle) {
        return res.status(404).json({
          status: "error",
          message: "Vehicle information not found",
        });
      }
      return res
        .status(200)
        .json({
          status: "success",
          message: "Vehicle information retrieved successfully",
          data: vehicle,
        });
    } catch (error) {
      next(error);
    }
  }
}
export default VehicleController;
