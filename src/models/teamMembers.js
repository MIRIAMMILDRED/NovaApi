const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    companyId: {
        type: String,
        ref: 'CompanyModel', 
        required: true
    }
});

module.exports = mongoose.model('TeamMembers', teamMemberSchema);
