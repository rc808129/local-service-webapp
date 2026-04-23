// import { AppBar, Toolbar, Typography, Stack, TextField, Button, Box, IconButton, Avatar } from "@mui/material";

// function Navbar({ searchSkill, setSearchSkill, handleSearch, navigate, handleClick }) {
//   return (
//     <AppBar position="sticky" sx={{ backgroundColor: "#f5f5f5", color: "black" }} elevation={5}>
//       <Toolbar  sx={{
//     px: { xs: 1, sm: 2, md: 4 },
//     gap: 4
//   }}>
//         <Typography variant="h6" sx={{ flex: 1 }}>
//           Dashboard - Welcome
//         </Typography>

//         <Stack direction="row" spacing={1} sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
//           <TextField
//             fullWidth
//             placeholder="Search electrician, plumber..."
//             value={searchSkill}
//             onChange={(e) => setSearchSkill(e.target.value)}
//              sx={{
//       "& .MuiInputBase-root": {
//         borderRadius: "25px",   
//       },
//       "& input::placeholder": {
//         fontSize: "18px",       
//       },
//       "& .MuiInputBase-input": {
//       fontSize: "18px"
//     }
//     }}
//           />
//           <Button variant="contained" onClick={handleSearch}
//           sx={{
//             borderRadius: "25px",
//             px: 3
//           }}
//           >
//             Search
//           </Button>
//         </Stack>

//         <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 4 }}>
//           <Button 
//           variant="outlined" 
//           className="auth-button"
//           onClick={() => {navigate(true)
//             console.log("hello my name iskslk")}
//           }>
//             Login / Signup
//           </Button>

//           <IconButton onClick={handleClick}>
//             <Avatar src="/profile.png" />
//           </IconButton>
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// }

// export default Navbar;


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
  searchSkill,
  setSearchSkill,
  handleSearch,
  navigate,
  handleClick,
}) => {
  const theme = useTheme();
  
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));   // < 600px → Mobile
  const isTabletOrLarger = useMediaQuery(theme.breakpoints.up('sm')); // ≥ 600px → Tablet + Laptop

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
                  navigate(true);
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
                    navigate(true);
                    console.log("hello my name iskslk");
                  }}
                >
                  Login / Signup
                </Button>
                <IconButton onClick={handleClick} size="small">
                  <Avatar src="/profile.png" sx={{ width: 34, height: 34 }} />
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