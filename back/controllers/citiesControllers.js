import { addNewCityM, doesCityExistM, getAllCitiesM, deleteCityM, getCityByIdM, updateCityNameM } from "../models/citiesModels.js";


// insert new city

export const addNewCityC = async (req, res, ) => {
    try {
       const name = req.capitalizedName;

        // simple data check if exists

        if (!name) return res.status(400).json({
            status: "fail",
            message: "Missing city name",
        })

        // checks if city doesnt exist already

        const exists = await doesCityExistM(name)
        if (exists) return res.status(409).json({
            status: "fail",
            message: "This city already exists",
        });

        // post new city
        const post = await addNewCityM(name);

        res.status(201).json({
            status: "success",
            data: post,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}

// get all cities

export const getAllCitiesC = async (req, res) => {
    try {
        // ?name="cityName"
        const { name } = req.query;

        const response = await getAllCitiesM(name);

        if (response == 0) return res.status(404).json({
            status: "fail",
            message: "There are no cities in the list"
        });

        // change order to latest on top

        const orderdArray = () => {
            return response.sort((a, b) => b.id - a.id);
        }


        return res.status(200).json({
            status: "success",
            data: orderdArray()
        });
    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}

// delete city 

export const deleteCityC = async (req, res) => {
    try {
        // city id
        const { id } = req.params;

        const response = await getCityByIdM(id);

        if (response == 0) return res.status(404).json({
            status: "fail",
            message: "City not found"
        })

        await deleteCityM(id);

        return res.status(200).json({
            statu: "success",
            message: "data was successfully deleted",
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}

// update city name

export const updateCityNameC = async (req, res) => {
    try {
        const { id } = req.params;
        const newName = req.body;

        // check if the city exists 
        const cityExists = await getCityByIdM(id);

        if (cityExists == 0) return res.status(404).json({
            status: "fail",
            message: "City not found"
        })

        // simple data check if exists

        if (!newName.name) return res.status(400).json({
            status: "fail",
            message: "Missing city name",
        })


        const nameUpdated = await updateCityNameM(newName, id);

        return res.status(201).json({
            status: "success",
            data: nameUpdated,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}