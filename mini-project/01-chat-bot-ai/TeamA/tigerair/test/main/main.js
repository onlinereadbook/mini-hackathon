var cheerio = require("cheerio")
var path = require("path")
var fs = require("fs")
var moment = require("moment")

var firebaselib = require("./firebaselib")

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


    '抓取虎航的資料': (browser) => {
        //         // console.log(browser);


        let startStation = 'KHH';
        let backStation = 'KIX';




        //+9天抓一個禮拜

        // break;


        for (var i = 0; i < 2; i++) {
            let thismoment = moment().add(9 * i, 'day');
            let todayYearMonth = thismoment.format("YYYY-MM");
            let today = thismoment.format("DD");
            browser.
            url('https://booking.tigerair.com/Search.aspx?culture=zh-TW')
                .waitForElementVisible('body', 1000)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchVieworiginStation1 option[value="${startStation}"]`)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchViewdestinationStation1 option[value="${backStation}"]`)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketMonth1 option[value="${todayYearMonth}"]`)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketDay1 option[value="${today}"]`)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketMonth2 option[value="${todayYearMonth}"]`)
                .click(`#ControlGroupSearchView_AvailabilitySearchInputSearchView_DropDownListMarketDay2 option[value="${today}"]`)
                .click(".btnSearchPanel", function (e) {
                    console.log(e)
                })
                .pause(2000)
                .source(function (result) { // .source() will dump the target page into text format
                    //         //                     //  console.log(result.value);
                    var $ = cheerio.load(result.value) // so it needs to be parse




                    let html = $('#lfMarket1 > li').html();
                    var results = [];
                    $('#lfMarket1 > li').each(function (i, elm) {

                        //                             //跑每一個 li 找出日期 與 價格
                        //                             //console.log($(elm).html());
                        //                             //var thisstring = $(elm).text();
                        var thisstring = $(elm).html();

                        //let regex = new RegExp("\\d{0,4}.{1}\\d{1,2}.{1}\\d{1,2}");
                        let regex = new RegExp("\\d{0,4}\\-\\d{1,2}\\-\\d{1,2}");
                        if (regex.test(thisstring)) {
                            let date = regex.exec(thisstring)[0];
                            //抓金額
                            let pricetext = $(elm).find('span').first().text();
                            let pricearr = pricetext.split(" ");
                            let currencyCode = pricearr[0];
                            let price = pricearr[1];
                            results.push({
                                date,
                                currencyCode,
                                price,
                                source: '虎航',
                                form: startStation,
                                to: backStation
                            });
                        }
                    })

                    var results2 = [];
                    $('#lfMarket2 > li').each(function (i, elm) {

                        //                             //跑每一個 li 找出日期 與 價格
                        //                             //console.log($(elm).html());
                        //                             //var thisstring = $(elm).text();
                        var thisstring = $(elm).html();

                        //let regex = new RegExp("\\d{0,4}.{1}\\d{1,2}.{1}\\d{1,2}");
                        let regex = new RegExp("\\d{0,4}\\-\\d{1,2}\\-\\d{1,2}");
                        if (regex.test(thisstring)) {
                            let date = regex.exec(thisstring)[0];
                            //抓金額
                            let pricetext = $(elm).find('span').first().text();
                            let pricearr = pricetext.split(" ");
                            let currencyCode = pricearr[0];
                            let price = pricearr[1];
                            results2.push({
                                date,
                                currencyCode,
                                price,
                                source: '虎航',
                                form: backStation,
                                to: startStation
                            });
                        }
                    })






                    console.log(results);
                    //         //  let out = path.join("./output/", `tirgerfly${Date.now()}.html`);
                    //         // console.log(out);

                    //         // fs.writeFileSync(out, html);

                    (async() => {
                        try {
                            //寫入資料
                            results.map(function (e) {
                                let data = e.date.split("-");
                                console.log(data);
                                (async() => {
                                    await firebaselib.write(`/tigter/${data[0]}/${data[1]}/${data[2]}/${startStation}${backStation}`, {
                                        results: e
                                    });
                                })();
                            });

                        } catch (e) {
                            console.log(e);
                        }

                        try {
                            //寫入資料
                            results2.map(function (e) {
                                let data = e.date.split("-");
                                //console.log(data);
                                (async() => {
                                    await firebaselib.write(`/tigter/${data[0]}/${data[1]}/${data[2]}/${backStation}${startStation}`, {
                                        results: e
                                    });
                                })();
                            });

                        } catch (e) {
                            console.log(e);
                        }
                    })();


                })
                .pause(2000)
        }




    }


}
