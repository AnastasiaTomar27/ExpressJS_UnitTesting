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
    res.json({ message:  `The product of submitted numbers is ${product}.`});
    console.log(req.body);
})

app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

module.exports = app;