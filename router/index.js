const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');

const main = require('./main/main');
const email = require('./email/email');
const register = require('./register/index');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../public/main.html"));
});

router.use('/main', main);
router.use('/email', email);
router.use('/register', register);

module.exports = router;