const express = require("express");
const app = express();
const fs = require('fs');
const cors = require('cors');
const port = 8011;

app.use(cors());


app.get("/", (req, res) => {
    res.send("harmony one!");
});


app.get("/harmony.json", (req, res) => {
    fs.readFile(__dirname + '/' + 'harmony.json', 'utf8', (err, data) => {
        res.end(data);
    });
});

app.listen(port, () => {
    console.log(`Visit http://localhost:8011`);
});
