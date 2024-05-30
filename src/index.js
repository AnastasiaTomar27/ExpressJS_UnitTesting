const express = require('express');
const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.json({ message: "Hello" });
});


app.post("/api/product", (req, res) => {
    const { numbers } = req.body;
    const product = numbers.reduce((accumulator, element) => accumulator * element, 1)
    //res.json({ message:  `The product of submitted numbers is ${product}.`});
    //console.log(req.body);
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

app.use((err, req, res, next) => {
    return res.status(500).json({ msg: err.msg || err.message, code: err.code })
});

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

module.exports = app;