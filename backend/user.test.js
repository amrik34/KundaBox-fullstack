const mongoose = require("mongoose");
const {insert_user, Codes, User} = require("./index");

beforeAll(async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
  await User.deleteMany({});
  // Seed one user
  await User.create({
    user_name: "joe",
    dob: new Date("2000-01-01"),
    email: "joe@kundabox.com",
    password: "12ABCabc",
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("insert_user tests", () => {
  test("valid user", async () => {
    const res = await insert_user(
      "sarah123",
      "1990-05-20",
      "sarah@test.com",
      "Pass12word"
    );
    expect(res.result).toBe(true);
  });

  test("duplicate user", async () => {
    const res = await insert_user(
      "joe",
      "2000-01-01",
      "joe@kundabox.com",
      "12ABCabc"
    );
    expect(res.result).toBe(false);
    expect(res.code).toBe(Codes.USER_ALREADY_REGISTERED);
  });

  test("invalid names", async () => {
    const res1 = await insert_user(
      "a",
      "1990-01-01",
      "a@test.com",
      "Pa12ssword"
    );
    const res2 = await insert_user(
      "averylongusernameeeee",
      "1990-01-01",
      "b@test.com",
      "Pa12ssword"
    );
    expect(res1.result).toBe(false);
    expect(res2.result).toBe(false);
  });

  test("invalid dob", async () => {
    const res = await insert_user(
      "younguser",
      "2010-01-01",
      "y@test.com",
      "Pa12ssword"
    );
    expect(res.result).toBe(false);
    expect(res.code).toBe(Codes.INVALID_DOB);
  });

  test("invalid emails", async () => {
    const res1 = await insert_user(
      "u1",
      "1990-01-01",
      "bademail",
      "Pa12ssword"
    );
    const res2 = await insert_user(
      "u2",
      "1990-01-01",
      "missing@domain",
      "Pa12ssword"
    );
    expect(res1.result).toBe(false);
    expect(res2.result).toBe(false);
  });

  test("invalid passwords", async () => {
    const res1 = await insert_user("u3", "1990-01-01", "u3@test.com", "short");
    const res2 = await insert_user(
      "u4",
      "1990-01-01",
      "u4@test.com",
      "lowercase12"
    );
    const res3 = await insert_user(
      "u5",
      "1990-01-01",
      "u5@test.com",
      "NoNumber"
    );
    const res4 = await insert_user(
      "u6",
      "1990-01-01",
      "u6@test.com",
      "OneNumA"
    );
    expect(res1.result).toBe(false);
    expect(res2.result).toBe(false);
    expect(res3.result).toBe(false);
    expect(res4.result).toBe(false);
  });
});
