const { Service } = require("feathers-mongoose");
const FindService = require("../../utils/abstracts/FindService");
const MixedService = FindService(Service);

exports.SalesDetails = class SalesDetails extends MixedService {
  
};