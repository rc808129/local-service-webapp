import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Rating,
  Container,
  useMediaQuery,
  useTheme,
} from '@mui/material';

// फेक रिव्यू डेटा (5 रिव्यू)
const testimonials = [
  {
    name: 'Amit Patel',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: 'Great plumber! Came on time, fixed the leak in 30 minutes, very professional.',
    rating: 5,
    location: 'Pimpri-Chinchwad',
    date: '2 days ago',
  },
  {
    name: 'Sneha Joshi',
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    review: 'AC repair was quick and affordable. Technician explained everything clearly.',
    rating: 5,
    location: 'Pune',
    date: '1 week ago',
  },
  {
    name: 'Rohan Deshmukh',
    photo: 'https://randomuser.me/api/portraits/men/67.jpg',
    review: 'Electrician fixed my fan wiring perfectly. Highly recommended!',
    rating: 4.8,
    location: 'Chinchwad',
    date: '3 days ago',
  },
  {
    name: 'Priyanka More',
    photo: 'https://randomuser.me/api/portraits/women/68.jpg',
    review: 'Home cleaning service was excellent. Very thorough and polite staff.',
    rating: 5,
    location: 'Pimpri',
    date: '5 days ago',
  },
  {
    name: 'Vikram Singh',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
    review: 'Car mechanic came to my home, diagnosed and repaired the issue fast. Great job!',
    rating: 4.7,
    location: 'Pune',
    date: '10 days ago',
  },
];

const Testimonials = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    arrows: !isMobile, // मोबाइल पर arrows हटा दो, swipe से चलेगा
    centerMode: !isMobile,
    centerPadding: '40px',
  };

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'grey.100' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{
            mb: 2,
            background: 'linear-gradient(90deg, #1976d2, #42a5f5)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          What Our Customers Say
        </Typography>

        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 8 }}>
          Real experiences from people just like you
        </Typography>

        <Slider {...settings}>
          {testimonials.map((testimonial, index) => (
            <Box key={index} sx={{ px: 2 }}>
              <Card
                elevation={4}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-12px)',
                    boxShadow: 12,
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Avatar
                    src={testimonial.photo}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      mx: 'auto',
                      mb: 3,
                      border: '4px solid #1976d2',
                    }}
                  />

                  <Rating
                    value={testimonial.rating}
                    precision={0.1}
                    readOnly
                    size="large"
                    sx={{ mb: 2, color: '#ffb400' }}
                  />

                  <Typography
                    variant="body1"
                    sx={{
                      fontStyle: 'italic',
                      mb: 3,
                      minHeight: 80,
                      color: 'text.primary',
                    }}
                  >
                    "{testimonial.review}"
                  </Typography>

                  <Typography variant="subtitle1" fontWeight="bold">
                    {testimonial.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {testimonial.location} • {testimonial.date}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default Testimonials;