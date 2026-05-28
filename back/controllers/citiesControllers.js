import { addNewCityM, doesCityExistM } from "../models/citiesModels.js";


// insert new city

export const addNewCityC = async (req, res, next) => {
    try {
        const newData = req.body;

        // simple data check if exists

        if (!newData.name) return res.status(400).json({
            status: "fail",
            message: "Missing city name",
        })

        // checks if city doesnt exist already

        const exists = await doesCityExistM(newData)
        if (exists) return res.status(409).json({
            status: "fail",
            message: "This city already exists",
        })

        // post new city
        const post = await addNewCityM(newData);

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