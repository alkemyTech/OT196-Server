const app = require('../app');
const request = require('supertest');

const niceTestimony = {
    "name": "testimonio",
    "content": "contenidos varios"
}

const badTestimony = {
    "name": "",
    "content": 25,
    "other": "other" 
}

const userAdminLogged = async () => {
    const user = request(app).post('/auth/login').send({
        email: 'usuarioadmin@mail.com',
        password: 'admin'
    })
    return user;
}

//Testing Get /testimonials 
describe('GET /testimonials', () => {
    //Should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get('/testimonials').send();
        expect(response.statusCode).toBe(200);
    })

    //Should respond with an array
    test("should respond with an array", async() => {
        const response = await request(app).get("/testimonials").send();
        expect(response.body).toBeInstanceOf(Array);
    })
})

//Testing Post /testimonials 
describe('POST /testimonials', () => {
    //Success check
    describe('using correct object', () => {
    //Should respond with a 200 status code
    test("should respond with a 200 status code", async () => {
        const response = await request(app).post('/testimonials').send(niceTestimony);
        expect(response.statusCode).toBe(200);
    })

    //Should respond with a content-type of application/json
    test("should respond with json", async () => {
        const response = await request(app).post('/testimonials').send(niceTestimony);
        expect(response.header['content-type']).toEqual(
            expect.stringContaining('json')
        );
    })

    //Should respond with object containing a new id
    test("Should respond with an id", async() => {
        const response = await request(app).post("/testimonials").send(niceTestimony);
        expect(response.body.id).toBeDefined();
    })
    });

    //errors check
    describe('using incorrect or malformed object', () => {
        //Should respond with bad request
        test('Should respond with 400 status code', async () => {
            const response = await request(app).post('/testimonials').send({});
            expect(response.statusCode).toBe(400)
        })

        //Should respond with bad request
        test('Should respond with 400 status code', async () => {
            const response = await request(app).post('/testimonials').send(badTestimony);
            expect(response.statusCode).toBe(400)
        })
    })
})

//Testing Put /testimonials
describe('PUT /testimonials', () => {
    //Should respond with 200 status code
    test("should respond with a 200 status code", async () => {
        const response = await request(app).put('/testimonials/1').send(niceTestimony);
        expect(response.statusCode).toBe(200);
    })

    //Should respond with 422 status code
    test('Should respond with 422 status code', async () => {
        const response = await request(app).put('/testimonials/1').send();
        expect(response.statusCode).toBe(422);
    })

    //Should respond with 404 status code
    test('Should respond with 404 status code', async () => {
        const response = await request(app).put('/testimonials/1500').send(niceTestimony);
        expect(response.statusCode).toBe(404);
    })

    //Should respond with message
    test('Should respond with not found message', async () => {
        const response = await request(app).put('/testimonials/1500').send(niceTestimony);
        expect(response.text).toEqual('testimonial not found in the database');
    })
})

//Testing Delete /testimonials
describe('DELETE /testimonials', () => {
    describe('with correct user', () => {
        //Should respond with a 200 status code
        test("should respond with a 200 status code", async() => {
            const User = await userAdminLogged();
            const response = await request(app).delete('/testimonials/9').send().set('Authorization',`Bearer ${User.body.user.token}`)
            expect(response.statusCode).toBe(200);
        })

        //Should respond with a success message
        test("should respond with a success message", async() => {
            const User = await userAdminLogged();
            const response = await request(app).delete('/testimonials/10').send().set('Authorization',`Bearer ${User.body.user.token}`)
            expect(response.body).toEqual({
                success: true,
                message: "The testimony has been deleted.",
            });
        })

        //Should respond with a 500 status code
        test("should respond with a 500 status code", async() => {
            const User = await userAdminLogged();
            const response = await request(app).delete('/testimonials/500').send().set('Authorization',`Bearer ${User.body.user.token}`)
            expect(response.statusCode).toBe(500);
        })

        //Should respond with message
        test("should respond with a not found message", async() => {
            const User = await userAdminLogged();
            const response = await request(app).delete('/testimonials/500').send().set('Authorization',`Bearer ${User.body.user.token}`)
            expect(response.body).toEqual({
            success: false,
            message: "Operation failed. The selected testimony does not exist.",
        });
        })
    })
    describe('With incorrect user', () => {
        //Should respond with a 403 status code
        test("should respond with a 403 status code", async () => {
            const response = await request(app).delete('/testimonials/11').send().set("Authorization", `Bearer token`)
            expect(response.statusCode).toBe(403);
        })

        //Should respond with a 401 status code
        test("should respond with a 401 status code", async () => {
            const response = await request(app).delete('/testimonials/11').send();
            expect(response.statusCode).toBe(401);
        })
    })
})