import firebase = require('./index');

(async () => {
    try {
        //寫入資料
        await firebase.write('/hello', { time: Date.now() });
        //讀出資料
        let result = await firebase.read('/hello');
        //使用完畢呼叫
        firebase.finish();

        console.log(result);
    } catch (e) {
        console.log(e);
    }
})();