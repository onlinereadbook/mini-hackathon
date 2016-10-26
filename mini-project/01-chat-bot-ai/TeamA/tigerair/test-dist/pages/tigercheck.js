'use strict';

module.export = function (browser) {
    return {
        gopage: function gopage() {
            browser.url('https://booking.tigerair.com/Search.aspx?culture=zh-TW');
            return browser;
        }
    };
};
//# sourceMappingURL=tigercheck.js.map