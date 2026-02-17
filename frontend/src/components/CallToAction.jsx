import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleJoinClick = () => {
    // Worker registration page पर ले जाए (अभी placeholder)
    navigate('/worker-signup');  // तुम्हारा worker signup route डाल दो
    // या अगर अभी नहीं बना है तो: window.open('https://your-worker-form-link.com', '_blank');
  };

  return (
    <Box
      sx={{
        py: { xs: 10, md: 14 },
        background: 'linear-gradient(135deg, #1976d2 0%, #0d47a1 100%)',
        color: 'white',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* बैकग्राउंड पैटर्न/ओवरले (ऑप्शनल – प्रीमियम लुक) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md">
        <WorkIcon sx={{ fontSize: { xs: 60, md: 80 }, mb: 3, opacity: 0.9 }} />

        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 2,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          Become a Service Provider Today!
        </Typography>

        <Typography
          variant={isMobile ? 'h6' : 'h5'}
          sx={{
            mb: 4,
            maxWidth: 700,
            mx: 'auto',
            fontWeight: 500,
            opacity: 0.95,
          }}
        >
          Join thousands of skilled workers and start earning extra income on your own schedule.
        </Typography>

        {/* मुख्य बटन */}
        <Button
          variant="contained"
          size="large"
          onClick={handleJoinClick}
          sx={{
            py: 2,
            px: { xs: 6, md: 10 },
            fontSize: '1.3rem',
            fontWeight: 'bold',
            borderRadius: 50,
            background: 'linear-gradient(90deg, #ff9800, #f57c00)',
            boxShadow: '0 8px 20px rgba(245,124,0,0.4)',
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 12px 30px rgba(245,124,0,0.6)',
              background: 'linear-gradient(90deg, #ffb300, #ff8f00)',
            },
          }}
        >
          Join as Worker & Earn Now
        </Button>

        {/* छोटे फायदे (ट्रस्ट बढ़ाने के लिए) */}
        <Box
          sx={{
            mt: 6,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: { xs: 3, md: 6 },
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              ₹20,000+
            </Typography>
            <Typography variant="body2">Monthly Earnings</Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              10,000+
            </Typography>
            <Typography variant="body2">Happy Workers</Typography>
          </Box>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" fontWeight="bold">
              Flexible Hours
            </Typography>
            <Typography variant="body2">Work on your time</Typography>
          </Box>
        </Box>

        {/* छोटा सेकंडरी टेक्स्ट */}
        <Typography variant="body2" sx={{ mt: 5, opacity: 0.85 }}>
          No registration fees • Quick approval • Get paid instantly after every job
        </Typography>
      </Container>
    </Box>
  );
};

export default CallToAction;