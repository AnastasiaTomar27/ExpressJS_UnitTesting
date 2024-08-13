const request = require('supertest');
const app = require('../index');
afterAll(async () => {
    app.close()
  });


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
    });

    test('should return total price without discount', async () => {
        const response = await request(app).post("/api/prices").send({
            "prices": [3, 14.50, 10]
        });
        expect(response.body.message).toBe(`Total price is ${3 + 14.50 + 10} €.`);
    });

    test('should return total price with discount 10%', async () => {
        const response = await request(app).post("/api/prices").send({
            "prices": [3, 14, 100]
        });
        expect(response.body.message).toBe(`Total price after discount is ${((3 + 14 + 100) * 0.1).toFixed(2)} €.`);
    });

    test('should return a message that email is valid', async () => {
        const response = await request(app).post("/api/email_address").send({
            "email": "anastasia@keuda.fi"
        });
        expect(response.body.message).toBe("anastasia@keuda.fi is valid");
    });

    test('should return a message that email is invalid', async () => {
        const response = await request(app).post("/api/email_address").send({
            "email": "anastasia(@keuda.fi"
        });
        expect(response.body.message).toBe("anastasia(@keuda.fi is invalid");
    })
});
   
