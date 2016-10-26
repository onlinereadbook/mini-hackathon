"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cheerio = require("cheerio");
var path = require("path");
var fs = require("fs");
var moment = require("moment");

var firebaselib = require("./firebaselib");

// async function hello() {
//     return new Promise((resolve) => {
//         resolve('ok');
//     });
// }

// (async() => {
//     let ok = await hello();
//     console.log(ok);
// })()

module.exports = {

    '抓取虎航的資料': function _(browser) {
        //         // console.log(browser);


        var startStation = 'KHH';
        var backStation = 'KIX';

        //+9天抓一個禮拜

        // break;


        for (var i = 0; i < 2; i++) {
            var thismoment = moment().add(9 * i, 'day');
            var todayYearMonth = thismoment.format("YYYY-MM");
            var today = thismoment.format("DD");
            browser.url('https://booking.tigerair.com/Search.aspx?culture=zh-TW').waitForElementVisible('body', 1000).click("#ControlGroupSearchView_AvailabilitySearchInputSearchVieworiginStation1 option[value=\"" + startStation + "\"]").click("#ControlGroupSearchView_AvailabilitySearchInputSearchViewdestinationStation1 option[value=\"" + backStation + "\"]").click("#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketMonth1 option[value=\"" + todayYearMonth + "\"]").click("#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketDay1 option[value=\"" + today + "\"]").click("#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketMonth2 option[value=\"" + todayYearMonth + "\"]").click("#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketDay2 option[value=\"" + today + "\"]").click(".btnSearchPanel", function (e) {
                console.log(e);
            }).pause(2000).source(function (result) {
                var _this3 = this;

                // .source() will dump the target page into text format
                //         //                     //  console.log(result.value);
                var $ = cheerio.load(result.value); // so it needs to be parse


                var html = $('#lfMarket1 > li').html();
                var results = [];
                $('#lfMarket1 > li').each(function (i, elm) {

                    //                             //跑每一個 li 找出日期 與 價格
                    //                             //console.log($(elm).html());
                    //                             //var thisstring = $(elm).text();
                    var thisstring = $(elm).html();

                    //let regex = new RegExp("\\d{0,4}.{1}\\d{1,2}.{1}\\d{1,2}");
                    var regex = new RegExp("\\d{0,4}\\-\\d{1,2}\\-\\d{1,2}");
                    if (regex.test(thisstring)) {
                        var date = regex.exec(thisstring)[0];
                        //抓金額
                        var pricetext = $(elm).find('span').first().text();
                        var pricearr = pricetext.split(" ");
                        var currencyCode = pricearr[0];
                        var price = pricearr[1];
                        results.push({
                            date: date,
                            currencyCode: currencyCode,
                            price: price,
                            source: '虎航',
                            form: startStation,
                            to: backStation
                        });
                    }
                });

                var results2 = [];
                $('#lfMarket2 > li').each(function (i, elm) {

                    //                             //跑每一個 li 找出日期 與 價格
                    //                             //console.log($(elm).html());
                    //                             //var thisstring = $(elm).text();
                    var thisstring = $(elm).html();

                    //let regex = new RegExp("\\d{0,4}.{1}\\d{1,2}.{1}\\d{1,2}");
                    var regex = new RegExp("\\d{0,4}\\-\\d{1,2}\\-\\d{1,2}");
                    if (regex.test(thisstring)) {
                        var date = regex.exec(thisstring)[0];
                        //抓金額
                        var pricetext = $(elm).find('span').first().text();
                        var pricearr = pricetext.split(" ");
                        var currencyCode = pricearr[0];
                        var price = pricearr[1];
                        results2.push({
                            date: date,
                            currencyCode: currencyCode,
                            price: price,
                            source: '虎航',
                            form: backStation,
                            to: startStation
                        });
                    }
                });

                console.log(results);
                //         //  let out = path.join("./output/", `tirgerfly${Date.now()}.html`);
                //         // console.log(out);

                //         // fs.writeFileSync(out, html);

                (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                        while (1) {
                            switch (_context3.prev = _context3.next) {
                                case 0:
                                    try {
                                        //寫入資料
                                        results.map(function (e) {
                                            var _this = this;

                                            var data = e.date.split("-");
                                            console.log(data);
                                            (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                                                return _regenerator2.default.wrap(function _callee$(_context) {
                                                    while (1) {
                                                        switch (_context.prev = _context.next) {
                                                            case 0:
                                                                _context.next = 2;
                                                                return firebaselib.write("/tigter/" + data[0] + "/" + data[1] + "/" + data[2] + "/" + startStation + backStation, {
                                                                    results: e
                                                                });

                                                            case 2:
                                                            case "end":
                                                                return _context.stop();
                                                        }
                                                    }
                                                }, _callee, _this);
                                            }))();
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }

                                    try {
                                        //寫入資料
                                        results2.map(function (e) {
                                            var _this2 = this;

                                            var data = e.date.split("-");
                                            //console.log(data);
                                            (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
                                                return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                    while (1) {
                                                        switch (_context2.prev = _context2.next) {
                                                            case 0:
                                                                _context2.next = 2;
                                                                return firebaselib.write("/tigter/" + data[0] + "/" + data[1] + "/" + data[2] + "/" + backStation + startStation, {
                                                                    results: e
                                                                });

                                                            case 2:
                                                            case "end":
                                                                return _context2.stop();
                                                        }
                                                    }
                                                }, _callee2, _this2);
                                            }))();
                                        });
                                    } catch (e) {
                                        console.log(e);
                                    }

                                case 2:
                                case "end":
                                    return _context3.stop();
                            }
                        }
                    }, _callee3, _this3);
                }))();
            }).pause(2000);
        }
    }

};
//# sourceMappingURL=main.js.map