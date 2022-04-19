const express = require('express')
const jwt = require('jsonwebtoken')
const { nanoid } = require('nanoid')
const bodyparser = require("body-parser");
const login = express.Router()
const fs = require('fs')

const user = require('../tools/user')


jwtSecret = nanoid()
// console.log(jwtSecret)
login.use(express.json())
login.use(bodyparser.urlencoded({ extended: false }))

login.post('/newUser', (request, response) => {
    const userinfo = request.body
    const token = jwt.sign(
        { name: userinfo.username },
        jwtSecret,
        { algorithm: 'HS256', expiresIn: 3000 }
    )
    try {
        user.create({ ...userinfo, jwtSecret }).then(
            value => {
                console.log('插入成功', value)
                response.send(token)
            }
        )
    } catch (error) {
        if (error) throw error
    }
})


login.post('/login', (request, response) => {

    user.findOneAndUpdate({ name: request.body.name, password: request.body.password }, { $set: { jwtSecret } }, null, (error, result) => {
        if (error) throw response.send('用户不存在')
        try {
            if (request.body.name === result.name && request.body.password === result.password) {
                console.log(result);
                const token = jwt.sign(
                    { name: result.name },
                    jwtSecret,
                    { algorithm: 'HS256', expiresIn: 30000 }
                )
                response.set({
                    token
                })
                response.send(token)
            }
        } catch (error) {
            response.send('账号密码错误')
            // console.log(error);
        }
    })
})

login.post('/vip', (request, response) => {
    user.find({}).exec((error, docs) => {
        if (error) throw error
        docs.forEach((item) => {
            const { jwtSecret } = item
            try {
                jwt.verify(request.body.token, jwtSecret, { algorithm: 'HS256', expiresIn: 30000 }, (err, decoded) => {
                    if (err) throw error
                    if (decoded.name === item.name) {
                        response.send(decoded.name)
                    }
                })
            } catch (err) {
                console.log()
            }
        })
    })
})

module.exports = login