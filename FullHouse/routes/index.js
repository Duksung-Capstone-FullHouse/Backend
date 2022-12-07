const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var express = require('express');
var router = express.Router();
var app = express();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/get/demo', function(req,res) {
  res.status(200).json({
    "message" : "call get api demo"
  });
});

app.use(express.json()) //회원가입 - json 형태
app.use(bodyParser.urlencoded({ extended: true })) //회원가입 - hash 암호화

app.use(cookieParser()); //쿠키 파서
app.use(cors({
  origin: true,
  credentials: true
}))

app.use(
  session({
    key: "loginData",
    secret: "testSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    }
  })
)


module.exports = router;
