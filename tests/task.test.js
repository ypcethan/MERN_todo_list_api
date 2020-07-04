const request = require("supertest");
const { clearDatabase, closeDatabase, connect } = require("./test-db-setup");
const { app } = require("../server");
const User = require("../models/User");
const Task = require("../models/Task");

const { userOneData, userTwoData } = require("./fixture/user.fixture");
const {
  taskOneData,
  taskTwoData,
  taskThreeData,
} = require("./fixture/task.fixture");

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  await clearDatabase();
});
afterAll(async () => {
  await closeDatabase;
});

let token;
beforeEach(async () => {
  const response = await request(app)
    .post("/api/users/register")
    .send(userOneData);
  token = response.body.token;
});
const baseUrl = "/api/tasks";

describe("Create task", () => {
  test("Authenticated user can create a task", async () => {
    const response = await request(app)
      .post(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .send(taskOneData)
      .expect(200);
  });
});

describe("Get task", () => {
  beforeEach(async () => {
    const user = await User.findOne({ email: userOneData.email });
    await Task.create({ ...taskOneData, user: user._id });
    await Task.create({ ...taskTwoData, user: user._id });
  });
  test("Get all tasks from a particular user", async () => {
    const response = await request(app)
      .get(baseUrl)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const { tasks } = response.body;
    expect(tasks.length).toBe(2);
  });
});

describe("Update task", () => {
  let taskOne, taskTwo, taskThree;
  beforeEach(async () => {
    const user = await User.findOne({ email: userOneData.email });
    const otherUser = await User.create(userTwoData);
    taskOne = await Task.create({ ...taskOneData, user: user._id });
    taskTwo = await Task.create({ ...taskTwoData, user: user._id });
    taskThree = await Task.create({ ...taskThreeData, user: otherUser._id });
  });
  test("User can update her own task", async () => {
    const newContent = "Changed";
    const response = await request(app)
      .patch(baseUrl + `/${taskOne.id}`)
      .send({ content: newContent })
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
    const task = await Task.findById(taskOne.id);
    expect(task.content).toBe(newContent);
  });

  test("User cannot update other user's task", async () => {
    const newContent = "Changed";
    const response = await request(app)
      .patch(baseUrl + `/${taskThree.id}`)
      .send({ content: newContent })
      .set("Authorization", `Bearer ${token}`)
      .expect(401);
    const task = await Task.findById(taskThree.id);
    expect(task.content).not.toBe(newContent);
  });
});
