const express = require('express');
const fetch = require('node-fetch');
const app = express();
const ejs = require('ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


app.listen(4000, () => {
    console.log('App listening on port 4000');
});

app.get('/', async (req, res) => {
    const url = "https://api.covid19api.com/summary"
    const urlData = await (await fetch(url)).json();
    const countryList = await Promise.all(
        urlData.Countries.map(async countryData => {
            let country = await countryData.Country;
            return country;
        })
    );
    const totalList = await Promise.all(
        urlData.Countries.map(async countryData => {
            let totalConfirmed = await countryData.TotalConfirmed;
            return totalConfirmed;
        })
    );
    res.render('index', { requiredData: { countryList: countryList, totalList: totalList } });
});