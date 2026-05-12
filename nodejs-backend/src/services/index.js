const customerDetails = require("./customerDetails/customerDetails.service.js");
const productDetails = require("./productDetails/productDetails.service.js");
const salesDetails = require("./salesDetails/salesDetails.service.js");
// ~cb-add-require-service-name~

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(customerDetails);
  app.configure(productDetails);
  app.configure(salesDetails);
    // ~cb-add-configure-service-name~
};
