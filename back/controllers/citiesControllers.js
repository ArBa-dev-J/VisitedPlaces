import { addNewCityM, doesCityExistM, getAllCitiesM, deleteCityM, getCityByIdM } from "../models/citiesModels.js";


// insert new city

export const addNewCityC = async (req, res, next) => {
    try {
        const newData = req.body;

        // simple data check if exists

        if (!newData.name) return res.status(400).json({
            status: "fail",
            message: "Missing city name",
        })

        // converts city name's first letter to upper case

        const firstUpperCase = newData.name.charAt(0).toLocaleUpperCase();
        const remainingLetters = newData.name.slice(1);
        const fullString = firstUpperCase + remainingLetters;

        // checks if city doesnt exist already

        const exists = await doesCityExistM(fullString)
        if (exists) return res.status(409).json({
            status: "fail",
            message: "This city already exists",
        });

        // post new city
        const post = await addNewCityM(fullString);

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

export const getAllCitiesC = async (req, res, next) => {
    try {
        const response = await getAllCitiesM();

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

export const deleteCityC = async (req, res, next) => {
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

