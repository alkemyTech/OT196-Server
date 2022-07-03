const request = require('supertest')
const app = require('../app')

//FOR ENDPOINT GET MEMBERS (GET)
describe('get members /', ()=> {
    test("Should return with status 200", async ()=> {
        const response = await request(app).get("/members").send()
        expect(response.statusCode).toBe(200)
    })
    test("Should return an array", async ()=> {
        const response = await request(app).get("/members").send()
        expect(response.body).toBeInstanceOf(Array)
    })
})

//FOR ENDPOINT CREATE MEMBER (POST)
describe("post member /", ()=> { 
    const newMember = { 
        name: "Juanito", 
        image: "Image of Juanito" 
    }
    const failMember = {        
        name: null, 
        image: null,
    }
    test("Should return with status 200", async ()=> {
        const response = await request(app).post("/members").send(newMember)
        expect(response.statusCode).toBe(200)
    })
    test("Should return an Object", async ()=> {
        const response = await request(app).post("/members").send(newMember)
        expect(response.body).toBeInstanceOf(Object)
    })  
    test("Shoul return with a confirmed message", async ()=> {
        const response = await request(app).post("/members").send(newMember)
        expect(response.body).toEqual({"message": "¡Nuevo miembro creado con éxito!", "success": true})
    })
    test("Should return a status 400 if name is missing", async ()=> {
        const response = await request(app).post("/members").send(failMember)
        expect(response.statusCode).toBe(400)
    })

})

//FOR ENDPOINT UPDATE MEMBER (PUT)
describe("update member", ()=> {
      const member = {
            name: 'juanito', 
            image: 'Image of Juanito'
        }
    test("Should return with status 200 if the id exist and update the member", async ()=> {      
        const response = await request(app).put("/members/24").send(member)
        expect(response.statusCode).toBe(200)
    })
    test("Should return with a message if the user has been updated", async ()=> {
        const response = await request(app).put("/members/25").send(member)
        expect(response.body).toEqual({"message": "Miembro actualizado con éxito", "success": true})
    })
    test("Should return with a status 400 if the id does not exist", async ()=> {
        const response = await request(app).put("/members/12500").send()
        expect(response.statusCode).toBe(400)
    })
    test("Should return with a message if the user does not exist", async ()=> {
        const response = await request(app).put("/members/2523").send(member)
        expect(response.body).toEqual({"message": "El miembro no existe en la base de datos", "success": false})
    })
   
})

//FOR ENDOINT DELETE MEMBER (DELETE)
describe("delete member", ()=> {
    test("Should return with status 200 if the id exist", async ()=> {
        const response = await request(app).delete("/members/8").send()
        expect(response.statusCode).toBe(200)
    })
    test("Should return with a message if the user has been deleted", async ()=> {
        const response = await request(app).delete("/members/46").send()
        expect(response.body).toEqual({'message': '¡Miembro eliminado con éxito!'})
    })
    test("Should return with status 404 if the id doesn't exist", async( )=> {
        const response = await request(app).delete("/members/1285").send()
        expect(response.statusCode).toBe(404)
    })
    test("Should return with a message if the id doesn't exist", async ()=> {
        const response = await request(app).delete("/members/1285").send()
        expect(response.body).toEqual({"message": "El miembro que está buscando no se encuentra en la lista", "success": false})
    })
})
