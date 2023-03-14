import BaseRepository from './BaseRepository';
/**
 * @description BaseRepository
 * @class BaseRepository
 */
class VehicleRepository extends BaseRepository {
  /**
   * VehicleRepository constructor
   */
  constructor({ db }) {
    super("stateLogs", db);
  }
}
export default VehicleRepository;
