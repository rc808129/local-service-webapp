import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, Chip, Rating,  CircularProgress, Alert,Fade, Divider
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import TransgenderIcon from '@mui/icons-material/Transgender';
const API_URL = import.meta.env.VITE_API_URL;

const SearchResults = () => {

  const { skill } = useParams();
  const decodedSkill = decodeURIComponent(skill);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  const fetchWorkers = async () => {
    try {
      const token = localStorage.getItem("token");

      // ←←←← Yeh Important Check Add Karo
      if (!token) {
        console.error("No token found in localStorage!");
        setError("Please login first");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/profiles/search`,
        {
          params: { skill: decodedSkill },
          headers: {
            Authorization: `Bearer ${token}`   // yeh line sahi honi chahiye
          }
        }
      );

      setWorkers(res.data.workers || []);
      setError(null);
    } catch (err) {
      console.error("Search API Error:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        setError("Session expired. Please login again.");
        // Optional: localStorage.removeItem("token");
        // navigate("/login");
      } else {
        setError("Something went wrong while searching.");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchWorkers();
}, [decodedSkill]);

  
if (loading) {
    return (
      <Box sx={{ textAlign: 'center', py: 12 }}>
        <CircularProgress size={60} color="primary" />
        <Typography variant="h6" sx={{ mt: 3, color: 'text.secondary' }}>
          Finding best workers for "{decodedSkill}"...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

 return (
    <Box sx={{ py: 8, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 6,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Workers for "{decodedSkill}" Near You
        </Typography>

        {workers.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h5" color="text.secondary" gutterBottom>
              No workers found for "{decodedSkill}"
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try a different skill or check your location settings.
            </Typography>
          </Box>
        ) : (
          <Fade in timeout={600}>
            <Grid container spacing={4}>
              {workers.map((worker) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={worker._id}>
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                      transition: 'all 0.4s ease',
                      '&:hover': {
                        transform: 'translateY(-12px)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                      },
                      cursor: 'pointer',
                      background: 'white'
                    }}
                    onClick={() => navigate(`/worker/${worker._id}`)}
                  >
                    {/* Photo */}
                    <CardMedia
                      component="img"
                      height="220"
                      image={worker.photo || 'https://via.placeholder.com/400x220?text=Worker'}
                      alt={worker.name}
                      sx={{ objectFit: 'cover' }}
                    />

                    {/* Content */}
                    <CardContent sx={{ p: 3 }}>
                      {/* Name & ID */}
                      <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                        {worker.name} <Typography component="span" variant="caption" color="text.secondary">
                          (ID: {worker._id.slice(-6)})
                        </Typography>
                      </Typography>

                      {/* Gender & Age */}
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <TransgenderIcon fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {worker.gender || 'Not specified'} • {worker.age || '--'} years
                        </Typography>
                      </Box>

                      {/* Bio */}
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6, minHeight: 60 }}>
                        {worker.bio?.slice(0, 100) || 'Professional worker with great experience'}...
                      </Typography>

                      {/* Skills */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
                        {worker.skills?.slice(0, 3).map((s) => (
                          <Chip key={s} label={s} size="small" color="primary" variant="outlined" />
                        ))}
                        {worker.skills?.length > 3 && (
                          <Chip label={`+${worker.skills.length - 3}`} size="small" variant="outlined" />
                        )}
                      </Box>

                      {/* Price, Location, Availability */}
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <MonetizationOnIcon fontSize="small" sx={{ color: '#16a34a' }} />
                          <Typography variant="body1" fontWeight="medium" color="success.main">
                            ₹{worker.pricePerHour || '--'}/{worker.pricingType || 'hr'}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LocationOnIcon fontSize="small" sx={{ color: '#ef4444' }} />
                          <Typography variant="body2" color="text.secondary">
                            {worker.location || 'Noida / Delhi'} • {Math.round(worker.dist / 1000) || '--'} km
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarMonthIcon fontSize="small" sx={{ color: '#8b5cf6' }} />
                          <Typography variant="body2" color="text.secondary">
                            Available: {worker.availability?.join(', ') || 'Not specified'}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Hire / Request Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={(e) => {
                          e.stopPropagation(); // Card click रोकें
                          alert(`Request sent to ${worker.name} for ${decodedSkill}!`);
                          // Real में handleRequest(worker._id) call करो
                        }}
                        sx={{
                          borderRadius: 50,
                          py: 1.5,
                          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          '&:hover': { background: 'linear-gradient(90deg, #2563eb, #7c3aed)' }
                        }}
                      >
                        Hire / Send Request
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Fade>
        )}
      </Container>
    </Box>
  );
};



export default SearchResults;