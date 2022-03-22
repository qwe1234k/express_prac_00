const CryptoJS = require("crypto-js")


var today = new Date();
var NowDate = today.toLocaleString()

var hash = CryptoJS.SHA256(NowDate);
console.log(hash['words'][0])