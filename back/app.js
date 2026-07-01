import express from "express";
import cors from "cors";
// routes imports
import citiesRoutes from "./routes/citiesRoutes.js";
import placesRoutes from "./routes/placesRoutes.js";

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: CLIENT_URL,
  })
);

// Routes
app.use("/api/v1/cities", citiesRoutes);
app.use("/api/v1/places", placesRoutes);

// for rendering images in the front 
app.use("/api/v1/images", express.static("images"));

//for testing server status
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});


export default app;
