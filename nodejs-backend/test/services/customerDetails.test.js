const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customerDetails service", async () => {
  let thisService;
  let customerDetailCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("customerDetails");

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
    assert.ok(thisService, "Registered the service (customerDetails)");
  });

  describe("#create", () => {
    const options = {"name":"new value","address":"new value","contactNo":23};

    beforeEach(async () => {
      customerDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customerDetail", () => {
      assert.strictEqual(customerDetailCreated.name, options.name);
assert.strictEqual(customerDetailCreated.address, options.address);
assert.strictEqual(customerDetailCreated.contactNo, options.contactNo);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(customerDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","address":"updated value","contactNo":100};

    it("should update an existing customerDetail ", async () => {
      const customerDetailUpdated = await thisService.Model.findByIdAndUpdate(
        customerDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerDetailUpdated.name, options.name);
assert.strictEqual(customerDetailUpdated.address, options.address);
assert.strictEqual(customerDetailUpdated.contactNo, options.contactNo);
    });
  });

  describe("#delete", async () => {
    it("should delete a customerDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const customerDetailDeleted = await thisService.Model.findByIdAndDelete(customerDetailCreated._id);
      assert.strictEqual(customerDetailDeleted._id.toString(), customerDetailCreated._id.toString());
    });
  });
});