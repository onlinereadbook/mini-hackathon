"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const flypeach = require('./flypeach');
const moment = require('moment');
//import sleep = require('sleep');
const firebase = require('./firebaselib.js');
(() => __awaiter(this, void 0, void 0, function* () {
    let thismoment = moment();
    //let todayYearMonth = thismoment.format("YYYY-MM");
    //let today = thismoment.format("DD");
    //console.log(thismoment.format("YYYYMMDD"));
    let idateFrom = thismoment.format("YYYYMMDD");
    let idateTo = thismoment.format("YYYYMMDD");
    let catchdays = 120;
    let results = [];
    //let results = [];
    let origin = 'TPE';
    let destination = 'HND';
    for (let i = 0; i < catchdays; i++) {
        let idateFrom2 = moment(idateFrom).add(i, 'day');
        let idateTo2 = moment(idateTo).add(i, 'day');
        //  console.log(idateFrom2);
        let temp = yield flypeach.exec(idateFrom2, idateTo2);
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
    }
    ;
    results.map(function (e) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = e.date.split("/");
            console.log('firebase', e, data, origin, destination);
            yield firebase.write(`/peach/${data[0]}/${data[1]}/${data[2]}/${origin}${destination}`, {
                // await firebase.write(`/hello2`, {
                results: e
            });
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
}))();
