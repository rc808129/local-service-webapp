import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Button,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router-dom';

// डमी डेटा (बाद में API से आएगा)
const dummyWorkers = [
  {
    id: 1,
    name: 'Rahul Sharma',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    skills: ['AC Repair', 'Fan Repair', 'Electrical'],
    rating: 4.8,
    distance: 2.5,
    pricePerHour: 250,
  },
  {
    id: 2,
    name: 'Vikram Patil',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    skills: ['Plumbing', 'Bathroom Fitting'],
    rating: 4.6,
    distance: 1.8,
    pricePerHour: 180,
  },
  {
    id: 3,
    name: 'Priya Deshmukh',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    skills: ['Home Cleaning', 'Deep Cleaning'],
    rating: 4.9,
    distance: 3.2,
    pricePerHour: 150,
  },
  {
    id: 4,
    name: 'Sanjay More',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    skills: ['Carpenter', 'Furniture Repair'],
    rating: 4.7,
    distance: 4.1,
    pricePerHour: 220,
  },
  {
    id: 5,
    name: 'Anjali Kulkarni',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    skills: ['Beauty & Salon', 'Massage'],
    rating: 4.5,
    distance: 2.9,
    pricePerHour: 300,
  },
];

const NearbyWorkers = () => {
  const [location, setLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // लोकेशन लेने का फंक्शन
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLoading(false);
          // यहाँ API कॉल कर सकते हो: axios.get(`/api/search?lat=${lat}&lng=${lng}`)
        },
        (error) => {
          setLocationError('Unable to get location. Please allow location access.');
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser.');
      setLoading(false);
    }
  }, []);

  // कार्ड क्लिक पर प्रोफाइल पेज पर जाना (फ्यूचर में)
  const handleViewProfile = (workerId) => {
    navigate(`/profile/${workerId}`);
    // या alert(`Viewing profile of worker ${workerId}`);
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 6 }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Getting your location...
        </Typography>
      </Box>
    );
  }

  if (locationError) {
    return (
      <Box sx={{ py: 6, px: 2 }}>
        <Alert severity="warning" sx={{ maxWidth: 600, mx: 'auto' }}>
          {locationError}
          <br />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Please enable location access in your browser settings to see workers near you.
          </Typography>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Workers Near You
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <LocationOnIcon fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
          Pimpri-Chinchwad (Your Area)
        </Typography>
      </Box>

      {/* Horizontal Scrollable Section */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 3,
          px: 2,
          pb: 2,
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { height: 8 },
          '&::-webkit-scrollbar-thumb': { bgcolor: 'grey.400', borderRadius: 4 },
        }}
      >
        {dummyWorkers.map((worker) => (
          <Card
            key={worker.id}
            sx={{
              minWidth: 280,
              maxWidth: 320,
              borderRadius: 3,
              boxShadow: 3,
              transition: 'transform 0.3s',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 },
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={worker.photo}
              alt={worker.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {worker.name}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 1 }}>
                {worker.skills.slice(0, 3).map((skill) => (
                  <Chip key={skill} label={skill} size="small" color="primary" variant="outlined" />
                ))}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={worker.rating} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                  {worker.rating} ★
                </Typography>
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} />
                {worker.distance} km away
              </Typography>

              <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                ₹{worker.pricePerHour}/hr
              </Typography>

              <Button
                variant="contained"
                fullWidth
                onClick={() => handleViewProfile(worker.id)}
                sx={{ borderRadius: 50 }}
              >
                View Profile
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Scroll Arrows (ऑप्शनल – मोबाइल पर swipe से काम चलेगा) */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
        <IconButton
          onClick={() => {
            document.querySelector('.scroll-container')?.scrollBy({ left: -300, behavior: 'smooth' });
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            document.querySelector('.scroll-container')?.scrollBy({ left: 300, behavior: 'smooth' });
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default NearbyWorkers;