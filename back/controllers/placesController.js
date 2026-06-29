import { getCityByIdM } from "../models/citiesModels.js";
import { newVisitedPlaceM, findPlaceNameM, getAllPlacesM } from "../models/placesModel.js";

// post a new visited place

export const newVisitedPlaceC = async (req, res, next) => {
    try {
        const newPlaceData = req.body;

        const newPlaceDataN = delete newPlaceData.name;

        const newPlace = {
            ...newPlaceData,
            name: req.capitalizedName,
            filename: req?.file?.filename || "",
            // path: req?.file?.path || ""
        }

        if (!(newPlace.name || newPlace.place_type || newPlace.address || newPlace.rating || newPlace.is_free || newPlace.city_id)) return res.status(400).json({
            status: "fail",
            message: "not enough info"
        })

        // searches if place exists by name

        const existsP = await findPlaceNameM(newPlace);
        if (existsP) return res.status(409).json({
            status: "fail",
            message: "This place already exists",
        })


        // checks if city exist

        const id = newPlace.city_id;

        const exists = await getCityByIdM(id)

        if (exists == 0) return res.status(404).json({
            status: "fail",
            message: "This city doesn't exist",
        });


        const addANewPlace = await newVisitedPlaceM(newPlace);

        if (!addANewPlace) return res.status(424).json({
            status: "fail",
            message: "New place was not posted"
        });

        return res.status(201).json({
            status: "success",
            data: addANewPlace,
        });

    } catch (error) {
        res.status(500).json({
            status: "fail",
            message: `${error}`,
        })
    }
}

// get all places

export const getAllPlacesC = async (req, res, next) => {
    try {
        const { place_name } = req.query;
        const { city } = req.query;
        const { rating } = req.query;
        const { is_free } = req.query;
        const { type } = req.query;


        const response = await getAllPlacesM(place_name, city, rating, is_free, type);

        if (response == 0) return res.status(404).json({
            status: "fail",
            message: "No places found",
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