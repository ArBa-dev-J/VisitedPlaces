import { addNewCityM } from "../models/citiesModels.js";


// insert new city

export const addNewCityC = async (req, res, next) => {
    try {
        const newData = req.body;

        if (!newData.name) return res.status(400).json({
            status: "fail",
            message: "Missing city name",
        })

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