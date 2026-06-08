import argon2 from "argon2";
import { newVisitedPlaceM } from "../models/placesModel.js";

// post a new visited place

export const newVisitedPlaceC = async (req, res, next) => {
    try {
        const newPlace = req.body;

        if (!(newPlace.name || newPlace.place_type || newPlace.address || newPlace.rating || newPlace.is_free || newPlace.city_id)) return res.status(400).json({
            status: "fail",
            message: "not enough info"
        })

        const urlHash = await argon2.hash(newPlace.image_url);
        newPlace.image_url = urlHash;

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