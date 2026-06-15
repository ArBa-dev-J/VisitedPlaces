import express from "express"
import { addNewCityC, getAllCitiesC, deleteCityC, updateCityNameC } from "../controllers/citiesControllers.js";
import capitalLetter from "../middlewares/capitalLetter.js";
import citySearchVal from "../validation/citySearchVal.js";
import validate from "../validation/validation.js";
import cityVal from "../validation/newCity.js";


const citiesRoutes = express.Router();

// cities routes

citiesRoutes.post("/newCity", cityVal, validate, capitalLetter, addNewCityC);
citiesRoutes.get("/cityList", citySearchVal, validate, getAllCitiesC);
// city id
citiesRoutes.delete("/:id/deleteCity",  deleteCityC)
// city id
citiesRoutes.patch("/:id/updateCity", cityVal, validate, capitalLetter, updateCityNameC);


export default citiesRoutes;