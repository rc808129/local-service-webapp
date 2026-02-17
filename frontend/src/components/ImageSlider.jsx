import { useEffect, useState } from "react";
import { Box } from "@mui/material";

const images = [
"https://static.homeguide.com/assets/images/content/homeguide-plumber-sink-repair-cost-plumber-fixing-kitchen-sink-pipe.jpg",
  "https://www.airflowdesigns.com/wp-content/uploads/2024/04/blog-ac-repair-or-replace.webp",
  "https://miro.medium.com/1*JktzC9GrA_l4yz0cCy8a5Q.jpeg",
  "https://thumbs.dreamstime.com/b/skilled-plumber-focused-fixing-pipe-under-sink-residential-bathroom-various-tools-neatly-arranged-him-389424394.jpg",
  "https://www.spencercleaningks.com/wp-content/uploads/2018/08/blog-1.png"
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box
      sx={{
         width: "100%",
    maxWidth: "1200px",
    height: { xs: "250px", sm: "350px", md: "450px" }, // responsive height
    mx: "auto",
    overflow: "hidden",
    position: "relative",
    borderRadius: 2
      }}
    >
      {/* SLIDER WRAPPER */}
      <Box
        sx={{
          display: "flex",
          transform: `translateX(-${index * 100}%)`,
          transition: "transform 0.6s ease-in-out",
          height: "100%"
        }}
      >
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={img}
            sx={{
              flex: "0 0 100%",
              width : "100%",
              height: "100%", 
              // objectFit : "cover",
              // objectPosition : "center",
              // objectFit: "cover"
              objectFit : "cover"
            }}
          />
        ))}
      </Box>

      {/* DOTS */}
      <Box
        sx={{
          position: "absolute",
          bottom: 15,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1
        }}
      >
        {images.map((_, i) => (
          <Box
            key={i}
            onClick={() => setIndex(i)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              cursor: "pointer",
              bgcolor: i === index ? "red" : "white",
              opacity: i === index ? 1 : 0.6
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ImageSlider;
