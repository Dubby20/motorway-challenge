import Joi from "joi";

const getVehicleSchema = Joi.object({
  vehicleId: Joi.number().integer().required(),
  timestamp: Joi.date().required(),
});

export default getVehicleSchema;