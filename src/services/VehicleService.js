import autoBind from 'auto-bind';
/**
   * Creates an instance of VehicleService.
   */
class VehicleService {
  /**
   * Creates an instance of VehicleService.
   * @param {object} param
   * @memberof VehicleService
   */
  constructor({ vehicleRepository, redis }) {
    this.vehicleRepository = vehicleRepository;
    this.redis = redis;
    autoBind(this);
  }

  /**
   * Retrieves a vehicle details
   * @param {number} - vehicleId
   * @param {number} - timestamp
   *@returns {object} - vehicle
   */
  async retrieveVehicle(vehicleId, timestamp) {
    try {
      let vehicle;
      vehicle = await this.redis.getObject(
        "motorway",
        `${vehicleId}:${timestamp}`
      );
      if (vehicle && Object.entries(vehicle).length > 0) {
        return vehicle;
      }

      vehicle = await this.vehicleRepository.findByIdAndTimestamp(
        vehicleId,
        timestamp
      );
      await this.redis.setObject('motorway', `${vehicleId}:${timestamp}`, vehicle, 3600);
  
      return vehicle;
    } catch (error) {
      throw error;
    }
  }
}
export default VehicleService;
