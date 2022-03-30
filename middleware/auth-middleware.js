const jwt = require('jsonwebtoken');
const signUp = require('../schemas/signUp');
const fs = require('fs');
const myKey = fs.readFileSync(__dirname + '/key.txt').toString();

module.exports = (req, res, next) => {
  const tokenValue = req.cookies.token;

  try {
    const userNickName = jwt.verify(tokenValue, myKey);
    const userId = userNickName.NickName;

    signUp
      .findOne({ NickName: userId })
      .exec()
      .then((user) => {
        res.locals.user = user;
        res.locals.token = tokenValue
        next();
      });
  } catch (error) {
    console.log('여기서 에러난거같음');
    res.status(401).send('로그인 후 사용하세요');
    return;
  }
};
