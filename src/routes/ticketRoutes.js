const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/add', ticketController.createTicket);
router.get('/all', ticketController.getTickets);
router.put('/assign', ticketController.assignAgentToTicket);

module.exports = router;
