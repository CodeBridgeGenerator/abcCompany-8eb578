
    module.exports = function (app) {
        const modelName = "sales_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customer: { type: Schema.Types.ObjectId, ref: "customer_details", comment: "Customer , dropdown, false, true, true, true, true, true, true, customerDetails, customer_details, one-to-one, name," },
product: { type: Schema.Types.ObjectId, ref: "product_details", comment: "Product, dropdown, false, true, true, true, true, true, true, productDetails, product_details, one-to-one, name," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
price: { type: Number, max: 10000000, comment: "Price, p_number, false, true, true, true, true, true, true, , , , ," },

            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
          }, { timestamps: true });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };