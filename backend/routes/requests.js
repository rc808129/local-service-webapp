import express from 'express';
import Request from '../models/Request.js';
import auth from '../middleware/auth.js';

const router = express.Router();


router.post('/', auth, async (req, res) => {
  try {
    const { workerId, skill, message } = req.body;

    // Basic validation
    if (!workerId || !skill) {
      return res.status(400).json({
        success: false,
        message: 'Worker ID and skill are required'
      });
    }

    // Check existing pending request
    const existingRequest = await Request.findOne({
      userId: req.user.id,
      workerId,
      skill,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        message: 'Request already sent and pending'
      });
    }

    // Create request
    const request = await Request.create({
      userId: req.user.id,
      workerId,
      skill,
      message: message ?? 'I need help with this service.',
      status: 'pending'
    });

    return res.status(201).json({
      success: true,
      message: 'Request sent successfully',
      data: request
    });

  } catch (error) {
    console.error('REQUEST CREATE ERROR:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error while sending request'
    });
  }
});

export default router;