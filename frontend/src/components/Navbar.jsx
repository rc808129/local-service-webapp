import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  IconButton,
  Avatar,
  Stack,
  Box,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const ResponsiveAppBar = ({
setOpenAuth
  
}) => {
  const theme = useTheme();
    const [searchSkill, setSearchSkill] = useState("");
    const navigate = useNavigate()
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));   // < 600px → Mobile
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('sm')); // ≥ 600px → Tablet + Laptop


  
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

      const res = await axios.get(`${API_URL}/api/profiles/my`, {
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
    <AppBar 
      position="sticky" 
      sx={{ backgroundColor: "#f5f5f5", color: "black" }} 
      elevation={5}
    >
      <Toolbar
        sx={{
          px: { xs: 1.5, sm: 3, md: 4 },
          py: { xs: 1.5, sm: 1.5 },
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: isMobile ? 2 : 2,
        }}
      >
        
        {isTabletOrLarger && (
          <Box sx={{ 
            width: '100%', 
            display: 'flex', 
            alignItems: 'center',
            gap: 2 
          }}>
           
            <Typography variant="h6" sx={{ flexShrink: 0, minWidth: 200 }}>
              Dashboard - Welcome
            </Typography>

            
            <Stack 
              direction="row" 
              spacing={1.5} 
              sx={{ flex: 1, maxWidth: 700, mx: 'auto' }}
            >
              <TextField
                fullWidth
                placeholder="Search electrician, plumber..."
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: "25px" },
                  "& input::placeholder": { fontSize: "18px" },
                  "& .MuiInputBase-input": { fontSize: "18px" },
                }}
              />
              <Button 
                variant="contained" 
                onClick={handleSearch}
                sx={{ borderRadius: "25px", px: 4, whiteSpace: "nowrap" }}
              >
                Search
              </Button>
            </Stack>

            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexShrink: 0 }}>
              <Button 
                variant="outlined" 
                className="auth-button"
                onClick={() => {
                  setOpenAuth(true)
                  console.log("hello my name iskslk");
                }}
                sx={{ px: 3, whiteSpace: 'nowrap' }}
              >
                Login / Signup
              </Button>

              <IconButton onClick={handleClick}>
                <Avatar src="/profile.png" />
              </IconButton>
            </Box>
          </Box>
        )}

       
        {isMobile && (
          <>
          
            <Box sx={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <Typography variant="h6">
                Dashboard - Welcome
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Button 
                  variant="outlined" 
                  size="small"
                   className="auth-button"
                  onClick={() => {
                   setOpenAuth(true)
                    console.log("hello my name iskslk");
                  }}
                >
                  Login / Signup
                </Button>
                <IconButton onClick={handleClick} size="large">
                  <Avatar src="/profile.png" sx={{ width: 50, height: 50 }} />
                </IconButton>
              </Box>
            </Box>

          
            <Stack 
              direction="row" 
              spacing={1.5} 
              sx={{ width: '100%' }}   
            >
              <TextField
                fullWidth
                placeholder="Search electrician, plumber..."
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                sx={{
                  "& .MuiInputBase-root": { borderRadius: "25px" },
                  "& input::placeholder": { fontSize: "18px" },
                  "& .MuiInputBase-input": { fontSize: "18px" },
                }}
              />
              <Button 
                variant="contained" 
                onClick={handleSearch}
                sx={{ 
                  borderRadius: "25px", 
                  px: 4, 
                  whiteSpace: "nowrap",
                  flexShrink: 0 
                }}
              >
                Search
              </Button>
            </Stack>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveAppBar;