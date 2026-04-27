// config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";

console.log(process.env.CLOUD_NAME, "raj chalrisdlf");
console.log(process.env.API_KEY);

cloudinary.config({
  // cloud_name: process.env.CLOUD_NAME,
  // api_key: process.env.API_KEY,
  // api_secret: process.env.API_SECRET,
    cloud_name: "docmhl3ep",
  api_key: 784587761923821,
  api_secret: "ICRRUy3Ff9tK7o2Lfd6CdBeyV5c",
});

export default cloudinary;