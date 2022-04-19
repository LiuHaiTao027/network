const express = require('express')
const cors = require('cors')
const login = require('./Routes/login')
const ISP_Charge = require('./Routes/ISP_Charge')
const processjs = require('./Routes/processjs')
// const nodeoutlook = require('nodejs-nodemailer-outlook')
// const ejs = require('ejs')
// const jwt = require('jsonwebtoken')
const app = new express()

// 解决跨域问题
app.use(cors())

app.use(login)
app.use(ISP_Charge)
app.use(processjs)

app.set('view engine', 'ejs')

app.listen(8000, (err) => {
    if (!err) {
        console.log('server is listening');
    }
})
