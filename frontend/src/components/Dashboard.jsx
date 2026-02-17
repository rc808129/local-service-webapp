import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import ImageSlider from "./ImageSlider";
import PopularServices from "./PopularServices";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";




import { Outlet } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Stack,
  AppBar,
  Toolbar,
  Box,
  Modal,
  Fade,
  Backdrop,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Footer from "./footer";
import NearbyWorkers from "./NearbyWorkers";
import CallToAction from "./CallToAction";


const Dashboard = () => {
  const [openAuth, setOpenAuth] = useState(false);

  const [user, setUser] = useState(null);
  // const [location, setLocation] = useState({ lat: null, long: null });
  const [searchSkill, setSearchSkill] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
   const location = useLocation();


useEffect(() => {
  if (location.pathname === "/login" || location.pathname === "/signup") {
    setOpenAuth(true);
  } else {
    setOpenAuth(false);
  }
}, [location.pathname]);



  // =========================
  // AUTH + LOCATION
  // =========================
  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode(token);
  //     console.log("DECODED USER:", decoded);
  //     setUser(decoded);

  //     // Axios header (safe way)
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  //     // Get current location
  //     navigator.geolocation.getCurrentPosition(
        
  //       (pos) => {
  //           console.log("LOCATION FOUND", pos.coords);
  //         setLocation({
  //           lat: pos.coords.latitude,
  //           long: pos.coords.longitude
  //         });
  //       },
  //       (err) =>{
  //         console.log("Location error", err)
  //          alert("Location permission denied")
  //       }
  //     );
  //   } catch (err) {
  //     localStorage.removeItem("token");
  //     navigate("/login");
  //   }
  // }, [navigate]);

  // // =========================
  // // WORKER: PROFILE SUBMIT
  // // =========================
  // const onProfileSubmit = async (data) => {
  //   try {
  //     const payload = {
  //       ...data,
  //       latitude: location.lat,
  //       longitude: location.long,
  //       skills: data.skills.split(",").map((s) => s.trim())
  //     };

  //     await axios.post("http://localhost:5000/api/profiles", payload);
  //     alert("Profile saved successfully!");
  //   } catch (err) {
  //     alert("Profile save failed");
  //   }
  // };

  // // =========================
  // // CLIENT: SEARCH
  // // =========================
  // const onSearch = async () => {
  //     console.log("Searching with:", searchSkill, location);
  //       if (!location.lat || !location.long) {
  //   alert("Location not available yet");
  //   return;
  // }
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:5000/api/profiles/search?skill=${searchSkill}&lat=${location.lat}&long=${location.long}`
  //     );
  //        console.log("RESULT:", res.data);
  //     setProfiles(res.data);
  //   } catch (err) {
  //        console.log(err);
  //     alert("Search failed");
  //   }
  // };

  // if (!user) return <div>Loading...</div>;
const handleClose = () => {
  navigate("/");
};


  const handleClick = () => {
    navigate("/workers");
  };

  return (
    <>
        <AppBar position="static" color="transparent" elevation={5}>
           <Toolbar>
       <Typography variant="h6" sx={{ flex: 1 }}>
          Dashboard - Welcome 
        </Typography>

{/*    
      {user.role === "worker" ? (
        <form onSubmit={handleSubmit(onProfileSubmit)}>
          <TextField
            label="Skills (comma separated)"
            fullWidth
            margin="normal"
            {...register("skills", { required: true })}
          />
          <TextField
            label="Price per Hour"
            type="number"
            fullWidth
            margin="normal"
            {...register("pricePerHour")}
          />
          <TextField
            label="Phone"
            fullWidth
            margin="normal"
            {...register("phone", { required: true })}
          />
          <TextField
            label="Other Details"
            fullWidth
            margin="normal"
            {...register("otherDetails")}
          />
          <Button type="submit" variant="contained">
            Save Profile
          </Button>
        </form>
      ) : ( */}
    <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Search electrician, plumber..."
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
            <Button variant="contained" >
              Search
            </Button>
          </Stack>
        </Box>

          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined"
             onClick={() => navigate("/signup")}
         
          >
            Login / Signup
          </Button>

          <IconButton onClick={handleClick}>
      <Avatar src="/profile.png" />
    </IconButton>
        </Box>


      </Toolbar>
    </AppBar>

          {/* /* <Grid container spacing={2} sx={{ mt: 2 }}>
            {profiles.map((profile, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{profile.name}</Typography>
                    <Typography>
                      Skills: {profile.skills.join(", ")}
                    </Typography>
                    <Typography>
                      Price: ₹{profile.pricePerHour}/hr
                    </Typography>
                    <Typography>Phone: {profile.phone}</Typography>
                    <Typography>{profile.otherDetails}</Typography>
                    <Typography>
                      Distance: {profile.dist} meters
                    </Typography>

                    <Button
                      variant="outlined"
                      sx={{ mt: 1 }}
                      onClick={() =>
                        alert(
                          `Contact ${profile.name} at ${profile.phone}`
                        )
                      }
                    >
                      Contact
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid> */
      
      /* )} */ }
      
        <Modal
        open={openAuth}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backdropFilter: "blur(6px)",
              backgroundColor: "rgba(0,0,0,0.4)"
            }
          }
        }}
      >
        <Fade in={openAuth}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
              boxShadow: 24
            }}
          >
        {location.pathname === "/signup" && <Signup />}
      {location.pathname === "/login" && <Login />}
          </Box>
        </Fade>
      </Modal>
      <Box sx={{ mt: 2 }}>
  <ImageSlider />

</Box>
 <PopularServices/>
 <NearbyWorkers/>
 <HowItWorks/>
 <Testimonials/>
 <CallToAction/>
 <Footer/>
   </>
  );
};

export default Dashboard;
