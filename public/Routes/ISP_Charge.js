const express = require('express')

const ISP_Charge = express.Router()

const bodyparser = require("body-parser");

// 引入数据库原型对象
const ISP_Event = require('../tools/ISP_Charge')


ISP_Charge.use(express.json())

ISP_Charge.use(bodyparser.urlencoded({ extended: false }))



ISP_Charge.post(('/ISP_Charge'), (request, response) => {
    ISP_Event.find({}).sort({ _id: -1 }).exec((err, data) => {
        if (err) throw err
        // console.log(data)
        response.send(data)
    })
})
ISP_Charge.post(('/updateISP_Charge'), (request, response) => {
    const newDate = request.body
    newDate.forEach(element => {
        ISP_Event.updateOne({ _id: element._id }, { $set: { ...element } }, (err) => {
            if (!err) {
                response.end('OK')
            }
        })
    });
})
ISP_Charge.post(('/NewISPCharge'), (request, response) => {
    const ISPChargeInfo = request.body
    console.log(ISPChargeInfo);
    try {
        ISP_Event.create({ ...ISPChargeInfo }).then(
            value => {
                response.send('OK')
                console.log('插入成功',value)
            }
        )
    } catch (error) {
        if (error) throw error
    }
})

module.exports = ISP_Charge

