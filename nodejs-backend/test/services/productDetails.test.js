const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("productDetails service", async () => {
  let thisService;
  let productDetailCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("productDetails");

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
    assert.ok(thisService, "Registered the service (productDetails)");
  });

  describe("#create", () => {
    const options = {"name":"new value","quantity":23,"unitPrice":23};

    beforeEach(async () => {
      productDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new productDetail", () => {
      assert.strictEqual(productDetailCreated.name, options.name);
assert.strictEqual(productDetailCreated.quantity, options.quantity);
assert.strictEqual(productDetailCreated.unitPrice, options.unitPrice);
    });
  });

  describe("#get", () => {
    it("should retrieve a productDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(productDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), productDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","quantity":100,"unitPrice":100};

    it("should update an existing productDetail ", async () => {
      const productDetailUpdated = await thisService.Model.findByIdAndUpdate(
        productDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(productDetailUpdated.name, options.name);
assert.strictEqual(productDetailUpdated.quantity, options.quantity);
assert.strictEqual(productDetailUpdated.unitPrice, options.unitPrice);
    });
  });

  describe("#delete", async () => {
    it("should delete a productDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const productDetailDeleted = await thisService.Model.findByIdAndDelete(productDetailCreated._id);
      assert.strictEqual(productDetailDeleted._id.toString(), productDetailCreated._id.toString());
    });
  });
});