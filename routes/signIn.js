const express = require('express');
const signUp = require('../schemas/signUp');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth-middleware');
const res = require('express/lib/response');
const { Route } = require('express');
const fs = require('fs');
const myKey = fs.readFileSync(__dirname + '/../middleware/key.txt').toString();

// 로그인 페이지 내려주기
router.get('/signIn', async (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname + '/../public/signIn.html'));
});

// 로그인 유효성 검사 및 토큰 발급
router.post(
  '/signInCheck',
  // notEmpty: 비어있으면 컷!, trim: 공백없애기, isLength: 문자길이지정, isAlphanumeric: 숫자, 문자 있는지 체크
  body('NickName').notEmpty().trim().isLength({ min: 3 }).isAlphanumeric(),

  // 비밀번호는 `최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패`로 만들기
  body('Pw')
    .notEmpty()
    .trim()
    .isLength({ min: 4 })
    .custom((value, { req }) => {
      if (value.includes(req.body.NickName)) {
        throw new Error('비밀번호에 닉네임이 포함되어 있습니다.');
      }
      return true;
    }),
  async (req, res) => {
    // 양식에 안맞을때 에러 핸들링 코드

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // 클라가 입력한 정보로 DB조회
    const { NickName, Pw } = req.body;
    const user = await signUp.findOne({ NickName, Pw });

    // 가입안된 닉네임일때 혹은 비밀번호가 틀릴때
    if (!user) {
      res.status(400).send({
        errorMessage: '닉네임 혹은 패스워드를 다시 확인해주세요.',
      });
      return;
    }

    // 문제없으면 토큰 발급
    const findNickName = await signUp.find({ NickName });
    const name = findNickName[0]['NickName'];

    const payload = { NickName: name };
    const secret = myKey;
    const options = {
      issuer: '머머리개발자', // 발행자
      expiresIn: '2h', // 날짜: $$d, 시간: $$h, 분: $$m, 그냥 숫자만 넣으면 ms단위
    };

    const token = jwt.sign(payload, secret, options);
    res.cookie('token', token).send({ msg: '로그인이 완료 되었습니다.' });
  }
);

// 사용자 인증 미들웨어 사용예시 //
router.post('/authUser', authMiddleware, (async) => {
  const { user } = res.locals;
  // NickName: ##, Pw: ##, _id: ##
  res.send(user);
});

module.exports = router;
