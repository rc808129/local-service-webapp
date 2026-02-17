import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Divider,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppleIcon from '@mui/icons-material/Apple'; // App Store के लिए
import AndroidIcon from '@mui/icons-material/Android'; // Google Play के लिए

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#001f3f', // डार्क ब्लू (Petco जैसा navy blue)
        color: 'white',
        pt: 8,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Column 1: Customer Care */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Customer Care
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" color="inherit" underline="hover">Returns</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Shipping Info</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Help</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Contact Us</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Website Accessibility Policy</Link></li>
            </Box>
          </Grid>

          {/* Column 2: Services */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Services
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" color="inherit" underline="hover">Home Repairs</Link></li>
              <li><Link href="#" color="inherit" underline="hover">AC & Fan Repair</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Plumbing & Electrical</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Car/Bike Mechanic</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Home Cleaning</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Beauty at Home</Link></li>
            </Box>
          </Grid>

          {/* Column 3: Corporate / About */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              About Us
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
              <li><Link href="#" color="inherit" underline="hover">Careers</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Contact Us</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Privacy Policy</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Terms of Use</Link></li>
              <li><Link href="#" color="inherit" underline="hover">Become a Provider</Link></li>
            </Box>
          </Grid>

          {/* Column 4: Keep In Touch (Newsletter + Social + App Download) */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Keep In Touch
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Subscribe for offers and updates
            </Typography>

            {/* Newsletter Input */}
            <TextField
              fullWidth
              placeholder="Email Address*"
              variant="outlined"
              size="small"
              sx={{
                bgcolor: 'white',
                borderRadius: 1,
                mb: 2,
                '& .MuiOutlinedInput-root': { borderRadius: 50 },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" sx={{ color: 'primary.main' }}>
                      →
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Social Icons */}
            <Box sx={{ mb: 3 }}>
              <IconButton color="inherit"><FacebookIcon /></IconButton>
              <IconButton color="inherit"><TwitterIcon /></IconButton>
              <IconButton color="inherit"><InstagramIcon /></IconButton>
              <IconButton color="inherit"><YouTubeIcon /></IconButton>
            </Box>

            {/* App Download */}
            <Typography variant="subtitle2" gutterBottom>
              Download Our App
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                startIcon={<AppleIcon />}
                sx={{ bgcolor: 'black', color: 'white', textTransform: 'none' }}
              >
                App Store
              </Button>
              <Button
                variant="contained"
                startIcon={<AndroidIcon />}
                sx={{ bgcolor: 'black', color: 'white', textTransform: 'none' }}
              >
                Google Play
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Bottom Logos / Brands (Petco जैसा row) */}
        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Powered by Local Talent
          </Typography>
          {/* तुम्हारे ब्रांड लोगो या पार्टनर ऐड करो – placeholder */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            <Typography variant="caption">[Your Logo] LocalKaam</Typography>
            <Typography variant="caption">Partners</Typography>
            {/* अगर इमेज लगानी हो तो <img src="..." alt="logo" height={30} /> */}
          </Box>
        </Box>

        {/* Divider + Legal Bottom Bar */}
        <Divider sx={{ my: 4, borderColor: 'grey.700' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
            <Link href="#" color="inherit" underline="hover">Terms of Use</Link> -{' '}
            <Link href="#" color="inherit" underline="hover">Privacy Policy</Link> -{' '}
            <Link href="#" color="inherit" underline="hover">Your Privacy Choices</Link> -{' '}
            <Link href="#" color="inherit" underline="hover">Site Map</Link>
          </Typography>
          <Typography variant="caption">
            © {new Date().getFullYear()} [Your App Name]. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;