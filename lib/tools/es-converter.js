'use strict'

const fs = require('fs');

//quick and dirty clean me
const transformJSONtoESBulkJSON = (inputPath) => {
    const buffer = fs.readFileSync(inputPath)
    const covidJsonArray = JSON.parse(buffer);
    let result = '';
    let num = 1;
    let i = 0;
    covidJsonArray.forEach(entry => {
        i++;
        const indexData = {
            _index: "covid",
            _id: i.toString()
        }
        const index = {
            index: indexData
        }
        result += JSON.stringify(index) + "\n";
        delete entry.id;
        if (!entry.start_date) {
            const date = new Date().toISOString().slice(0, 10);
            entry.start_date = date;
            entry.end_date = date;
        }
        result += JSON.stringify(entry) + "\n";
        if (i % 500 === 0) {
            fs.writeFileSync('../covid_bulk_' + num + '.json', result);
            num++;
            result = '';
        }
    })
}

transformJSONtoESBulkJSON('../covid.json');