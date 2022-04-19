const mongoose = require('mongoose');

// 连接数据库
mongoose.connect('mongodb://localhost/mongoose_NMS', function (err) {
    if (!err){
        console.log('数据库连接成功')
    }
})

const schema = mongoose.Schema

module.exports = {schema, mongoose}