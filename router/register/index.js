const express = require('express');
const app = express();
const router = express.Router();
const db = require('../../config/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
    let msg;
    const errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('register.ejs', {'message': msg});
})

passport.serializeUser((user, done) => {
    console.log('passport session : ', user.id)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('passport session get : ', id)
    done(null, id);
})

passport.use('local-register', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        // console.log('passport callback!');
        const name = req.body.name;
        const confirm = req.body.confirm;
        
        db.query(`select * from user where EMAIL=?`, [email], (err, rows) => {
            if(err) return done(err);

            if(rows.length){
                return done(null, false, {message: 'Your email is already used'})
            } else {
                if(password !== confirm) {
                    return done(null, false, {message: 'Passwords do not match'}) 
                } else {
                    db.query(`insert into user (EMAIL, userName, PW) values (?, ?, ?)`, [email, name, password], (err, rows) => {
                        if(err) throw err;
                        return done(null, {'email': email, 'id': rows.insertId});
                    });
                }
            }
        });
    }
))

router.post('/', passport.authenticate('local-register', {
    successRedirect: '/board',
    failureRedirect: '/register',
    failureFlash: true
}))

module.exports = router;