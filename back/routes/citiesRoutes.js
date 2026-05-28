import express from "express"
import { addNewCityC } from "../controllers/citiesControllers.js";


const citiesRoutes = express.Router();

// cities routes

citiesRoutes.post("/newCity", addNewCityC);


export default citiesRoutes;