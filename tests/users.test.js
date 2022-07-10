const request = require("supertest");
const app = require("../app");
const { User } = require("../models/index");

const testUser = {
  email: "usuarionormal@mail.com",
  password: "normal",
};

const testAdmin = {
  email: "ezequielalmada@mail.com",
  password: "almada",
};

const testRequest = (method, route, statusExpected, body = {}, token = "") => {
  let testReq = request(app);
  switch (method) {
    case "post":
      testReq = testReq.post(route).send(body);
      break;
    case "delete":
      testReq = testReq.delete(route).send(body);
      break;
    case "put":
      testReq = testReq.put(route).send(body);
      break;
    default:
      testReq = testReq.get(route);
      break;
  }

  if (token) {
    testReq = testReq.set("Authorization", `Bearer ${token}`);
  }
  return testReq
    .expect(statusExpected)
    .expect("Content-Type", /application\/json/);
};

const logUser = async (user) => {
  const requestLog = await testRequest("post", "/auth/login", 200, {
    email: user.email,
    password: user.password,
  });
  return requestLog;
};

describe("GET /users", () => {
  test("Fails: user not logged in", async () => {
    await testRequest("get", "/users", 401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails: user is not an admin", async () => {
      const loggedUser = await logUser(testUser);

      await testRequest("get", "/users", 403, {}, loggedUser.body.user.token);
    }, 100000);

    test("Succeeds: user is admin", async () => {
      const loggedUser = await logUser(testAdmin);

      await testRequest("get", "/users", 200, {}, loggedUser.body.user.token);
    }, 100000);
  });
});

describe("DELETE /users/:id", () => {
  test("Fails: user is not logged in", async () => {
    await testRequest("delete", "/users/1", 401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails: user is not an admin", async () => {
      const loggedUser = await logUser(testUser);

      await testRequest(
        "delete",
        "/users/1",
        403,
        {},
        loggedUser.body.user.token
      );
    }, 100000);

    describe("If user is admin", () => {
      test("Fails: id is not valid", async () => {
        const invalidId = "12jhhj31231";

        const loggedUser = await logUser(testAdmin);

        await testRequest(
          "delete",
          `/users/${invalidId}`,
          403,
          {},
          loggedUser.body.user.token
        );
      }, 100000);

      test("Success: id is valid", async () => {
        const testNewUser = {
          firstName: "Will Be",
          lastName: "Deleted",
          email: "willbedeleted@mail.com",
          password: "deleted",
          roleId: 2,
        };

        await testRequest("post", "/users/auth/register", 200, testNewUser);

        const loggedUser = await logUser(testAdmin);

        const userToDelete = await User.findOne({
          where: { email: testNewUser.email },
        });

        await testRequest(
          "delete",
          `/users/${userToDelete.id}`,
          200,
          {},
          loggedUser.body.user.token
        );
      }, 100000);
    });
  });
});

describe("PUT /users/:id", () => {
  test("Fails: user is not logged in", async () => {
    await testRequest("put", "/users/1", 401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails: user is not an admin", async () => {
      const loggedUser = await logUser(testUser);

      await testRequest("put", "/users/1", 403, {}, loggedUser.body.user.token);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails: id is not valid", async () => {
        const invalidId = "12jhhj31231";

        const loggedUser = await logUser(testAdmin);

        await testRequest(
          "put",
          `/users/${invalidId}`,
          403,
          {},
          loggedUser.body.user.token
        );
      }, 100000);

      describe("If id is valid", () => {
        test("Fails: email is not valid", async () => {
          const testNewUser = {
            firstName: "Will Be",
            lastName: "Updated",
            email: "willbeupdated@mail.com",
            password: "willbeupdated",
            roleId: 2,
          };

          await testRequest("post", "/users/auth/register", 200, testNewUser);

          const loggedUser = await logUser(testAdmin);

          const userToUpdate = await User.findOne({
            where: { email: testNewUser.email },
          });

          const notValidUpdate = {
            firstName: "Test",
            lastName: "Lastname",
            email: "notValid",
          };

          await testRequest(
            "put",
            `/users/${userToUpdate.id}`,
            403,
            notValidUpdate,
            loggedUser.body.user.token
          );
        }, 100000);

        test("Succeeds: email is valid", async () => {
          const testNewUser = {
            firstName: "Will Be",
            lastName: "Updated",
            email: "willbeupdated@mail.com",
            password: "willbeupdated",
            roleId: 2,
          };

          const loggedUser = await logUser(testAdmin);

          const userToUpdate = await User.findOne({
            where: { email: testNewUser.email },
          });

          const validUpdate = {
            firstName: "Test",
            lastName: "Lastname",
            email: "valid@email.com",
          };

          await testRequest(
            "put",
            `/users/${userToUpdate.id}`,
            200,
            validUpdate,
            loggedUser.body.user.token
          );
        }, 100000);
      });
    });
  });
});
