const express = require('express');
const fetch = require('node-fetch');
const app = express();
const ejs = require('ejs');
app.use(express.json());
app.use(express.urlencoded({ extend: true }));
app.set('view engine', 'ejs');


app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
    const url = "https://api.covid19api.com/summary"
    const { Global, Countries } = await (await fetch(url)).json();
    res.render('index', { Global, Countries });
});