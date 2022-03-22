// const CryptoJS = require("crypto-js")


// var today = new Date();
// var NowDate = today.toLocaleString()

// var hash = CryptoJS.SHA256(NowDate);
// console.log(hash['words'][0])



const moment = require('moment'); 
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 
const date = moment().format('YYYY-MM-DD HH:mm:ss'); 
console.log(date);
