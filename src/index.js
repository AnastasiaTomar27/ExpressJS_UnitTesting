const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const passport = require('passport');
// const session = require('express-session');
//const app = require('../index');
//const path = require('path');
//const dotenv  = require('dotenv');

//dotenv.load({  path: '.env' });

app.use(express.json()); // middleware will process JSON  data sent by client

app.use(bodyParser.json()); // this is a middleware. It parse JSON Request Bodies
//app.use(bodyParser.urlencoded({ extended: true })); // Parses data sent via HTML forms
//app.use(session());
//app.use(passport.initialize());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});


app.post("/api/product", (req, res) => {
    const { numbers } = req.body;

    if (!numbers) return res.status(400).send({message: "Parameter numbers is required."})
    if (!Array.isArray(numbers)) return res.status(400).send({message: "Parameter numbers must be an array."})
    if (!numbers.length) return res.status(400).send({message: "Parameter numbers must contain at least 1 number."})

    const allAreNumbers = numbers.every(number => {
        return typeof number === "number"
    })
    if (!allAreNumbers) return res.status(400).send({message: "Only numbers can be submitted!"})

    const product = numbers.reduce((accumulator, element) => accumulator * element, 1)
    return res.json({ message:  `The product of submitted numbers is ${product}.`}); 
})



app.post("/api/prices", (req, res) => {
    const { prices } = req.body;
    if (!prices) return res.status(400).send({message: "Parameter prices is required."})
    if (!Array.isArray(prices)) return res.status(400).send({message: "Parameter prices must be an array."})
    
    const pricesAreNumbers = prices.every(price => {
        return typeof price === "number"
    })
    if (!pricesAreNumbers) return res.status(400).send({message: "Prices must be only numbers."})
    
    const total_price = prices.reduce((accumulator, price) => accumulator + price, 0)
    if (total_price > 100) return res.json({message: `Total price after discount is ${(total_price * 0.1).toFixed(2)} €.`});
    return res.json({message: `Total price is ${total_price} €.`})
    
})

app.post("/api/email_address", (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).send({message: "Parameter email is required."})
    if (typeof email !== "string") return res.status(400).send({message: "Email address shoud be a string."})
    if (email.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) return res.json({message: `${email} is valid`});
    return res.status(400).send({message: `${email} is invalid`});
    
});

app.use((req, res, next) => {
    return res.status(404).json({ msg: "Not found" });
}); // in case if route does not exist, JSON message "Not found" will be shown

app.use((err, req, res, next) => {
    return res.status(500).json({ msg: err.msg || err.message, code: err.code })
}); // integrates middleware in all routes

const server = app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});
module.exports = server;


