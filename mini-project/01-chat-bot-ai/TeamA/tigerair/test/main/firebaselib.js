"use strict";
const firebase = require('firebase');
const path = require('path');
//let serviceAccount = path.join(__dirname, '../../crawler-36244f1a8268.json');
let serviceAccount = path.join(__dirname, '../../Minithon01TeamA-d3cfa7a081fd.json');

console.log(__dirname);
firebase.initializeApp({
    serviceAccount,
    //databaseURL: 'https://crawler-48a40.firebaseio.com/'
    databaseURL: 'https://minithon01teama.firebaseio.com/'

});
const db = firebase.database();

function write(node, data) {
    //檢查連線，沒有連線時重新連線
    db.goOnline();
    return new Promise((resolve, reject) => {
        let ref = db.ref(node);
        ref.set(data, (error) => {
            if (error) {
                return resolve(error);
            }
            resolve();
        });
    });
}
exports.write = write;

function read(node) {
    //檢查連線，沒有連線時重新連線
    db.goOnline();
    return new Promise((resolve, reject) => {
        let ref = db.ref(node);
        ref.once('value', (snapshot) => {
            if (snapshot) {
                return resolve(snapshot.val());
            }
            resolve(null);
        });
    });
}
exports.read = read;

function finish() {
    //沒有中斷連線會咬住 process 請確保使用完畢後斷開連線
    db.goOffline();
}
exports.finish = finish;
