const request = require("supertest");
const app = require("../app");

const testUser = {
  email: "usuarionormal@mail.com",
  password: "normal",
};

const testAdmin = {
  email: "usuarioadmin@mail.com",
  password: "admin",
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
