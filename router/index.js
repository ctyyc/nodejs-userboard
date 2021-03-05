const express = require('express');
const app = express();
const router = express.Router();

const main = require('./main/main');
const register = require('./register/index');
const login = require('./login/index');
const logout = require('./logout/index');
const board = require('./board/index');

router.get('/', function(req,res) {
	const id = req.user;

	if(!req.user){
        res.render('login.ejs');
    } else {
        res.render('main.ejs', {'id' : id});
    }
});

router.use('/main', main);
router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/board', board);

module.exports = router;