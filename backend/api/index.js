import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

// ❌ YE REMOVE KARO
// app.listen(5000);

export default app;