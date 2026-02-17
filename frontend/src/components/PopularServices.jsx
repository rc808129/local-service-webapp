import { Grid, Typography, Card, CardContent, Box, Chip } from '@mui/material';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import CarpenterIcon from '@mui/icons-material/Carpenter';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import SpaIcon from '@mui/icons-material/Spa';
import HandymanIcon from '@mui/icons-material/Handyman';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import { useNavigate } from 'react-router-dom';

const services = [
  { name: 'Plumbing', icon: <PlumbingIcon fontSize="large" color="primary" />, desc: 'Leaks, taps, bathroom fittings', query: 'plumbing' },
  { name: 'Electrical', icon: <ElectricBoltIcon fontSize="large" color="primary" />, desc: 'Wiring, fans, switches', query: 'electrical' },
  { name: 'AC & Fridge Repair', icon: <AcUnitIcon fontSize="large" color="primary" />, desc: 'Cooling issues, gas refill', query: 'ac repair' },
  { name: 'Carpenter', icon: <CarpenterIcon fontSize="large" color="primary" />, desc: 'Furniture, doors, woodwork', query: 'carpenter' },
  { name: 'Home Cleaning', icon: <CleaningServicesIcon fontSize="large" color="primary" />, desc: 'Deep cleaning, daily help', query: 'home cleaning' },
  { name: 'Painting', icon: <FormatPaintIcon fontSize="large" color="primary" />, desc: 'Wall painting, waterproofing', query: 'painting' },
  { name: 'Beauty & Salon at Home', icon: <SpaIcon fontSize="large" color="primary" />, desc: 'Haircut, massage, makeup', query: 'beauty salon' },
  { name: 'Car/Bike Mechanic', icon: <HandymanIcon fontSize="large" color="primary" />, desc: 'Servicing, repairs', query: 'car mechanic' },
];

const PopularServices = () => {
  const navigate = useNavigate();

  const handleClick = (query) => {
    navigate(`/search?service=${encodeURIComponent(query)}`);
  };

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50',  maxWidth: 1200,
    mx: 'auto',
    px: 2 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Popular Services
      </Typography>
      <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Choose what you need help with - get connected instantly!
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {services.map((service) => (
          <Grid size={{ xs : 6, sm : 3,  md : 3}} key={service.name}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                  bgcolor: 'primary.light',
                  color: 'white',
                  '& .MuiSvgIcon-root': { color: 'white' },
                },
              }}
              onClick={() => handleClick(service.query)}
            >
              <CardContent sx={{ py: 4 }}>
                <Box sx={{ mb: 2 }}>{service.icon}</Box>
                <Typography variant="h6" fontWeight="bold">
                  {service.name}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
                  {service.desc}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PopularServices;