import { type User, UserStore } from "../../models/userModel";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const { BCRYPT_PASSWORD } = process.env;

const store = new UserStore();

describe("user model", () => {
  let newUser: User;
  beforeAll(async () => {
    newUser = await store.create({
      first_name: "Shrief",
      last_name: "Essam",
      password: "password123",
    });
  });

  describe("model should have all Requirements methods", () => {
    it("should have index method", () => {
      expect(store.index).toBeDefined();
    });
    it("should have show method", () => {
      expect(store.show).toBeDefined();
    });
    it("should have create method", () => {
      expect(store.create).toBeDefined();
    });
  });

  describe("create method", () => {
    it("create method should add a user", () => {
      const userInfo = {
        first_name: newUser.first_name,
        last_name: newUser.last_name,
      };
      expect(userInfo).toEqual({
        first_name: "Shrief",
        last_name: "Essam",
      });
    });

    it("password should be hashed", () => {
      expect(
        bcrypt.compareSync(
          "password123" + (BCRYPT_PASSWORD as string),
          newUser.password
        )
      ).toBe(true);
    });
  });

  it("show method should return the right user", async () => {
    const result = await store.show(1);
    const userInfo = {
      id: result.id,
      first_name: result.first_name,
      last_name: result.last_name,
    };
    expect(userInfo).toEqual({
      id: 1,
      first_name: "Shrief",
      last_name: "Essam",
    });
  });

  it("index method should retern list of users", async () => {
    const result = await store.index();
    expect(result.length).toEqual(1);
  });
});
