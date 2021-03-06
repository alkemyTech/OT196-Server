const request = require('supertest')
const app = require('../app')

var token = ''
var newPost = ''
const correctData = {
  name: "News Title Success",
  content: "News Content",
  categoryId: 1,
  image:
    "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg",
};
const newData = {
  name: "News Title Modified",
  content: "News Content",
  categoryId: 1,
  image:
    "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg",
};
const incorrectData = {
  'Without name': {
    content: "News Content",
    categoryId: 1,
    image:
      "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg",
  },
  'Without content': {
    name: "News Title",
    categoryId: 1,
    image:
      "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg",
  },
  'Without image': {
    name: "News Title",
    content: "News Content",
    categoryId: 1,
  },
  'Without category': {
    name: "News Title",
    content: "News Content",
    image:
    "https://alkemy196.s3.sa-east-1.amazonaws.com/images/np7-whj-2x4x-image-placeholder.jpg",
  },
  Empty: {}
};


describe('NEWS ENDPOINT', () => {
    
    
    beforeAll( async () => {
        const res = await request(app).post('/auth/login/')
        .send({email: 'usuarioadmin@mail.com', password: 'admin'})
        token = `Bearer ${res.body.user.token}`
    });

 
    describe("POST /news", () => {

      Object.keys(incorrectData).forEach((e) => {
        test(`Failed post news (Error: ${e})`, async () => {
          await request(app)
            .post("/news")
            .send(incorrectData[e])
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(422);
        });
      });

      test("Successfully post news", async () => {
        const data = await request(app)
          .post("/news")
          .send(correctData)
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200);
        newPost = data.body.createdNew
      });

      test("Failed post news (Admin token required)", async () => {
        await request(app).post("/news").send(correctData).expect(401);
      });

    }); 

    describe('GET /news', () => {

        test('Successfully get news list', async () => {
            await request(app).get('/news')
            .expect('Content-Type', /json/).expect(200)
        })
        test('Success get news by ID', async () => {
            await request(app).get(`/news/${newPost.id}`)
            .expect('Content-Type', /json/).expect(200)
        })
        test('Fail get news by ID (Non-existent ID)', async () => {
            await request(app).get(`/news/${newPost.id+1}`)
            .expect('Content-Type', /json/).expect(404)
        })
    
    })

    describe("PUT /news", () => {

      Object.keys(incorrectData).forEach((e) => {
        test(`Failed update news (Error: ${e})`, async () => {
          await request(app)
            .put(`/news/${newPost.id}`)
            .send(incorrectData[e])
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(422);
        });
      });

      test("Successfully update news", async () => {
        const data = await request(app)
          .put(`/news/${newPost.id}`)
          .send(newData)
          .set("Authorization", token)
          .expect("Content-Type", /text/)
          .expect(200);
      });

      test("Failed update news (Invalid id)", async () => {
        await request(app).put(`/news/${newPost.id+1}`).send(correctData).set("Authorization", token).expect(404);
      });

      test("Failed update news (Admin token required)", async () => {
        await request(app).put(`/news/${newPost.id}`).send(correctData).expect(401);
      });

    }); 

    describe("DELETE /news", () => {
      // Try delete without admin token
      test("Error on delete (Error: Request without admin token)", async () => {
        await request(app)
          .delete(`/news/${newPost.id}`)
          .expect("Content-Type", /json/)
          .expect(401);
      });
      // Delete previously posted news
      test("Successfully delete", async () => {
        await request(app)
          .delete(`/news/${newPost.id}`)
          .set("Authorization", token)
          .expect("Content-Type", /text/)
          .expect(200);
      });
      // Try delete again the same id, should throw error
      test("Error on delete (Error: Non-existent id)", async () => {
        await request(app)
          .delete(`/news/${newPost.id}`)
          .expect("Content-Type", /json/)
          .expect(404)
          .set("Authorization", token);
      });
    })


})