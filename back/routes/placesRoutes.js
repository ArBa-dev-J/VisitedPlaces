import express from "express"
import placeVal from "../validation/newPlace.js";
import validate from "../validation/validation.js";
import capitalLetter from "../middlewares/capitalLetter.js";
import paramVal from "../validation/placeSearchParamVal.js";
import { newVisitedPlaceC, getAllPlacesC } from "../controllers/placesController.js"; 

const placesRoutes = express.Router();

// places routes


placesRoutes.post("/newPlace", placeVal, validate,  capitalLetter, newVisitedPlaceC);
placesRoutes.get("/placesList", paramVal, validate, getAllPlacesC);

export default placesRoutes;