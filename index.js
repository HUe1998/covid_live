const express = require('express');
const fetch = require('node-fetch');
const app = express();
const ejs = require('ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
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