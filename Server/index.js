const express = require("express");
const config = require("config");

const app = express();

const PORT = 3001;

app.get('/', (req, res) => {
    console.log('hello')
    res.send('Hello World!')
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
