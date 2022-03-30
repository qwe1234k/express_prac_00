const express = require('express');
const Posters = require('../schemas/poster');
const router = express.Router();

// 전체페이지 데이터 내려주기
router.get('/total', async (req, res) => {
  const total_ls = await Posters.find({});
  const sorted_total_ls = total_ls.sort((a, b) =>
    a.NowDate > b.NowDate ? -1 : 1
  );
  res.json(sorted_total_ls);
});

// 상세페이지 내려주기
router.get('/detail', async (req, res) => {
  const path = require('path');
  res.sendFile(path.join(__dirname + '/../public/detail.html'));
});

// 상세페이지 데이터 내려주기
router.get('/detail/detailData', async (req, res) => {
  const PostId = req.query.PostId;
  const detail_info = await Posters.find({ PostId });
  res.json(detail_info);
});

module.exports = router;
