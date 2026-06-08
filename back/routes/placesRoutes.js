import express from "express"
import { newVisitedPlaceC } from "../controllers/placesController.js"; 

const placesRoutes = express.Router();

// places routes


placesRoutes.post("/newPlace", newVisitedPlaceC);

export default placesRoutes;