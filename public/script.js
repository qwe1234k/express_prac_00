// const CryptoJS = require("crypto-js")


// var today = new Date();
// var NowDate = today.toLocaleString()

// var hash = CryptoJS.SHA256(NowDate);
// console.log(hash['words'][0])



// const moment = require('moment'); 
// require('moment-timezone'); 
// moment.tz.setDefault("Asia/Seoul"); 
// const date = moment().format('YYYY-MM-DD HH:mm:ss'); 
// console.log(date);


// 0. promise의 status: pending(보류상태), fulfilled --> resolve작동, reject --> reject작동

// 1. Producer
const promise = new Promise((resolve, reject) => {
    console.log('doing something'); //executor라는 cb함수에 인자로 들어가서 promise객체를 호출시 바로 실행됨
    setTimeout(()=>{
        resolve('태성'); // 정상적으로 수행이 되면 '태성'이라는 값을 줄꺼야
        reject(new Error('no network')); // 비정상적으로 수행이 되면 Error라는 클래스는 js에서 제공하는 object이고 이를 이용해서 'no network'라는 값을 줄꺼야
    }, 1000);
});

// 2. Consumers: then, catch, finally
promise
.then((value) => {
    console.log(value); // 값이 정상적으로 수행이 된다면 then 값을 받아올꺼야(value에는 resolve cb함수에서 전달된 '태성'이 틀어옴)
})
.catch(error => {
    console.log(error);
})
.finally(()=>{
    console.log('마지막')
})


