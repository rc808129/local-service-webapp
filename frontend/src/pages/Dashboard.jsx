import { useEffect, useState } from "react";
import axios from "axios";

import ImageSlider from "../components/ImageSlider";

import PopularServices from "../components/PopularServices";
import HowItWorks from "../components/HowItWorks";
import Testimonials from "../components/Testimonials";
import Navbar from "../components/Navbar";
import Login from "../components/Login"
import Footer from "../components/Footer"
import NearbyWorkers from "../components/NearbyWorkers"
import CallToAction from "../components/CallToAction"


import {
  Box,
  Modal,
  Fade,
  Backdrop,
} from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";
import Signup from "../components/Signup"



const Dashboard = () => {
  const [openAuth, setOpenAuth] = useState(false);
    const [authType, setAuthType] = useState("signup");

  const [searchSkill, setSearchSkill] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  console.log(openAuth)

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/signup") {
      setOpenAuth(true);
    } else {
      setOpenAuth(false);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setOpenAuth(false)
  };

  const handleSearch = () => {
    if (searchSkill.trim() === "") {
      alert("Please enter a skill to search");
      return;
    }

    navigate(`/search/${encodeURIComponent(searchSkill)}`);
  };

  const handleClick = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/profiles/my", {
        headers: { Authorization: `Bearer ${token}` },
      });

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
     
<Navbar
  searchSkill={searchSkill}
  setSearchSkill={setSearchSkill}
  handleSearch={handleSearch}
  navigate={setOpenAuth}
  handleClick={handleClick}
/>
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
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          },
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
              boxShadow: 24,
            }}
          >
              {authType === "login" ? <Login setAuthType={setAuthType}/> : <Signup setAuthType={setAuthType}/>}
          </Box>
        </Fade>
      </Modal>
      <Box sx={{ mt: 2 }}>
        <ImageSlider />
      </Box>
      <PopularServices />
      <NearbyWorkers />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default Dashboard;
