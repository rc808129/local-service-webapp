import { AppBar, Toolbar, Typography, Stack, TextField, Button, Box, IconButton, Avatar } from "@mui/material";

function Navbar({ searchSkill, setSearchSkill, handleSearch, navigate, handleClick }) {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#f5f5f5", color: "black" }} elevation={5}>
      <Toolbar  sx={{
    px: { xs: 1, sm: 2, md: 4 },
    gap: 4
  }}>
        <Typography variant="h6" sx={{ flex: 1 }}>
          Dashboard - Welcome
        </Typography>

        <Stack direction="row" spacing={1} sx={{ width: "100%", maxWidth: 600, margin: "auto" }}>
          <TextField
            fullWidth
            placeholder="Search electrician, plumber..."
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
             sx={{
      "& .MuiInputBase-root": {
        borderRadius: "25px",   
      },
      "& input::placeholder": {
        fontSize: "18px",       
      },
      "& .MuiInputBase-input": {
      fontSize: "18px"
    }
    }}
          />
          <Button variant="contained" onClick={handleSearch}
          sx={{
            borderRadius: "25px",
            px: 3
          }}
          >
            Search
          </Button>
        </Stack>

        <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", gap: 4 }}>
          <Button 
          variant="outlined" 
          className="auth-button"
          onClick={() => {navigate(true)
            console.log("hello my name iskslk")}
          }>
            Login / Signup
          </Button>

          <IconButton onClick={handleClick}>
            <Avatar src="/profile.png" />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;