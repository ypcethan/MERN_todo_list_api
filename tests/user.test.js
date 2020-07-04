const request = require("supertest");
const { clearDatabase, closeDatabase, connect } = require("./test-db-setup");
const { app } = require("../server");
const User = require("../models/User");
const { userOneData, userTwoData } = require("./fixture/user.fixture");

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});
afterAll(async () => {
  await closeDatabase;
});

const baseUrl = "/api/users";
describe("Register user", () => {
  test("Should be able to register a user and password should be hashed", async () => {
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(userOneData)
      .expect(200);
    const user = await User.findOne({ email: userOneData.email });
    expect(user).not.toBeNull();
    expect(user.password).not.toBe(userOneData.password);
  });

  test("Should not be able to register with email that already been taken", async () => {
    await User.create(userOneData);
    const response = await request(app)
      .post(baseUrl + "/register")
      .send(userOneData)
      .expect(400);
  });
});

describe("Login user", () => {
  beforeEach(async () => {
    await User.create(userOneData);
  });
  test("Should be able to login user with correct password and email", async () => {
    const { email, password } = userOneData;
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({ email, password })
      .expect(200);
  });

  test("Error if missing either email or password", async () => {
    const { email, password } = userOneData;
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({ email })
      .expect(400);
  });
  test("Error if account not exist", async () => {
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({ email: "were", password: "ere" })
      .expect(400);
  });
  test("Error if account wrong password", async () => {
    const { email, password } = userOneData;
    const response = await request(app)
      .post(baseUrl + "/login")
      .send({ email, password: "wrongpassword" })
      .expect(400);
  });
});
