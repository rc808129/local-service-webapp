import { Link } from 'react-router-dom';
import { Button, Typography, Container } from '@mui/material';

const LandingPage = () => {
  return (
     <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
   
      <Typography variant="h4">Welcome to Local Service App</Typography>
      <Button variant="contained" color="primary" component={Link} to="/signup" style={{ margin: '10px' }}>
        Signup
      </Button>
      <Button variant="outlined" color="primary" component={Link} to="/login">
        Login
      </Button>
      
     </Container>
  );
};

export default LandingPage;