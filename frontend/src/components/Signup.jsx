// import { useForm, Controller } from 'react-hook-form';
// import { useNavigate } from "react-router-dom";
// import axios from 'axios';
// import { Button, TextField, Container, Typography, Select, MenuItem, FormControl, InputLabel, Autocomplete, Box } from '@mui/material';
// import '../App.css';
// const API_URL = import.meta.env.VITE_API_URL;


// const cities = [
//   "Noida",
//   "Delhi",
//   "Mumbai",
//   "Lucknow",
//   "Kanpur",
//   "Agra",
//   "Nagpur",
//   "Bangalore"
// ];


// const Signup = ({setAuthType, setOpenAuth}) => {
//  const { register, handleSubmit, control } = useForm();
//  const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     console.log(data)
//     try {
//       const res = await axios.post(`${API_URL}/api/users/signup`, data);
//       localStorage.setItem('token', res.data.token); 
//        setOpenAuth(false)
//         navigate("/");
//       alert('Signup successful!');  
     
//     } catch (err) {
//       alert(err.response.data.msg);
//     }
//   };

//   return (
//     <Container maxWidth="xs" style={{ marginTop: '50px' }}>
//       <Typography variant="h5">Signup</Typography>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField label="Name" fullWidth margin="normal" {...register('name', { required: true })} />
//         <TextField label="Email" fullWidth margin="normal" {...register('email', { required: true })} />
//         <TextField label="Password" type="password" fullWidth margin="normal" {...register('password', { required: true })} />
//      <FormControl fullWidth margin="normal">
//   <Controller
//     name="city"
//     control={control}
//     defaultValue=""
//     rules={{ required: true }}
//     render={({ field }) => (
//       <Autocomplete
//         freeSolo
//         options={cities}
//         onInputChange={(event, value) => field.onChange(value)}
//         renderInput={(params) => (
//           <TextField {...params} label="Select Your City" />
//         )}
//       />
//     )}
//   />
// </FormControl>

//         <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
       
      
//       <Box sx={{ mt: 3, textAlign: "center" }}>
//         <Typography variant="body2">
//           Already have an account?
//         </Typography>

//         <Typography
//           variant="h6"
//           onClick={() => setAuthType("login")}
//           sx={{
//             color: "red",
//             fontWeight: "bold",
//             textDecoration: "underline",
//             cursor: "pointer",
//             mt: 0.5,
//             "&:hover": {
//               color: "darkred"
//             }
//           }}
//         >
//           Login
//         </Typography>
//       </Box>

//       </form>
//     </Container>
//   );
// };

// export default Signup;




import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Button, TextField, Container, Typography, Autocomplete, Box, CircularProgress } from '@mui/material';
import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const cities = [
  "Noida", "Delhi", "Mumbai", "Lucknow", "Kanpur", 
  "Agra", "Nagpur", "Bangalore", "Gurugram", "Hyderabad"
];

const Signup = ({ setAuthType, setOpenAuth }) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    console.log("Sending Data:", data);   // Debugging

    try {
      const res = await axios.post(`${API_URL}/api/users/signup`, data);

      console.log("Signup Success:", res.data);

      localStorage.setItem('token', res.data.token);
      alert('Signup successful!');
      setOpenAuth(false);
      navigate("/");

    } catch (err) {
      console.error("Signup Error:", err.response?.data || err.message);
      
      const errorMsg = err.response?.data?.msg || 
                      err.response?.data?.message || 
                      "Signup failed. Please try again.";

      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" sx={{ marginTop: '50px' }}>
      <Typography variant="h5" align="center" gutterBottom>
        Create Account
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField 
          label="Full Name" 
          fullWidth 
          margin="normal" 
          {...register('name', { required: "Name is required" })} 
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField 
          label="Email" 
          type="email"
          fullWidth 
          margin="normal" 
          {...register('email', { required: "Email is required" })} 
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          margin="normal" 
          {...register('password', { 
            required: "Password is required",
            minLength: { value: 6, message: "Password must be at least 6 characters" }
          })} 
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        {/* City Autocomplete */}
        <Controller
          name="city"
          control={control}
          defaultValue=""
          rules={{ required: "Please select your city" }}
          render={({ field }) => (
            <Autocomplete
              freeSolo
              options={cities}
              value={field.value}
              onChange={(event, newValue) => field.onChange(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select Your City"
                  margin="normal"
                  fullWidth
                  error={!!errors.city}
                  helperText={errors.city?.message}
                />
              )}
            />
          )}
        />

        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ mt: 3, py: 1.5 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Sign Up"}
        </Button>

        <Box sx={{ mt: 3, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account?
          </Typography>
          <Typography
            variant="h6"
            onClick={() => setAuthType("login")}
            sx={{
              color: "red",
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
              mt: 0.5,
              "&:hover": { color: "darkred" }
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