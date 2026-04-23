



import React, { useState, useRef } from 'react';
import {
  Box,
  Typography,
  Container,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeIcon from '@mui/icons-material/Home';
import image1 from "../image/search-image.png"
import image2 from "../image/professional-image.png"
import image3 from "../image/secure-image.png"
const steps = [
  {
    number: 1,
    icon: <SearchIcon sx={{ fontSize: 48 }} />,
    title: "Search Your Need",
    // image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200",
    image: image1,
    description: "AC repair, plumber, electrician, home cleaning – whatever you need, just search. You will get the best results instantly based on your location.",
    highlight: "Instant Location-Based Results"
  },
  {
    number: 2,
    icon: <PeopleAltIcon sx={{ fontSize: 48 }} />,
    title: "Choose Nearby Professionals",
    image: image2,
    description: "Compare ratings, pricing, skills, distance, and reviews to choose the best worker. Everything is transparent and verified.",
    highlight: "Trusted & Verified Workers"
  },
  {
    number: 3,
    icon: <HomeIcon sx={{ fontSize: 48 }} />,
    title: "Book & Get Service at Home",
    image: image3,
    description: "Contact directly via call or message and schedule a time. The worker will come to your home. Pay only after the work is completed for full security.",
    highlight: "Pay Only After Satisfaction"
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const scrollRef = useRef(null);

  return (
    <Box sx={{ py: { xs: 12, md: 16 }, bgcolor: '#d9e2f9', color: 'white', position: 'relative' }}>
      <Container maxWidth="lg">
        {/* Heading */}
        <Box sx={{ textAlign: 'center', mb: 10 }}>
          <Typography variant="h2" fontWeight="800" sx={{ mb: 2, color: '#01050e', letterSpacing: -1 }}>
            How It Works
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: 720, mx: 'auto', color: '#030813', opacity: 0.85 }}>
            Get any home service completed quickly in just a few simple steps
          </Typography>
        </Box>

        {/* Horizontal Scroll Container */}
        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            overflowX: 'auto',
            gap: 4,
            pb: 6,
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            '&::-webkit-scrollbar': { display: 'none' },
          }}
        >
          {steps.map((step, index) => (
            <Paper
              key={step.number}
              elevation={0}
              onMouseEnter={() => setActiveStep(index)}
              sx={{
                minWidth: isMobile ? '90%' : 420,
                borderRadius: 5,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: activeStep === index ? 'scale(1.04)' : 'scale(1)',
                boxShadow: activeStep === index 
                  ? '0 30px 60px -15px rgba(0, 212, 255, 0.4)' 
                  : '0 10px 30px rgba(0,0,0,0.3)',
                scrollSnapAlign: 'center',
              }}
            >
              {/* Image */}
              <Box sx={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={step.image}
                  alt={step.title}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s',
                    transform: activeStep === index ? 'scale(1.12)' : 'scale(1)',
                  }}
                />
                {/* Gradient Overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(transparent, rgba(15,23,42,0.85))',
                  }}
                />
              </Box>

              {/* Content */}
              <Box sx={{ p: 5 }}>
                {/* Number + Icon */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: '#00d4ff',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      boxShadow: '0 0 25px rgba(0,212,255,0.6)',
                    }}
                  >
                    {step.number}
                  </Box>
                  {step.icon}
                </Box>

                <Typography variant="h4" fontWeight="bold" gutterBottom>
                  {step.title}
                </Typography>

                <Typography variant="body1" sx={{ opacity: 0.9, lineHeight: 1.75, mb: 3 }}>
                  {step.description}
                </Typography>

                <Typography
                  variant="subtitle2"
                  sx={{
                    color: '#00d4ff',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                  }}
                >
                  {step.highlight}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>

        {/* Trust Footer */}
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <Typography variant="h6" sx={{ color: '#4ade80', fontWeight: 'bold' }}>
            ✓ 100% Verified Workers &nbsp;&nbsp; • &nbsp;&nbsp; ✓ Pay After Work Done &nbsp;&nbsp; • &nbsp;&nbsp; ✓ Service at Your Doorstep
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;