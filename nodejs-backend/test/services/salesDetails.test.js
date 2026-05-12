const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("salesDetails service", async () => {
  let thisService;
  let salesDetailCreated;
  let usersServiceResults;
  let users;

  const customerDetailsCreated = await app.service("customerDetails").Model.create({"customer":"parentObjectId","name":"new value","address":"new value","contactNo":23});
const productDetailsCreated = await app.service("productDetails").Model.create({"customer":`${customerDetailsCreated._id}`,"name":"new value","address":"new value","contactNo":23,"product":"parentObjectId","quantity":23,"unitPrice":23});

  beforeEach(async () => {
    thisService = await app.service("salesDetails");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (salesDetails)");
  });

  describe("#create", () => {
    const options = {"customer":`${customerDetailsCreated._id}`,"name":"new value","address":"new value","contactNo":23,"product":`${productDetailsCreated._id}`,"quantity":23,"unitPrice":23,"price":23};

    beforeEach(async () => {
      salesDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new salesDetail", () => {
      assert.strictEqual(salesDetailCreated.customer.toString(), options.customer.toString());
assert.strictEqual(salesDetailCreated.product.toString(), options.product.toString());
assert.strictEqual(salesDetailCreated.quantity, options.quantity);
assert.strictEqual(salesDetailCreated.price, options.price);
    });
  });

  describe("#get", () => {
    it("should retrieve a salesDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(salesDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), salesDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customer":`${customerDetailsCreated._id}`,"product":`${productDetailsCreated._id}`,"quantity":100,"price":100};

    it("should update an existing salesDetail ", async () => {
      const salesDetailUpdated = await thisService.Model.findByIdAndUpdate(
        salesDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(salesDetailUpdated.customer.toString(), options.customer.toString());
assert.strictEqual(salesDetailUpdated.product.toString(), options.product.toString());
assert.strictEqual(salesDetailUpdated.quantity, options.quantity);
assert.strictEqual(salesDetailUpdated.price, options.price);
    });
  });

  describe("#delete", async () => {
    it("should delete a salesDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("customerDetails").Model.findByIdAndDelete(customerDetailsCreated._id);
await app.service("productDetails").Model.findByIdAndDelete(productDetailsCreated._id);;

      const salesDetailDeleted = await thisService.Model.findByIdAndDelete(salesDetailCreated._id);
      assert.strictEqual(salesDetailDeleted._id.toString(), salesDetailCreated._id.toString());
    });
  });
});