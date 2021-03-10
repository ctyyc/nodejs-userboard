const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
const db = require('../../config/db');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, "../../public/register.html"));
    let msg;
    const errMsg = req.flash('error');
    if(errMsg) msg = errMsg;
    res.render('login.ejs', {'message': msg});
})

// passport.serialize
passport.serializeUser((user, done) => {
    console.log('passport session(serializeUser) : ', user.id)
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('passport session(deserializeUser) : ', id)
    done(null, id);
})

passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, email, password, done) => {
        db.query(`select * from user where EMAIL=?`, [email], (err, rows) => {
            if(err) return done(err);

            if(rows.length){
                if(password === rows[0].PW){
                    return done(null, {'email': email, 'id': rows[0].userId})
                } else {
                    return done(null, false, {'message': 'login info is not found...(PW)'});
                }
            } else {
                return done(null, false, {'message': 'login info is not found...(EMAIL)'});
            }
        })
    }
))

// router.post('/', passport.authenticate('local-register', {
//     successRedirect: '/main',
//     failureRedirect: '/join',
//     failureFlash: true
// }))

router.post('/', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
        if(err) res.status(500).json(err);
        if(!user) return res.status(401).json(info.message);

        req.logIn(user, (err) => {
            if(err) return next(err);

            return res.json(user);
        });
    })(req, res, next);
})

module.exports = router;