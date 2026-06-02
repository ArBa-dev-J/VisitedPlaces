import express from "express"
import { addNewCityC, getAllCitiesC, deleteCityC, updateCityNameC } from "../controllers/citiesControllers.js";
import validate from "../validation/validation.js";
import cityVal from "../validation/newCity.js";


const citiesRoutes = express.Router();

// cities routes

citiesRoutes.post("/newCity", cityVal, validate, addNewCityC);
citiesRoutes.get("/cityList", getAllCitiesC);
// city id
citiesRoutes.delete("/:id/deleteCity", deleteCityC)
// city id
citiesRoutes.patch("/:id/updateCity", cityVal, validate, updateCityNameC);


export default citiesRoutes;