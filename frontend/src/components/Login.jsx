import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
const API_URL = import.meta.env.VITE_API_URL;

const Login = ({setAuthType}) => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate(); 

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${API_URL}/api/users/login`, data);
      localStorage.setItem('token', res.data.token);
       navigate("/");
      alert('Login successful!');
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Typography variant="h5">Login</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" fullWidth margin="normal" {...register('email', { required: true })} />
        <TextField label="Password" type="password" fullWidth margin="normal" {...register('password', { required: true })} />
        <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
         Don't have an account?
        </Typography>

        <Typography
          variant="h6"
          onClick={() => setAuthType("signup")}
          sx={{
            color: "red",
            fontWeight: "bold",
            textDecoration: "underline",
            cursor: "pointer",
            mt: 0.5,
            "&:hover": {
              color: "darkred"
            }
          }}
        >
        Signup
        </Typography>
      </Box>
      </form>
    </Container>
  );
};

export default Login;