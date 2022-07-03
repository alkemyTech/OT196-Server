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

describe("GET /users", () => {
  test("Fails: user not logged in", async () => {
    await request(app).get("/users").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails: user is not an admin", async () => {
      const loggedUser = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${loggedUser.body.user.token}`)
        .expect(403);
    }, 100000);

    test("Succeeds: user is admin", async () => {
      const loggedUser = await request(app)
        .post("/auth/login")
        .send({
          email: testAdmin.email,
          password: testAdmin.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await request(app)
        .get("/users")
        .set("Authorization", `Bearer ${loggedUser.body.user.token}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    }, 100000);
  });
});

describe("DELETE /users/:id", () => {
  test("Fails: user is not logged in", async () => {
    await request(app).delete("/users/1").expect(401);
  }, 100000);

  describe("If user is logged in", () => {
    test("Fails: user is not an admin", async () => {
      const loggedUser = await request(app)
        .post("/auth/login")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      await request(app)
        .delete(`/users/1`)
        .set("Authorization", `Bearer ${loggedUser.body.user.token}`)
        .expect(403);
    }, 100000);

    describe("If user is admin", () => {
      test("Fails: id is not valid", async () => {
        const invalidId = "12jhhj31231";

        const loggedUser = await request(app)
          .post("/auth/login")
          .send({
            email: testAdmin.email,
            password: testAdmin.password,
          })
          .expect(200)
          .expect("Content-Type", /application\/json/);

        await request(app)
          .delete(`/users/${invalidId}`)
          .set("Authorization", `Bearer ${loggedUser.body.user.token}`)
          .expect(403);
      }, 100000);

      test("Success: id is valid", async () => {
        const testNewUser = {
          firstName: "Will Be",
          lastName: "Deleted",
          email: "willbedeleted@mail.com",
          password: "deleted",
          roleId: 2,
        };

        await request(app)
          .post("/users/auth/register")
          .send(testNewUser)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        const loggedUser = await request(app)
          .post("/auth/login")
          .send({
            email: testAdmin.email,
            password: testAdmin.password,
          })
          .expect(200)
          .expect("Content-Type", /application\/json/);

        const userToDelete = await User.findOne({
          where: { email: testNewUser.email },
        });

        await request(app)
          .delete(`/users/${userToDelete.id}`)
          .set("Authorization", `Bearer ${loggedUser.body.user.token}`)
          .expect(200)
          .expect("Content-Type", /application\/json/);
      }, 100000);
    });
  });
});
