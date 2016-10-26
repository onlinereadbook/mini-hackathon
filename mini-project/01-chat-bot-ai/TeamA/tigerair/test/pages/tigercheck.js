module.export = (browser) => {
    return {
        gopage: () => {
            browser
                .url('https://booking.tigerair.com/Search.aspx?culture=zh-TW')
            return browser;
        }
    }
}