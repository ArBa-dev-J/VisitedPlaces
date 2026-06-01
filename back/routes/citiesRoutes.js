import express from "express"
import { addNewCityC, getAllCitiesC } from "../controllers/citiesControllers.js";
import validate from "../validation/validation.js";
import cityVal from "../validation/newCity.js";


const citiesRoutes = express.Router();

// cities routes

citiesRoutes.post("/newCity", cityVal, validate, addNewCityC);
citiesRoutes.get("/cityList", getAllCitiesC);


export default citiesRoutes;