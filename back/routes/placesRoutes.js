import express from "express"
import placeVal from "../validation/newPlace.js";
import validate from "../validation/validation.js";
import capitalLetter from "../middlewares/capitalLetter.js";
import paramVal from "../validation/placeSearchParamVal.js";
import upload from "../middlewares/imageUpload.js";
import fileSize from "../middlewares/fileSize.js";
import fileFilterError from "../middlewares/fileFilterError.js";
import imageHashing from "../middlewares/imageFIleHashing.js";
import { newVisitedPlaceC, getAllPlacesC, deleteSpecificPlaceC, updatePlacesDataC } from "../controllers/placesController.js";

const placesRoutes = express.Router();

// places routes


placesRoutes.post("/newPlace", upload.single("image"), fileFilterError, fileSize, imageHashing, placeVal, validate, capitalLetter, newVisitedPlaceC);
placesRoutes.get("/placesList", paramVal, validate, express.static("images"), getAllPlacesC);
placesRoutes.delete("/deletePlace/:id", deleteSpecificPlaceC);
placesRoutes.patch("/updatePlace/:id", upload.single("image"), fileFilterError, fileSize, placeVal, validate, capitalLetter, updatePlacesDataC);

export default placesRoutes;