import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Checkbox,
  Grid,
  Typography,
  TextField,
  Button,
  Chip,
  Avatar,
  Card,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormGroup,
  Select,
  MenuItem,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const commonSkills = [
  "AC Repair",
  "Fan Repair",
  "Plumbing",
  "Electrical",
  "Carpenter",
  "Home Cleaning",
  "Deep Cleaning",
  "Car Wash",
  "Bike Repair",
  "Painting",
  "Beauty & Salon",
  "Massage",
  "Makeup",
  "Refrigerator Repair",
  "Washing Machine Repair",
  "Pest Control",
  "Roof Waterproofing",
  "Furniture Repair",
];

const EditProfile = () => {
  const navigate = useNavigate();
  const locationState = useLocation().state;
  console.log(locationState);
  const { register, handleSubmit, control } = useForm({
    defaultValues: locationState?.profile || {},
  });
  const [skills, setSkills] = useState(locationState?.profile.skills || []);
  const [photo, setPhoto] = useState(locationState?.profile.photo || null);
  const [availability, setAvailability] = useState(
    locationState?.profile.availability || [],
  );

  const onSubmit = async (formData) => {
    console.log("hello owlrd")
   
    try {
      const token = localStorage.getItem("token");
       console.log(token)
      const profileData = {
        ...formData,
        skills,
        availability,
        photo: photo || null,
      };
      console.log(profileData)

     const response =  await axios.patch("http://localhost:5000/api/profiles", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(response.data.profile)

      alert("Profile Updated Successfully! 🎉");
      navigate("/my-profile");
    } catch (err) {
      alert(err.response?.data?.msg || "Error updating profile");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#5ba5ee",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
      }}
    >
      <Card
        elevation={6}
        sx={{
          width: { xs: "100%", md: 900 },
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          my: 6,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          align="center"
          sx={{ mb: 4 }}
        >
          Edit Your Worker Profile
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 4,
            }}
          >
            <Button
              component="label"
              sx={{
                p: 0,
                borderRadius: "50%",
              }}
            >
              <Avatar
                src={photo}
                sx={{
                  width: 140,
                  height: 140,
                  mx: "auto",
                  cursor: "pointer",
                  mb: 2,
                  border: "4px solid #1976d2",
                }}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setPhoto(URL.createObjectURL(e.target.files[0]))
                }
              />
            </Button>
            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
              sx={{ borderRadius: 50 }}
            >
              Upload New Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) =>
                  setPhoto(URL.createObjectURL(e.target.files[0]))
                }
              />
            </Button>
          </Box>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Full Name"
                {...register("name")}
                required
                variant="outlined"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone Number"
                {...register("phone")}
                required
                variant="outlined"
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
  <FormControl fullWidth>
    <FormLabel>Gender</FormLabel>

    <Controller
      name="gender"
      control={control}
      render={({ field }) => (
        <RadioGroup row {...field} value={field.value || ""}>
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      )}
    />

  </FormControl>
</Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                {...register("age")}
                variant="outlined"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="About Yourself"
                multiline
                rows={4}
                {...register("bio")}
                placeholder="Experienced technician with 5+ years in AC & electrical repairs..."
                variant="outlined"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  backgroundColor: "#e3f2fd",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "inline-block",
                }}
              >
                Add you Skills
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {commonSkills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onClick={() =>
                      setSkills((prev) =>
                        prev.includes(skill)
                          ? prev.filter((s) => s !== skill)
                          : [...prev, skill],
                      )
                    }
                    color={skills.includes(skill) ? "primary" : "default"}
                    variant={skills.includes(skill) ? "filled" : "outlined"}
                    clickable
                    sx={{ fontSize: "0.95rem", py: 1.5 }}
                  />
                ))}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Price (₹)"
                type="number"
                {...register("price")}
                variant="outlined"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <Select
                  {...register("pricingType")}
                  defaultValue={
                    locationState?.profile?.pricingType || "Select Pricing Type"
                  }
                >
                  <MenuItem value="Select Pricing Type">
                    Select Pricing Type
                  </MenuItem>
                  <MenuItem value="service">Per Service</MenuItem>
                  <MenuItem value="hour">Per Hour</MenuItem>
                  <MenuItem value="day">Per Day</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: "#1976d2",
                  backgroundColor: "#e3f2fd",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  display: "inline-block",
                }}
              >
                Available Days
              </Typography>
              <FormGroup row sx={{ flexWrap: "wrap", gap: 1 }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={availability.includes(day)}
                          onChange={() =>
                            setAvailability((prev) =>
                              prev.includes(day)
                                ? prev.filter((d) => d !== day)
                                : [...prev, day],
                            )
                          }
                        />
                      }
                      label={day}
                    />
                  ),
                )}
              </FormGroup>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Your Area / City"
                {...register("location")}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <LocationOnIcon sx={{ mr: 1, color: "action.active" }} />
                  ),
                }}
                placeholder="e.g. Noida Sector 62, Greater Noida, Delhi"
              />
            </Grid>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 2,
                fontSize: "1.2rem",
                mt: 4,
                background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                boxShadow: "0 8px 20px rgba(25,118,210,0.3)",
                "&:hover": {
                  background: "linear-gradient(90deg, #1565c0, #2196f3)",
                },
              }}
            >
              Update Profile
            </Button>
          </Grid>
        </form>
      </Card>
    </Box>
  );
};

export default EditProfile;
