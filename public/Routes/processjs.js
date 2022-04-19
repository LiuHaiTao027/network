const express = require('express')
const uploadFile = require('../js/uploadFile')
const bodyparser = require("body-parser");
const process_event = require('../tools/process_events');
const user = require('../tools/user')
const fs = require('fs')
// 创建二级路由
const processjs = express.Router()

// 引入解析请求体数据工具
processjs.use(express.json())
processjs.use(bodyparser.urlencoded({ extended: false }))

// 引入全局路由中间件
// text.use(uploadFile('./File'))
// 文件上传路由
processjs.post(('/text'),uploadFile('./File'), (request, response) => {})
processjs.get(('/Findtext'),(request, response) => {
    const {name} = request.body
    response.send(fs.readFileSync(`./File/${name}`))
})

processjs.get('/event', (request, response) => {
    process_event.find({}, { del_ID: 0 }).sort({ _id: -1 }).skip().exec((err, data) => {
        if (err) throw err
        response.send(data)
    })
})

processjs.post('/newEvent', (request, response) => {
    const pre_event = request.body
    try {
        process_event.create({ ...pre_event }).then(
            value => {
                console.log('插入成功')
            }
        )
    } catch (error) {
        if (error) throw error
    }
})

processjs.post('/user', (request, response) => {
    user.find({}).exec((err, data) => {
        if (err) throw err
        response.send(data)
    })
})

module.exports = processjs