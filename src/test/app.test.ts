import supertest from "supertest";
import { app } from "../app";
import { User } from "./../database/models/User";

beforeAll(async () => {
  await User.destroy({ where: {} });
});

test("shoud signUp user", async () => {
  await supertest(app)
    .post("/signup")
    .send({
      firstName: "admin",
      lastName: "one",
      mobile: 9988988777,
      username: "admin",
      email: "admin@gmial.com",
      password: "admin@123",
      role: "admin",
    })
    .expect(201);
});
