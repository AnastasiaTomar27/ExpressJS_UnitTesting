const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const path = require('path');
//const dotenv  = require('dotenv');

//dotenv.load({  path: '.env' });

app.use(express.json()); // middleware will process JSON  data sent by client

app.use(bodyParser.json()); // this is a middleware. It parse JSON Request Bodies
//app.use(bodyParser.urlencoded({ extended: true })); // Parses data sent via HTML forms

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});


app.post("/api/product", (req, res) => {
    const { numbers } = req.body;
    const product = numbers.reduce((accumulator, element) => accumulator * element, 1)
    var allAreNumbers = true;
    numbers.forEach(number => {
        const parsedNumber = parseInt(number);
        if (isNaN(parsedNumber)) {
            allAreNumbers = false;
            return 
        }
    })
    if (allAreNumbers === false) return res.status(400).send({message: "Only numbers can be submitted!"})
    else return res.json({ message:  `The product of submitted numbers is ${product}.`}); 
})



app.post("/api/prices", (req, res) => {
    const { prices } = req.body;
    const total_price = prices.reduce((accumulator, price) => accumulator + price)
    if (total_price > 100) return res.json({message: `Total price after discount is ${(total_price * 0.1).toFixed(2)} €.`});
    else return res.json({message: `Total price is ${total_price} €.`})
    
})

app.post("/api/email_address", (req, res) => {
    const { email } = req.body;
    if (email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.json({message: `${email} is valid`});
    else return res.status(400).send({message: `${email} is invalid`});
    
});

app.use((err, req, res, next) => {
    return res.status(500).json({ msg: err.msg || err.message, code: err.code })
}); // integrates middleware in all routes

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

module.exports = app;