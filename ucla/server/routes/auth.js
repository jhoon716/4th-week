const express = require('express')
const crypto = require('crypto')
const multer = require('multer')
const router = express.Router()
const User = require("../models/user")

let jwt = require("jsonwebtoken")
let secretObj = require("../config/jwt")


// Sign up page
router.get('/signup', function(req, res, next) {
    res.render('user/signup')
})

const storage = multer.diskStorage({
    destination: "./profiles/",
    filename: function(req, file, cb) {
        return cb(null, file.originalname)
    }
})

// Sign up
router.post('/signup', multer({storage: storage}).single('profile'), function(req, res, next) {
    let body = req.body
    console.log(body)
    
    let inputPassword = body.password
    let salt = Math.round((new Date().valueOf() * Math.random())) + ""
    let hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex")
    
    const user   = new User()
    user.name    = body.userName
    user.id      = body.userId
    user.passwd  = hashPassword
    user.salt    = salt
    user.profile = req.file.filename
    user.status  = body.status
    user.save((err) => {
        if (err) {
            // Sign up failed
            console.error(err)
            res.json({result: 0})
            return
        }
        res.json({ result: 'OK' })
        // res.redirect('/user/login')
    })
})

// User main page
router.get('/', function(req, res, next) {
    if (req.cookies) {
        console.log(req.cookies)
    }

    res.send('환영합니다~')
})

// Log in page
router.get('/login', function(req, res, next) {
    let cookies = req.cookies
    
    res.render('user/login', {
        cookies: cookies
    })
})

// Log in
router.post('/login', function(req, res, next) {
    const body = req.body
    User.findOne({id: body.id}, (err, user) => {
        if (err) {
            console.log(err)
            return res.redirect('/user/login')
        }
        if (!user) {
            console.log(`No user with id "${body.id}"`)
            return res.redirect('/user/login')
        }

        const dbPassword = user.passwd
        const inputPassword = body.password        
        const salt = user.salt
        const hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex")

        if (dbPassword === hashPassword) {
            console.log("Correct password")
            // create token
            let token = jwt.sign({
                id: body.id
            },
            secretObj.secret,
            {
                expiresIn: '1d'
            })    

            // Send cookie as token
            res.cookie('user', token)
            res.status(200).json({
                result: 'OK',
                token
            });
        } else {
            console.log("Wrong password")
            res.status(400).json({error: 'invalid user'})
        }
        // res.redirect('/user/login')
    })
})

router.get('/logout', function(req, res, next) {
    // req.session.destroy()
    res.clearCookie('user')

    res.redirect('/user/login')
})

module.exports = router