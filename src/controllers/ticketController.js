const Ticket = require('../models/ticketsModel');
const TeamMember = require('../models/teamMembers'); 

exports.createTicket = async (req, res) => {
    try {
        const { ticketId, subject, description, requester, type, state, assignedAgent } = req.body;

        const newTicket = new Ticket({ ticketId, subject, requester, type, state, assignedAgent });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getTickets = async (req, res) => {
    try {
      console.log('Fetching tickets from the database...');
      const tickets = await Ticket.find();
  
      // Map tickets to format them for frontend display
      const formattedTickets = await Promise.all(tickets.map(async (ticket) => {
        let assignedAgentName = 'Unassigned';
  
        if (ticket.assignedAgent) {
          const assignedAgent = await TeamMember.findById(ticket.assignedAgent);
          assignedAgentName = assignedAgent ? assignedAgent.name : 'Unassigned';
        }
  
        return {
          _id: ticket._id,
          ticketId: ticket.ticketId,
          subject: ticket.subject,
          type: ticket.type,
          requester: ticket.requester,
          state: ticket.state,
          createdAt: ticket.createdAt,
          assignedAgent: assignedAgentName
        };
      }));
  
      console.log('Tickets fetched:', formattedTickets);
      res.status(200).json(formattedTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error.message, error.stack);
      res.status(500).json({ error: 'Failed to fetch tickets' });
    }
  };


exports.assignAgentToTicket = async (req, res) => {
    try {
        const { ticketId, agentId } = req.body;

        if (!ticketId || !agentId) {
            return res.status(400).json({ error: 'Both ticketId and agentId are required' });
        }

        // Check if the agent exists
        const agent = await TeamMember.findById(agentId);
        if (!agent) {
            return res.status(404).json({ error: 'Agent not found' });
        }

        // Update the ticket with the assignedAgent field
        const ticket = await Ticket.findOneAndUpdate(
            { ticketId },
            { assignedAgent: agentId },
            { new: true }
        );

        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error assigning agent to ticket:', error);
        res.status(500).json({ error: 'Failed to assign agent to ticket' });
    }
};
