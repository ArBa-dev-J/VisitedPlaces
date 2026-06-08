import express from "express"
import placeVal from "../validation/newPlace.js";
import validate from "../validation/validation.js";
import { newVisitedPlaceC } from "../controllers/placesController.js"; 

const placesRoutes = express.Router();

// places routes


placesRoutes.post("/newPlace", placeVal, validate, newVisitedPlaceC);

export default placesRoutes;