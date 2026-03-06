

import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Avatar, Chip, Card, CardContent, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const MyWorkerProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your profile');
        setLoading(false);
        return;
      }

      const res = await axios.get('http://localhost:5000/api/profiles/my', {
        headers: { Authorization: `Bearer ${token}` }
      });
       console.log(res.data.profile)
      setProfile(res.data.profile || {});
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error fetching profile');
      setLoading(false);
    }
  };

  const handleEdit = () => {
   
    navigate('/edit-profile', { state: { profile } });  
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}>Loading...</Box>;
  if (error) return <Box sx={{ textAlign: 'center', py: 10, color: 'red' }}>{error}</Box>;

  return (
    <Box sx={{ bgcolor: '#D3D3D3', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="lg">
        <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#1976d2', color: 'white', px: 8, py: 4, textAlign: 'center', position: 'relative' }}>
            <Avatar src={profile.photo} sx={{ width: 160, height: 160, mx: 'auto', mb: 3, border: '5px solid white' }} />
            <Typography variant="h4" fontWeight="bold">
              {profile.name || 'Your Name'}
            </Typography>

           

<IconButton
  onClick={() => navigate("/")}
  sx={{ position: "absolute", top: 20, left: 20, color: "white" }}
>
  <ArrowBackIcon fontSize="large" />
</IconButton>
            <IconButton
              onClick={handleEdit}
              sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
            >
              <EditIcon fontSize="large" />
            </IconButton>
          </Box>

          <CardContent sx={{ p: 5 }}>
            <Typography variant="h4" gutterBottom>Basic Information</Typography>
            <Typography>Phone: {profile.phone || 'Not added'}</Typography>
            <Typography>Gender: {profile.gender || 'Not specified'}</Typography>
            <Typography>Age: {profile.age || 'Not added'}</Typography>
            <Typography>Location: {profile.location || 'Not added'}</Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h4" gutterBottom>About Me</Typography>
            <Typography sx={{ whiteSpace: 'pre-wrap' }}>
              {profile.bio || 'No bio added yet'}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h5" gutterBottom>Skills</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {profile.skills?.map(skill => (
                <Chip key={skill} label={skill} size="large" color="primary" />
              )) || <Typography color="text.secondary">No skills added</Typography>}
            </Box>

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>Pricing & PriceType</Typography>
            <Typography variant="h5" color="primary">
              ₹{profile.price || "---"}{" "}
  {profile.pricingType === "hour" && "Per Hour"}
  {profile.pricingType === "day" && "Per Day"}
  {profile.pricingType === "service" && "Per Service"}
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Available Days: {profile.availability?.join(', ') || 'Not selected'}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MyWorkerProfile;