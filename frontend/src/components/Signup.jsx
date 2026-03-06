import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, TextField, Container, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete, Box } from '@mui/material';
import '../App.css';


const cities = [
  "Noida",
  "Delhi",
  "Mumbai",
  "Lucknow",
  "Kanpur",
  "Agra",
  "Nagpur",
  "Bangalore"
];


const Signup = () => {
 const { register, handleSubmit, control } = useForm();
 const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', data);
      localStorage.setItem('token', res.data.token); 
      
        navigate("/");
      alert('Signup successful!');  
     
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '50px' }}>
      <Typography variant="h5">Signup</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Name" fullWidth margin="normal" {...register('name', { required: true })} />
        <TextField label="Email" fullWidth margin="normal" {...register('email', { required: true })} />
        <TextField label="Password" type="password" fullWidth margin="normal" {...register('password', { required: true })} />
     <FormControl fullWidth margin="normal">
  <Controller
    name="city"
    control={control}
    defaultValue=""
    rules={{ required: true }}
    render={({ field }) => (
      <Autocomplete
        freeSolo
        options={cities}
        onInputChange={(event, value) => field.onChange(value)}
        renderInput={(params) => (
          <TextField {...params} label="Select Your City" />
        )}
      />
    )}
  />
</FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
       
      
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?
        </Typography>

        <Typography
          variant="h6"
          onClick={() => navigate("/login")}
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
          Login
        </Typography>
      </Box>

      </form>
    </Container>
  );
};

export default Signup;