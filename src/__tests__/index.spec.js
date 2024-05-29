const request = require('supertest');
const app = require('../index');

describe('Testing routs', () => {
    test("should respond with a 200 status code and a message Hello", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Hello");
    });

    test('should return product of submitted numbers and a 200 status code', async () => {
        const response = await request(app).post("/api/product").send({
            "numbers": [2, 4, 88]
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(`The product of submitted numbers is ${2*4*88}.`);
    });
    test('should respond with a 400 status code and a message "Only numbers can be submitted!"', async () => {
        const response = await request(app).post("/api/product").send({
            "numbers": [2, 4, "t"]
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Only numbers can be submitted!");
    })
});
   
