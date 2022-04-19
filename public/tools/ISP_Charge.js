
const {schema, mongoose} = require('./mongo_con')


const ISP_Charge = new schema({
    year:String,
    Operator: String,
    Business_types: Array,
    bandwidth: String,
    month: String,
    money: String,
    paragraph_type: String,
    Payment_method: String,
    invoice_dueTime: String,
    invoice_arrived: String,
    PR: String,
    PO: String,
    PA: String,
    state: String,
    note: String,
});

const ISP_Event = mongoose.model('ISP_Event', ISP_Charge)

module.exports = ISP_Event



