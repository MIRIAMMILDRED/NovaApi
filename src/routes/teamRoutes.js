
const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController'); 


router.post('/add', teamController.addTeamMember);
router.get('/query', teamController.getTeamMembers);

module.exports = router;
