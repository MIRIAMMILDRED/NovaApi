const TeamMember = require('../models/teamMembers'); 

exports.addTeamMember = async (req, res) => {
    try {
        const { name, email, role, companyId } = req.body;

        const newTeamMember = new TeamMember({ name, email, role, companyId });
        await newTeamMember.save();
        res.status(201).json(newTeamMember);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTeamMembers = async (req, res) => {
    try {
        const teamMembers = await TeamMember.find().exec();

        res.status(200).json(teamMembers);
    } catch (error) {
        console.error('Error fetching team members:', error);
        res.status(500).json({ error: 'Failed to fetch team members' });
    }
};
