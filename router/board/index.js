const express = require('express')
const app = express()
const router = express.Router()

const db = require('../../config/db');

router.get('/list', function(req, res) {
	const id = req.user;
	if(!id) res.render('login.ejs');
	res.render('movie.ejs');
})

// - 게시판 목록
// - 게시글 상세조회
// - 게시글 등록수정

// 1. /movie , GET
router.get('/', function(req, res) {
	var responseData = {};

	db.query('select title from movie', function(err, rows) {
		if(err) throw err;
		if(rows.length) {
			responseData.result = 1;
			responseData.data = rows;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})

// 2. /movie , POST
router.post('/', function(req,res){
	var title = req.body.title;
	var type = req.body.type;
	var grade = req.body.grade;
	var actor = req.body.actor;

	var sql = {title,type,grade,actor};
	db.query('insert into movie set ?', sql, function(err,rows) {
		if(err) throw err
		return res.json({'result' : 1});
	})

})

// 3. /movie/:title , GET
router.get('/:title', function(req,res) {
	var title = req.params.title;

	var responseData = {};

	db.query('select * from movie where title =?', [title], function(err, rows) {
		if(err) throw err;
		if(rows[0]) {
			responseData.result = 1;
			responseData.data = rows;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})

// 4. /movie/:title , DELETE
router.delete('/:title', function(req,res) {
	var title = req.params.title;

	var responseData = {};

	db.query('delete from movie where title =?', [title], function(err, rows) {
		if(err) throw err;

		if(rows.affectedRows > 0) {
			responseData.result = 1;
			responseData.data = title;
		} else {
			responseData.result = 0;
		}
		res.json(responseData)
	})	
})



module.exports = router;