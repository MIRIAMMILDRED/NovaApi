const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({

    ticketId: {
        type: String,
        required: true,
        unique: true // Ensures each ticket has a unique ticketId
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ['Open', 'Closed', 'Resolved', 'In progress','On hold'],
        default: 'Open'
    },
    assignedAgent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TeamMember', // Reference to the TeamMember model
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Ticket', ticketSchema);
