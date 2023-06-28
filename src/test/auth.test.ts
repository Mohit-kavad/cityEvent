import supertest from "supertest";
import { app } from "../app";
import { sequelize } from "../database/models/connection";
import { User } from "../database/models/User";
// test("shoud sum",async()=>{
//   expect(2).toBe(2)
// })

beforeAll(async () => {
  await sequelize.sync({ force: true });

  await User.create({
    firstName: "john",
    lastName: "doe",
    mobile: 9876543210,
    username: "johndoe",
    email: "admin@gmail.com",
    password: "password123",
    role: "user",
  });
});

test("shoud signUp user", async () => {
  await supertest(app)
    .post("/signup")
    .send({
      firstName: "admin",
      lastName: "one",
      mobile: 9988988777,
      username: "admin",
      email: "admin@gmail.com",
      password: "admin@123",
      role: "admin",
    })
    .expect(201);
});

test("should return 409 if user with same email already exists", async () => {
  const response = await supertest(app).post("/signup").send({
    firstName: "john",
    lastName: "doe",
    mobile: 9876543210,
    username: "johndoe",
    email: "admin@gmail.com", // Repeating the same email as the previous test
    password: "password123",
    role: "user",
  });
  expect(response.status).toBe(409);
  expect(response.body.error).toBe("User with the same email already exist");
});

test("shoud return 400 if required field are missing for signup", async () => {
  await supertest(app).post("/signup").send({});
});

test("shoud login user", async () => {
  await supertest(app)
    .post("/login")
    .send({
      email: "admin@gmail.com",
      password: "admin@123",
    })
    .expect(200);
});
