import { type User, UserStore } from "../../models/userModel";
import { validatePassword } from "../../utilities/bycrypt";

const store = new UserStore();

describe("user model", () => {
  let newUser: User;
  beforeAll(async () => {
    newUser = await store.create({
      email: "shriefessam1999@gmail.com",
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
    it("should have authentiacate method", () => {
      expect(store.authenticate).toBeDefined();
    });
  });

  describe("test model methods", () => {
    describe("create method", () => {
      it("create method should add a user", () => {
        const userInfo = {
          email: newUser.email,
          first_name: newUser.first_name,
          last_name: newUser.last_name,
        };
        expect(userInfo).toEqual({
          email: "shriefessam1999@gmail.com",
          first_name: "Shrief",
          last_name: "Essam",
        });
      });

      it("password should be hashed", () => {
        expect(validatePassword("password123", newUser.password)).toBe(true);
      });

      it("should throw an error if email already exist", async () => {
        let errMessage: string = "";
        try {
          await store.create({
            email: "shriefessam1999@gmail.com",
            first_name: "mohamed",
            last_name: "esmail",
            password: "password123",
          });
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not create new user. Error: email is already used!"
        );
      });
    });

    describe("show method", () => {
      it("should return the right user", async () => {
        const result = await store.show(1);
        const userInfo = {
          id: result.id,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
        };
        expect(userInfo).toEqual({
          id: 1,
          email: "shriefessam1999@gmail.com",
          first_name: "Shrief",
          last_name: "Essam",
        });
      });

      it("should throw an error if user enter not existing id", async () => {
        let errMessage: string = "";
        try {
          await store.show(3);
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not get user, Error: you should provide existing id"
        );
      });
    });

    describe("authentiacate method", () => {
      it("should return a user", async () => {
        const result = await store.authenticate(
          "shriefessam1999@gmail.com",
          "password123"
        );
        const userInfo = {
          id: result.id,
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
        };
        expect(userInfo).toEqual({
          id: 1,
          email: "shriefessam1999@gmail.com",
          first_name: "Shrief",
          last_name: "Essam",
        });
      });

      it("should throw an error if email is not exist", async () => {
        let errMessage: string = "";
        try {
          await store.authenticate("shriefessam1@gmail.com", "password123");
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not sign in. Error: no such email exist"
        );
      });

      it("should throw an error if user enteres wrong password", async () => {
        let errMessage: string = "";
        try {
          await store.authenticate("shriefessam1999@gmail.com", "dsds");
        } catch (err) {
          errMessage = err.message;
        }
        expect(errMessage).toEqual(
          "could not sign in. Error: Invalid password"
        );
      });
    });

    it("index method should retern list of users", async () => {
      const result = await store.index();
      expect(result.length).toEqual(1);
    });
  });
});
