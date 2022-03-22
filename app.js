const express = require("express");
const app = express();
const port = 8080;
const router = express.Router();

const connect = require("./schemas/index");
connect();

const path = require("path")
app.use('/node_modules', express.static(path.join(__dirname + '/node_modules')))
const lookupRouter = require("./routes/lookup");
const postingRouter = require("./routes/posting");

// cors 해결하기
const cors = require("cors");
app.use(cors());

// 미들웨어 로그 남기기 : 요청이 들어온 URL 출력하기
const requestMiddleware = (req, res, next) => {
    console.log("Request URL:", req.originalUrl, " - ", new Date());
    next();
};
app.use(express.json()); //body로 들어오는 data를 json으로 파싱해주는 미들웨어
app.use(requestMiddleware);

// CSS파일 제공하기
app.use(express.static(__dirname +'/public'));

// api라우팅 하기
app.use("/api", [lookupRouter, postingRouter]);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
});

app.listen(port, () => {
    console.log("서버가 켜졌어요!");
});