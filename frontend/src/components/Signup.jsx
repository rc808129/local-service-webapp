import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, TextField, Container, Typography, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';
import '../App.css';


const Signup = () => {
 const { register, handleSubmit, control } = useForm();
 const navigate = useNavigate();



  const onSubmit = async (data) => {
    console.log(data)
    try {
      const res = await axios.post('http://localhost:5000/api/users/signup', data);
      localStorage.setItem('token', res.data.token); 
       // टोकन स्टोर
        navigate("/");
      alert('Signup successful!');  // बाद में रीडायरेक्ट करो /dashboard पर
     
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
  <InputLabel id="role-label">Role</InputLabel>
  <Controller
    name="role"
    control={control}
    defaultValue=""
    rules={{ required: true }}
    render={({ field }) => (
      <Select {...field} labelId="role-label" label="Role">
        <MenuItem value="client">Client</MenuItem>
        <MenuItem value="worker">Worker</MenuItem>
      </Select>
    )}
  />
</FormControl>

        <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
          {/* <Typography
        sx={{ mt: 2, textAlign: "right", cursor: "pointer", color: "primary.main" }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </Typography> */}
      
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