const express = require("express");
const Posters = require("../schemas/poster")
const router = express.Router();
const CryptoJS = require("crypto-js")


// 게시글 작성페이지 내려주기
router.get("/posting", (req, res) => {
    const path = require("path")

    res.sendFile(path.join(__dirname + '/../public/posting.html'))
})

// 클라에서입력한 정보 >> DB로 올리기
router.post("/posting", async (req, res) => {

    const {Name, Pw, Title, Content} = req.body

    const now = new Date(); // 현재 시간
    const utcNow = now.getTime() + (now.getTimezoneOffset() * 60 * 1000); // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const NowDate = new Date(utcNow + koreaTimeDiff); // utc로 변환된 값을 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함



    const PostId = CryptoJS.SHA256(NowDate)['words'][0];

    const existPostId = await Posters.find({ PostId });
    
    // 같은 ID가 DB에 있다면  
    if (existPostId.length) {
    return res.json({ msg: "예상치 못한 오류입니다." })
      }

    res.json({ msg: "게시글이 등록이 완료되었습니다!" })
    await Posters.create({ Title, Content, PostId, NowDate, Name, Pw });
})

// 게시글 수정페이지html 내려주기
router.get("/edit", (req, res) => {
    const path = require("path")

    res.sendFile(path.join(__dirname + '/../public/edit.html'))
})

// 게시글 수정페이지 수정전 원본데이터 내려주기
router.get("/edit/Data", async (req, res) => {
    const PostId = req.query.PostId;
    const detail_info = await Posters.find({ PostId });

    res.json(detail_info);
});

// 게시글 삭제하기
router.post("/delete", async (req, res) => {
    const { PostId, Pw } = req.body

    // PostId와 Pw를 기준으로 Data 받아오기
    const existPostId_Pw = await Posters.find({ PostId, Pw });

    // PostId와 Pw가 일치하는 Data가 없을경우
    if (existPostId_Pw.length === 0) {
        return res.json({msg: "비밀번호가 일치 하지 않습니다."})
    }
    
    res.json({msg: "게시글 삭제가 완료되었습니다."})
    await Posters.deleteOne({PostId})
    
})

// 게시글 수정하기
router.post("/edit", async (req, res) => {
    const { PostId, Pw, Title, Content } = req.body

    var today = new Date();
    var NowDate = today.toLocaleString()
    // PostId와 Pw를 기준으로 Data 받아오기
    const existPostId_Pw = await Posters.find({ PostId, Pw });

    // PostId와 Pw가 일치하는 Data가 없을경우
    if (existPostId_Pw.length === 0) {
        return res.json({msg: "비밀번호가 일치 하지 않습니다."})
    }

    res.json({msg: "게시글 수정이 완료되었습니다."})
    await Posters.updateOne({ PostId }, { $set: { Title, Content, NowDate} } )
    
})

module.exports = router;
