import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';


import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  FormGroup,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Divider,               // ← ये जरूर होना चाहिए
  CircularProgress,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';

const commonSkills = [
  'AC Repair', 'Fan Repair', 'Plumbing', 'Electrical', 'Carpenter',
  'Home Cleaning', 'Deep Cleaning', 'Car Wash', 'Bike Repair', 'Painting',
  'Beauty & Salon', 'Massage', 'Makeup', 'Refrigerator Repair', 'Washing Machine Repair',
  'Pest Control', 'Roof Waterproofing', 'Furniture Repair'
];
const WorkerProfileSetup = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [skills, setSkills] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [availability, setAvailability] = useState([]);

  const formData = watch();

  // ←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←←
  // यहीं पर नया onSubmit डाल दो (पुराना हटा दो)
  const onSubmit = async (data) => {
    try {
      // Form data को तैयार करो
      const profileData = {
        ...data,
        skills,                    // array of skills
        availability,              // array of days
        photo: photo ? photo : null, // photo URL (real में Cloudinary पर upload करो)
      };

      // JWT token ले लो (login के समय localStorage में save किया था)
      const token = localStorage.getItem('token');

      if (!token) {
        alert('Please login first!');
        navigate('/login');
        return;
      }

      // Backend पर POST request भेजो
      const res = await axios.post(
        'http://localhost:5000/api/profiles', 
        profileData,
        {
          headers: {
            Authorization: `Bearer ${token}`   // ← ये जरूरी है (auth के लिए)
          }
        }
      );

      alert('Profile Saved Successfully! 🎉 Now clients can find you.');
      
      // Success पर My Profile page पर भेज दो
      navigate('/my-profile');

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Error saving profile. Please try again.');
    }
  };

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="xl">
       <Grid container spacing={6}>
  <Grid size={{ xs: 12, lg: 7 }}>

            <Card elevation={6} sx={{ borderRadius: 4, p: { xs: 3, md: 5 } }}>
              <Typography variant="h4" fontWeight="bold" gutterBottom align="center" sx={{ mb: 4 }}>
                Setup Your Worker Profile
              </Typography>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                  {/* Photo */}
                <Grid size={{ xs: 12 }}>

                    <Box sx={{ textAlign: 'center', mb: 4 }}>
                      <Avatar
                        src={photo}
                        sx={{ width: 140, height: 140, mx: 'auto', mb: 2, border: '4px solid #1976d2' }}
                      />
                      <Button
                        variant="contained"
                        component="label"
                        startIcon={<PhotoCameraIcon />}
                        sx={{ borderRadius: 50 }}
                      >
                        Upload Profile Photo
                        <input type="file" hidden accept="image/*" onChange={(e) => setPhoto(URL.createObjectURL(e.target.files[0]))} />
                      </Button>
                    </Box>
                  </Grid>

                  {/* Basic Info */}
                  <Grid size={{ xs: 12, sm: 6 }}>

                    <TextField fullWidth label="Full Name" {...register('name')} required variant="outlined" />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Phone Number" {...register('phone')} required variant="outlined" />
                  </Grid>

                 <Grid size={{ xs: 12, sm: 6 }}>

                    <FormControl fullWidth>
                      <FormLabel>Gender</FormLabel>
                      <RadioGroup row {...register('gender')}>
                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>

                    <TextField fullWidth label="Age" type="number" {...register('age')} variant="outlined" />
                  </Grid>

                  {/* Bio */}
                  <Grid size={{ xs: 12 }}>

                    <TextField
                      fullWidth
                      label="About Yourself"
                      multiline
                      rows={4}
                      {...register('bio')}
                      placeholder="Experienced technician with 5+ years in AC & electrical repairs..."
                      variant="outlined"
                    />
                  </Grid>

                  {/* Skills */}
                  <Grid size={{ xs: 12 }}>

                    <Typography variant="subtitle1" gutterBottom>Skills You Offer</Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {commonSkills.map(skill => (
                        <Chip
                          key={skill}
                          label={skill}
                          onClick={() => setSkills(prev => 
                            prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
                          )}
                          color={skills.includes(skill) ? 'primary' : 'default'}
                          variant={skills.includes(skill) ? 'filled' : 'outlined'}
                          clickable
                          sx={{ fontSize: '0.95rem', py: 1.5 }}
                        />
                      ))}
                    </Box>
                  </Grid>

                  {/* Pricing */}
                <Grid size={{ xs: 12, sm: 6 }}>

                    <TextField
                      fullWidth
                      label="Price Per Hour (₹)"
                      type="number"
                      {...register('pricePerHour')}
                      variant="outlined"
                      required
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>

                    <FormControl fullWidth>
                      <InputLabel>Pricing Type</InputLabel>
                      <Select {...register('pricingType')} defaultValue="hourly">
                        <MenuItem value="hourly">Per Hour</MenuItem>
                        <MenuItem value="daily">Per Day</MenuItem>
                        <MenuItem value="fixed">Fixed Price per Job</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  {/* Availability */}
                 <Grid size={{ xs: 12 }}>

                    <Typography variant="subtitle1" gutterBottom>Available Days</Typography>
                    <FormGroup row sx={{ flexWrap: 'wrap', gap: 2 }}>
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <FormControlLabel
                          key={day}
                          control={
                            <Checkbox
                              checked={availability.includes(day)}
                              onChange={() => setAvailability(prev =>
                                prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
                              )}
                            />
                          }
                          label={day}
                        />
                      ))}
                    </FormGroup>
                  </Grid>

                  {/* Location */}
               <Grid size={{ xs: 12 }}>

                    <TextField
                      fullWidth
                      label="Your Area / City"
                      {...register('location')}
                      variant="outlined"
                      InputProps={{
                        startAdornment: <LocationOnIcon sx={{ mr: 1, color: 'action.active' }} />
                      }}
                      placeholder="Pimpri-Chinchwad, Pune"
                    />
                  </Grid>

                  {/* Submit */}
                  <Grid size={{ xs: 12 }}>

                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{
                        py: 2,
                        fontSize: '1.2rem',
                        mt: 4,
                        background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
                        boxShadow: '0 8px 20px rgba(25,118,210,0.3)',
                        '&:hover': { background: 'linear-gradient(90deg, #1565c0, #2196f3)' }
                      }}
                    >
                      Save Profile & Start Getting Jobs
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Card>
          </Grid>

         
        </Grid>
      </Container>
    </Box>
  );
};

export default WorkerProfileSetup;