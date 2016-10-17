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
(() => __awaiter(this, void 0, void 0, function* () {
    let idateFrom = '20161020';
    let idateTo = '20161030';
    let catchdays = 3;
    let results = [];
    let origin = 'TPE';
    let destination = 'HND';
    for (let i = 0; i < catchdays; i++) {
        let idateFrom2 = moment(idateFrom).add(i, 'day').format('YYYYMMDD');
        let idateTo2 = moment(idateTo).add(i, 'day').format('YYYYMMDD');
        //console.log(idateFrom2);
        let temp = yield flypeach.exec(idateFrom2, idateTo2);
        //console.log(temp);
        //sleep.sleep(1);
        results.push(temp);
    }
    ;
    console.log(results);
}))();
