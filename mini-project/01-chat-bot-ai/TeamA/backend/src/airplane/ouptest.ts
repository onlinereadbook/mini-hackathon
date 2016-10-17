import flypeach = require('./flypeach');
import moment = require('moment');
import sleep = require('sleep');

(async () => {
    let idateFrom = '20161020';
    let idateTo = '20161030';
    let catchdays = 3;
    let results: AirplaneResult[] = [];
    let origin = 'TPE';
    let destination = 'HND';
    for (let i = 0; i < catchdays; i++) {

        let idateFrom2 = moment(idateFrom).add(i, 'day').format('YYYYMMDD');
        let idateTo2 = moment(idateTo).add(i, 'day').format('YYYYMMDD');
        //console.log(idateFrom2);
        let temp = await flypeach.exec(idateFrom2, idateTo2);
        //console.log(temp);
        //sleep.sleep(1);
        results.push(temp);
    };


    console.log(results);
)
})()