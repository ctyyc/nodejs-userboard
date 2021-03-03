const express = require('express');
const app = express();
const router = express.Router();
const db = require('../../config/db');

router.post('/form', (req, res) => {
    //res.send("<h1>welcome " + req.body.email + "</h1>");
    res.render('email.ejs', {'email' : req.body.email});
})
  
router.post('/ajax', (req, res) => {
    const email = req.body.email;
    let responseData = {};
    // + check validation => select db

    const query = db.query(`select * from user where email=?`, [email], (err, rows) =>{
        if(err) throw err;

        if(rows[0]){
            responseData.result = "ok";
            responseData.name = rows[0].userName;
        } else {
            responseData.result = "none";
            responseData.name = "";
        }

        res.json(responseData);
    })
})

module.exports = router;