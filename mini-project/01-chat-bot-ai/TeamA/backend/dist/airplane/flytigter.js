"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const moment = require('moment');
function getAvailability(dateFrom, dateTo, iAdult, iChild, origin, destination) {
    return __awaiter(this, void 0, void 0, function* () {
        let payload = {
            "origin": origin,
            "destination": destination,
            "dateFrom": moment(dateFrom).format('YYYYMMDD'), "dateTo": moment(dateTo).format('YYYYMMDD'),
            "iOneWay": "false", "iFlightOnly": "0",
            "iAdult": iAdult,
            "iChild": iChild,
            "iInfant": 0, "BoardingClass": "",
            "CurrencyCode": "TWD",
            "strPromoCode": "", "SearchType": "FARE", "iOther": 0, "otherType": "", "strIpAddress": ""
        };
        let url = "https://book.flypeach.com/WebService/B2cService.asmx/GetAvailability";
        return new Promise((resolve, reject) => {
            request.post(url, { json: payload }, (err, res, data) => {
                if (err) {
                    return reject({
                        statusCode: 500,
                        statusMessage: err.message
                    });
                }
                if (!data) {
                    return reject({
                        statusCode: res.statusCode,
                        statusMessage: res.statusMessage
                    });
                }
                resolve(data);
            });
        });
    });
}
function exec(dateFrom = moment().add(1, 'day'), dateTo = moment().add(2, 'day'), iAdult = 1, iChild = 0, origin = 'TPE', destination = 'HND') {
    return __awaiter(this, void 0, void 0, function* () {
        //因為格式不確定所以指定為 any (即一般 json 物件)
        let data = yield getAvailability(dateFrom, dateTo, iAdult, iChild, origin, destination);
        let html = data.d;
        console.log('html');
        let out = path.join(__dirname, `flytigher_${Date.now()}.html`);
        fs.writeFileSync(out, html);
        let $ = cheerio.load(html);
        let results = [];
        $(".showdateselect").each((i, elem) => {
            //抽出日期 - 星期 ... ex: 10/17 (Mon) 
            let dayString = $(elem).find(".flighttimeSelect").first().clone().children().remove().end().text();
            //切出日期
            let date = new RegExp("\\d{1,2}\\/\\d{1,2}").exec(dayString)[0];
            //切出星期
            let weekDay = new RegExp("\\(.{3}\\)").exec(dayString)[0].replace(/\(|\)/g, '');
            //抽出幣別 - 價錢 ... ex: NT$3,800~
            let priceString = $(elem).find('.price').first().text().replace(/\s/g, '');
            //切出幣別
            let currencyCode = priceString.split('$')[0];
            //切出價錢
            let price = parseFloat(priceString.replace(new RegExp(`${currencyCode}|\\$|,|~`, 'g'), ''));
            results.push({
                date, weekDay, currencyCode, price,
                source: '樂桃'
            });
        });
        return results;
    });
}
exports.exec = exec;
;
