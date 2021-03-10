const express = require('express')
const app = express()
const router = express.Router()

const db = require('../../config/db');
const alert = require('alert');

router.get('/', function(req, res) {
	const id = req.user;

	if(!id) {
		res.render('login.ejs');
	} else {
		db.query(`select * from user where userId = ?`, [id], (err1, userInfo) => {
			if(err1) throw err1;

			db.query(`select * from article`, (err2, rows) => {
				if(err2) throw err2;
	
				res.render('boardList.ejs', {'userInfo': userInfo, data: rows});
			});
		})
	}
})

// Go to Save
router.get('/save', function(req, res) {
	res.render('boardSave.ejs');
})

router.get('/save/:articleNo', function(req, res) {
	const articleNo = req.params.articleNo;

	db.query(`select * from article where articleNo = ?`, [articleNo], (err, rows) => {
		if(err) throw err;

		res.render('boardSave.ejs', {data: rows});
	})
})



// Detail
router.get('/detail/:articleNo', (req, res) => {
	const id = req.user;
	const articleNo = req.params.articleNo;

	db.query(`select EMAIL, userName, articleNo, articleTitle, articleContents, article.regDate, userId
		from article 
		join user on authorId = userId 
		where articleNo = ?`, [articleNo], (err, rows) => {
		if(err) throw err;
		
		res.render('boardDetail.ejs', {'id': id, data: rows});
	})	
})

// Insert
router.post('/save', (req, res) => {
	const articleTitle 		= req.body.articleTitle;
	const articleContents 	= req.body.articleContents;

	db.query('insert into article (articleTitle, articleContents, authorId) values (?, ?, ?)', [articleTitle, articleContents, req.user], (err, rows) => {
		if(err) throw err

		alert('정상적으로 저장되었습니다.');
		res.redirect('/');
	})
})

// Update
router.put('/save/:articleNo', (req, res) => {
	const articleTitle 		= req.body.articleTitle;
	const articleContents 	= req.body.articleContents;
	const articleNo 		= req.params.articleNo;

	db.query(`update article
		set articleTitle = ?, articleContents = ?
		where articleNo = ?`, [articleTitle, articleContents, articleNo], (err, rows) => {
		if(err) throw err

		alert('정상적으로 저장되었습니다.');
		res.redirect('/');
	})
})

// Delete
router.delete('/detail/:articleNo', (req, res) => {
	const articleNo = req.params.articleNo;

	db.query(`delete from article where articleNo = ?`, [articleNo], (err, rows) => {
		if(err) throw err

		alert('정상적으로 삭제되었습니다.');
		res.redirect('/');
	})	
})



module.exports = router;