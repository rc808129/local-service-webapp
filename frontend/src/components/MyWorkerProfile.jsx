// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Container, Typography, Avatar, Chip, Card, CardContent, Divider } from '@mui/material';

// const MyWorkerProfile = () => {
//   const [profile, setProfile] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           setError('Please login to view your profile');
//           setLoading(false);
//           return;
//         }

//         const res = await axios.get('http://localhost:5000/api/profiles/my', {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         setProfile(res.data.profile || {});
//         setLoading(false);
//       } catch (err) {
//         setError(err.response?.data?.msg || 'Error fetching profile');
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 10 }}>
//         <Typography>Loading your profile...</Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Box sx={{ textAlign: 'center', py: 10, color: 'red' }}>
//         <Typography>{error}</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', py: 8 }}>
//       <Container maxWidth="md">
//         <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
//           <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 6, textAlign: 'center' }}>
//             <Avatar src={profile.photo} sx={{ width: 160, height: 160, mx: 'auto', mb: 3, border: '5px solid white' }} />
//             <Typography variant="h4" fontWeight="bold">
//               {profile.name || 'Your Name'}
//             </Typography>
//             <Typography variant="h6" sx={{ mt: 1 }}>
//               Professional Worker
//             </Typography>
//           </Box>

//           <CardContent sx={{ p: 5 }}>
//             <Typography variant="h6" gutterBottom>Basic Info</Typography>
//             <Typography>Phone: {profile.phone || 'Not added'}</Typography>
//             <Typography>Gender: {profile.gender || 'Not specified'}</Typography>
//             <Typography>Age: {profile.age || 'Not added'}</Typography>
//             <Typography>Address: {profile.address || 'Not added'}</Typography>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom>About Me</Typography>
//             <Typography sx={{ whiteSpace: 'pre-wrap' }}>
//               {profile.bio || 'No bio added yet'}
//             </Typography>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom>Skills</Typography>
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {profile.skills?.map(skill => (
//                 <Chip key={skill} label={skill} size="large" color="primary" />
//               )) || <Typography color="text.secondary">No skills added</Typography>}
//             </Box>

//             <Divider sx={{ my: 4 }} />

//             <Typography variant="h6" gutterBottom>Pricing & Availability</Typography>
//             <Typography variant="h5" color="primary">
//               ₹{profile.pricePerHour || '---'} {profile.pricingType === 'hourly' ? '/hr' : profile.pricingType === 'daily' ? '/day' : 'fixed'}
//             </Typography>

//             <Typography sx={{ mt: 2 }}>
//               Available Days: {profile.availability?.join(', ') || 'Not selected'}
//             </Typography>
//           </CardContent>
//         </Card>
//       </Container>
//     </Box>
//   );
// };

// export default MyWorkerProfile;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box, Container, Typography, Avatar, Chip, Card, CardContent, Divider,
  Button, TextField, FormControl, FormLabel, RadioGroup, FormControlLabel,
  Radio, Checkbox, FormGroup, InputLabel, Select, MenuItem, Grid,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const MyWorkerProfile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({}); // edit के लिए temporary state

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

      setProfile(res.data.profile || {});
      setFormData(res.data.profile || {}); // edit के लिए copy
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Error fetching profile');
      setLoading(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsToggle = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...(prev.skills || []), skill]
    }));
  };

  const handleAvailabilityToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability?.includes(day)
        ? prev.availability.filter(d => d !== day)
        : [...(prev.availability || []), day]
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/profiles', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('Profile Updated Successfully! 🎉');
      setEditMode(false);
      fetchProfile(); // refresh data
    } catch (err) {
      alert(err.response?.data?.msg || 'Error updating profile');
    }
  };

  if (loading) return <Box sx={{ textAlign: 'center', py: 10 }}>Loading...</Box>;
  if (error) return <Box sx={{ textAlign: 'center', py: 10, color: 'red' }}>{error}</Box>;

  return (
    <Box sx={{ bgcolor: '#f0f4f8', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Card elevation={8} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Box sx={{ bgcolor: '#1976d2', color: 'white', p: 6, textAlign: 'center', position: 'relative' }}>
            <Avatar src={profile.photo} sx={{ width: 160, height: 160, mx: 'auto', mb: 3, border: '5px solid white' }} />
            <Typography variant="h4" fontWeight="bold">
              {editMode ? (
                <TextField
                  value={formData.name || ''}
                  onChange={handleEditChange}
                  name="name"
                  variant="standard"
                  fullWidth
                  inputProps={{ style: { color: 'white', textAlign: 'center', fontSize: '2rem' } }}
                />
              ) : (
                profile.name || 'Your Name'
              )}
            </Typography>

            {/* Edit Button */}
            {!editMode && (
              <IconButton
                onClick={() => setEditMode(true)}
                sx={{ position: 'absolute', top: 20, right: 20, color: 'white' }}
              >
                <EditIcon fontSize="large" />
              </IconButton>
            )}

            {editMode && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  sx={{ bgcolor: '#4caf50' }}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  onClick={() => {
                    setEditMode(false);
                    setFormData(profile); // revert changes
                  }}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          <CardContent sx={{ p: 5 }}>
            <Typography variant="h6" gutterBottom>Basic Info</Typography>
            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Phone" name="phone" value={formData.phone || ''} onChange={handleEditChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <FormLabel>Gender</FormLabel>
                    <RadioGroup row name="gender" value={formData.gender || ''} onChange={handleEditChange}>
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="other" control={<Radio />} label="Other" />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Age" type="number" name="age" value={formData.age || ''} onChange={handleEditChange} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Address" name="address" value={formData.address || ''} onChange={handleEditChange} />
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography>Phone: {profile.phone || 'Not added'}</Typography>
                <Typography>Gender: {profile.gender || 'Not specified'}</Typography>
                <Typography>Age: {profile.age || 'Not added'}</Typography>
                <Typography>Address: {profile.address || 'Not added'}</Typography>
              </>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>About Me</Typography>
            {editMode ? (
              <TextField
                fullWidth
                multiline
                rows={4}
                name="bio"
                value={formData.bio || ''}
                onChange={handleEditChange}
                placeholder="Tell about yourself..."
              />
            ) : (
              <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                {profile.bio || 'No bio added yet'}
              </Typography>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>Skills</Typography>
            {editMode ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {commonSkills.map(skill => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() => handleSkillsToggle(skill)}
                    color={formData.skills?.includes(skill) ? 'primary' : 'default'}
                    variant={formData.skills?.includes(skill) ? 'filled' : 'outlined'}
                    clickable
                  />
                ))}
              </Box>
            ) : (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {profile.skills?.map(skill => (
                  <Chip key={skill} label={skill} size="large" color="primary" />
                )) || <Typography color="text.secondary">No skills added</Typography>}
              </Box>
            )}

            <Divider sx={{ my: 4 }} />

            <Typography variant="h6" gutterBottom>Pricing & Availability</Typography>
            {editMode ? (
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Price Per Hour (₹)"
                    type="number"
                    name="pricePerHour"
                    value={formData.pricePerHour || ''}
                    onChange={handleEditChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel>Pricing Type</InputLabel>
                    <Select
                      name="pricingType"
                      value={formData.pricingType || 'hourly'}
                      onChange={handleEditChange}
                    >
                      <MenuItem value="hourly">Per Hour</MenuItem>
                      <MenuItem value="daily">Per Day</MenuItem>
                      <MenuItem value="fixed">Fixed Price</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Available Days</Typography>
                  <FormGroup row sx={{ flexWrap: 'wrap', gap: 2 }}>
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <FormControlLabel
                        key={day}
                        control={
                          <Checkbox
                            checked={formData.availability?.includes(day) || false}
                            onChange={() => handleAvailabilityToggle(day)}
                          />
                        }
                        label={day}
                      />
                    ))}
                  </FormGroup>
                </Grid>
              </Grid>
            ) : (
              <>
                <Typography variant="h5" color="primary">
                  ₹{profile.pricePerHour || '---'} {profile.pricingType === 'hourly' ? '/hr' : profile.pricingType === 'daily' ? '/day' : 'fixed'}
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Available Days: {profile.availability?.join(', ') || 'Not selected'}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default MyWorkerProfile;