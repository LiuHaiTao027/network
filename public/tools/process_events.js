

const {schema, mongoose} = require('./mongo_con')


const event_schema = new schema({
    classType:String,
    dutyDate: String,
    HandoverDate: String,
    people: String,
    Contact: {
        type: String,
        default:'无'
    },
    duration: {
        type: String,
        default: '无'
    },
    event: {
        type: String,
        default: '无'
    },
    influence: {
        type: String,
        default: '无'
    },
    reason: {
        type: String,
        default: '无'
    },
    solution: {
        type: String,
        default: '无'
    },
    stop: {
        type: String,
        default: '无'
    },
    odd: {
        type: String,
        default: '无'
    },
    del_id: {
        type: Number,
        default: 1
    },
});

const process_event = mongoose.model('process_event', event_schema)

module.exports = process_event



