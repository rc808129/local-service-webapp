import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Container, Typography, Grid, Card, CardContent, CardMedia,
  Button, Chip, Rating, CircularProgress, Alert,Fade, Divider
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import WorkIcon from '@mui/icons-material/Work';

const SearchResults = () => {

  const { skill } = useParams();
  const decodedSkill = decodeURIComponent(skill);
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {

  const fetchWorkers = async () => {

    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/profiles/search",
      {
        params: { skill:decodedSkill },   // skill backend ko bhej rahe hain
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    setWorkers(res.data.workers)
    setLoading(false)
    console.log(res.data.workers);

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
        {/* Heading */}
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
                      cursor: 'pointer'
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
                      {/* Name */}
                      <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
                        {worker.name}
                      </Typography>

                      {/* Rating */}
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Rating value={4.5} readOnly precision={0.5} size="small" />
                        <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                          4.5 ★
                        </Typography>
                      </Box>

                      {/* Skills */}
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8, mb: 2 }}>
                        {worker.skills?.slice(0, 3).map((s) => (
                          <Chip key={s} label={s} size="small" color="primary" variant="outlined" />
                        ))}
                        {worker.skills?.length > 3 && (
                          <Chip label={`+${worker.skills.length - 3}`} size="small" variant="outlined" />
                        )}
                      </Box>

                      {/* Price & Distance */}
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <MonetizationOnIcon fontSize="small" sx={{ mr: 0.5, color: '#16a34a' }} />
                          <Typography variant="body1" fontWeight="medium" color="success.main">
                            ₹{worker.pricePerHour || '--'}/hr
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: '#ef4444' }} />
                          <Typography variant="body2" color="text.secondary">
                            {Math.round(worker.dist / 1000)} km
                          </Typography>
                        </Box>
                      </Box>

                      {/* Hire/Request Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        size="large"
                        onClick={(e) => {
                          e.stopPropagation(); // Card click ko rok do
                          // Request logic yahan call karo
                          alert(`Request sent to ${worker.name} for ${decodedSkill}!`);
                          // Real mein handleRequest(worker._id) call karo
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