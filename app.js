const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const router = require('./router/index');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const methodOverride = require('method-override');

app.use(methodOverride('_method'));

// 해당 디렉토리의 모든 static 파일을 url로 접근할 수 있음
app.use(express.static('public'));
// json 타입 or encoding 된 데이터를 받을 때 사용하겠다. 라는 의미
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// view engine 설정
app.set('view engine', 'ejs');

// session & passport 설정
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Router
app.use(router);



app.listen('3000', () => {
  console.log(`Example app listening at http://localhost:3000`)
})