const express = require('express');
const app = express();
const router = express.Router();

const register = require('./register/index');
const login = require('./login/index');
const logout = require('./logout/index');
const board = require('./board/index');

router.get('/', function(req,res) {
	if(!req.user){
        res.redirect('/login');
    } else {
        res.redirect('/board');
    }
});

router.use('/register', register);
router.use('/login', login);
router.use('/logout', logout);
router.use('/board', board);

module.exports = router;