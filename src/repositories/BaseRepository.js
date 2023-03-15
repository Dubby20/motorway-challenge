import { Op } from "sequelize";

/**
 * @description BaseRepository
 * @class BaseRepository
 */
export default class BaseRepository {
  /**
   * constructor
   * @param {string} name
   * @param {string} schema
   */
  constructor(name, db) {
    this.name = name;
    this.model = db.sequelize.models[this.name];
  }

  /**
   * @description Fetch a vehicle by id and timestamp
   * @param {string} vehicleId vehicle id
   * @param {string} timestamp
   * @returns {Document} Resolves to find the data.
   */
  async findByIdAndTimestamp(vehicleId, timestamp) {
    try {
      const vehicles = await this.model.findOne({
        where: {
          [Op.and]: [{ vehicleId }, { timestamp: { [Op.lte]: timestamp } }],
        },
        order: [["timestamp", "DESC"]],
        attributes: ["vehicleId", "state", "timestamp"],
      });

      return vehicles;
    } catch (error) {
      throw error;
    }
  }
}