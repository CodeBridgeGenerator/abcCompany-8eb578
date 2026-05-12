
import { faker } from "@faker-js/faker";
export default (user,count,customerIds,productIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customer: customerIds[i % customerIds.length],
product: productIds[i % productIds.length],
quantity: faker.datatype.number(""),
price: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
