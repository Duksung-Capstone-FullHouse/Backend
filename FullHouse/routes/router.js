
const router = require('.')
const db = require('../db/config')
const bcrypt = require('bcrypt')
const saltRounds = 10

router.get('/a', (req,res,next) => {
    console.log("success router");
})

router.get('/testa', function(req,res) {
    db.query("select * from user where email = 'tlsalstj01@duksung.ac.kr'", function(err, rows,fields) {
        if(err)
            console.log(err);
        else {
            res.send(rows);
        }
    });
})

router.post('auth/signup', (req,res,next) => { //회원가입
    const param  = [req.body.password,req.body.email, req.body.phone, req.body.gender,req.body.name, req.body.birth, req.body.nickname]

    bcrypt.hash(param[1], saltRounds, (error, hash) => {
        param[1] = hash
        db.query("INSERT INTO user('password', 'email', 'phone', 'gender', 'birth', 'nickname') VALUES (?,?,?,?,?,?,?)", param, (err, row) => {
            if(err)
                console.log(err);
        });
    })
    res.end()
})

router.post('auth/login', (req,res,next) => { //로그인
    param = [req.body.email, req.body.password]
    db.query("SELECT * FROM user WHERE email=?", param[0], (err,row) => {
        if(err) console.log(err)

        if(row.length > 0) { //email - server 검증
            bcrypt.compare(param[1], row[0].password, (error, result) => {
                if(result) {
                    console.log("login_certify success");
                } else {
                    console.log("login_certify fail");
                }
            })
        } else {
            console.log('ID is not in DB');
        }
    })
    res.end()
})

router.get('auth/login/check', (req,res) => { //로그인 세션 처리 
    if(req.session.loginData) {
        res.send({loggedIn: true, loginData: req.session.loginData})
    } else {
        res.send({loggedIn : false})
    }
})

router.post('auth/logout', (req,res) => { //로그아웃 세션 처리 
    console.log('LogOut')
        req.session.destroy(err => {
            if(err) console.log(err)
        })
        res.end()
})

module.exports = router;



