import flypeach = require('./flypeach');
import moment = require('moment');
//import sleep = require('sleep');
import firebase = require('./firebaselib.js');

(async () => {

    let thismoment = moment();
    //let todayYearMonth = thismoment.format("YYYY-MM");
    //let today = thismoment.format("DD");
    //console.log(thismoment.format("YYYYMMDD"));
    let idateFrom = thismoment.format("YYYYMMDD");
    let idateTo = thismoment.format("YYYYMMDD");
    let catchdays = 120;
    let results: AirplaneResult[] = [];
    //let results = [];
    let origin = 'TPE';
    let destination = 'HND';

    for (let i = 0; i < catchdays; i++) {

        let idateFrom2 = moment(idateFrom).add(i, 'day');
        let idateTo2 = moment(idateTo).add(i, 'day');
        //  console.log(idateFrom2);
        let temp = await flypeach.exec(idateFrom2, idateTo2);

        //  console.log(temp);
        //sleep.sleep(1);   
        //results.push(temp);

        results.push({
            date: '2016/' + temp[0].date,
            currencyCode: temp[0].currencyCode,
            price: temp[0].price !== NaN ? temp[0].price : 0,
            source: '樂桃',
            from: origin,
            to: destination
        });



    };


    results.map(async function (e) {
        let data = e.date.split("/");
        console.log('firebase', e, data, origin, destination);

        await firebase.write(`/peach/${data[0]}/${data[1]}/${data[2]}/${origin}${destination}`, {
            // await firebase.write(`/hello2`, {
            results: e
        });

    });


    // (async () => {
    //     try {
    //         //寫入資料
    //await firebase.write('/hello', { time: Date.now() });
    //         //讀出資料
    //         let result = await firebase.read('/hello');
    //         //使用完畢呼叫
    //         firebase.finish();

    //         console.log(result);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // })();
    // console.log(results);
    //)
})()