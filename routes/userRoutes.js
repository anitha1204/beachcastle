const express = require('express');
const { postUserDatas, getUserDatas } = require('../controllers/userController');
const router = express.Router();

// Define POST route for /api/postdata
router.post('/postdata', postUserDatas);
router.get('/getdata/:email', getUserDatas);

module.exports = router;

