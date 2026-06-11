
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
        const response = await getAllPlacesM();

        if (response == 0) return res.status(404).json({
            status: "fail",
            message: "No places found",
        });


        // unhash img url

        const unHash = await argon2.verify(response.image_url, response.image_url);
        response.image_url = unHash;


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