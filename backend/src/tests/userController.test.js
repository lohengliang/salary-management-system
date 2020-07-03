import request from "supertest";
import app from "../app";
import models from "../db/models";
import CsvFile from "./createTestCSV";
const path = require("path");
const fs = require("fs");
const fsExtra = require("fs-extra");

afterEach(async () => {
  await models.User.destroy({
    where: {},
  });
});

afterAll(() => {
  models.sequelize.close();
  fs.unlinkSync(path.resolve(__dirname, "append.tmp.csv"));
});

describe("Upload users through /users/upload", () => {
  test("Upload users using csv", async () => {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, "append.tmp.csv"),
      headers: ["id", "login", "name", "salary"],
    });

    await csvFile.create([
      { id: "a1", login: "b1", name: "c1", salary: "1234.00" },
      { id: "a2", login: "b2", name: "c2", salary: "2234.10" },
      { id: "a3", login: "b3", name: "c3", salary: "3224.20" },
      { id: "a4", login: "b4", name: "c4", salary: "5224.20" },
      { id: "a5", login: "b5", name: "c5", salary: "7224.20" },
      { id: "a6", login: "b6", name: "c6", salary: "2344.20" },
      { id: "a7", login: "b7", name: "c7", salary: "3724.20" },
    ]);

    const uploadUsers = await request(app)
      .post("/users/upload")
      .attach("file", csvFile.path)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });
  });

  test("Upload users using csv with UTF-8 encoding", async () => {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, "append.tmp.csv"),
      headers: ["id", "login", "name", "salary"],
    });

    await csvFile.create([
      { id: "a1", login: "b1", name: "甲", salary: "1234.00" },
      { id: "a2", login: "b2", name: "乙", salary: "2234.10" },
      { id: "a3", login: "b3", name: "c3", salary: "3224.20" },
      { id: "a4", login: "b4", name: "c4", salary: "5224.20" },
      { id: "a5", login: "b5", name: "c5", salary: "7224.20" },
      { id: "a6", login: "b6", name: "c6", salary: "2344.20" },
      { id: "a7", login: "b7", name: "c7", salary: "3724.20" },
    ]);

    const uploadUsers = await request(app)
      .post("/users/upload")
      .attach("file", csvFile.path)
      .then((res) => {
        expect(res.statusCode).toBe(200);
      });

    const testUser = await request(app)
      .get("/users/a1")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.user.user_id).toBe("a1");
        expect(res.body.user.user_name).toBe("甲");
        expect(res.body.user.user_salary).toBe("1234.00");
      });
  });

  test("Upload users using empty file", async () => {
    const csvFile = new CsvFile({
      path: path.resolve(__dirname, "append.tmp.csv"),
    });

    await csvFile.create([]);

    const uploadUsers = await request(app)
      .post("/users/upload")
      .attach("file", csvFile.path)
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
});

test("Get user through /users/id", async () => {
  const csvFile = new CsvFile({
    path: path.resolve(__dirname, "append.tmp.csv"),
    headers: ["id", "login", "name", "salary"],
  });

  await csvFile.create([
    { id: "a1", login: "b1", name: "c1", salary: "1234.00" },
    { id: "a2", login: "b2", name: "c2", salary: "2234.10" },
    { id: "a3", login: "b3", name: "c3", salary: "3224.20" },
  ]);

  const uploadUsers = await request(app)
    .post("/users/upload")
    .attach("file", csvFile.path)
    .then((res) => {
      expect(res.statusCode).toBe(200);
    });

  const testUser = await request(app)
    .get("/users/a1")
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.user.user_id).toBe("a1");
      expect(res.body.user.user_salary).toBe("1234.00");
    });

  const testUser2 = await request(app)
    .get("/users/a3")
    .then((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.body.user.user_id).toBe("a3");
    });
});
