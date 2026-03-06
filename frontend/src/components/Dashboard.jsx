import { useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import PopularServices from "./PopularServices";
import HowItWorks from "./HowItWorks";
import Testimonials from "./Testimonials";

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
  
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Footer from "./footer";
import NearbyWorkers from "./NearbyWorkers";
import CallToAction from "./CallToAction";


const Dashboard = () => {
  const [openAuth, setOpenAuth] = useState(false);

  

  const [searchSkill, setSearchSkill] = useState("");
 

 
  const navigate = useNavigate();
   const location = useLocation();


useEffect(() => {
  if (location.pathname === "/login" || location.pathname === "/signup") {
    setOpenAuth(true);
  } else {
    setOpenAuth(false);
  }
}, [location.pathname]);



 
const handleClose = () => {
  navigate("/");
};



const handleSearch = () => {
  if (searchSkill.trim() === '') {
    alert('Please enter a skill to search');
    return;
  }


navigate(`/search/${encodeURIComponent(searchSkill)}`);
};


 const handleClick = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.get(
      "http://localhost:5000/api/profiles/my",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    if (res.data.profile) {
      navigate("/my-profile");
    } else {
      navigate("/workers");
    }

  } catch (error) {
    console.log(error);
    navigate("/workers");
  }
};

  return (
    <>
        <AppBar position="static" color="transparent" elevation={5}>
           <Toolbar>
       <Typography variant="h6" sx={{ flex: 1 }}>
          Dashboard - Welcome 
        </Typography>


    <Box sx={{ flex: 2, display: "flex", justifyContent: "center" }}>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Search electrician, plumber..."
              value={searchSkill}
              onChange={(e) => setSearchSkill(e.target.value)}
            />
            <Button variant="contained" onClick={handleSearch} >
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
