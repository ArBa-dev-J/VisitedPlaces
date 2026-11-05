import fs, { unlink } from "fs";
import { getCityByIdM } from "../models/citiesModels.js";
import {
  newVisitedPlaceM,
  findPlaceNameM,
  getAllPlacesM,
  findPlaceByIdM,
  deleteUsersPatientM,
  updatePlacesDataM,
  findPlaceNameExceptIdM,
  addNewImageM,
  findImageHashM,
  deleteImagesM,
} from "../models/placesModel.js";
import getImagesFromPlaces from "../utils/getImagesFromplace.js";
import fromArrObjsToSinglObj from "../utils/fromArrObjsToSinglObj.js";
import { log } from "console";

// post a new visited place

export const newVisitedPlaceC = async (req, res, next) => {
  try {
    const newPlaceData = req.body;

    delete newPlaceData.name;

    const newPlace = {
      ...newPlaceData,
      name: req.capitalizedName,
      filename: req.filename || "",
      fileHash: req.hashedImage || "",
    };

    if (
      !newPlace.name ||
      !newPlace.place_type ||
      !newPlace.address ||
      !newPlace.rating ||
      !newPlace.is_free ||
      !newPlace.city_id
    ) {
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }
      }

      return res.status(400).json({
        status: "fail",
        message: "not enough info",
      });
    }

    // searches if place exists by name

    const existsP = await findPlaceNameM(newPlace);

    if (existsP) {
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }
      }

      return res.status(409).json({
        status: "fail",
        message: "This place already exists",
      });
    }

    // checks if city exist

    const id = newPlace.city_id;

    const exists = await getCityByIdM(id);

    if (exists.length === 0) {
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }
      }

      return res.status(404).json({
        status: "fail",
        message: "This city doesn't exist",
      });
    }

    const addANewPlace = await newVisitedPlaceM(newPlace);
    const newImage = await addNewImageM(addANewPlace, newPlace);

    if (!addANewPlace)
      return res.status(424).json({
        status: "fail",
        message: "New place was not posted",
      });

    return res.status(201).json({
      status: "success",
      data: addANewPlace,
      imageData: newImage,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `${error}`,
    });
  }
};

// get all places

export const getAllPlacesC = async (req, res, next) => {
  try {
    const { place_name } = req.query;
    const { city } = req.query;
    const { rating } = req.query;
    const { is_free } = req.query;
    const { type } = req.query;

    const response = await getAllPlacesM(
      place_name,
      city,
      rating,
      is_free,
      type,
    );

    if (response == 0)
      return res.status(404).json({
        status: "fail",
        message: "No places found",
      });

    // change order to latest on top
    const orderdArray = () => {
      return response.sort((a, b) => b.id - a.id);
    };

    return res.status(200).json({
      status: "success",
      data: orderdArray(),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `${error}`,
    });
  }
};

//delete a a specific place

export const deleteSpecificPlaceC = async (req, res, next) => {
  try {
    const { id } = req.params;

    const place = await findPlaceByIdM(id);
    // console.log(place.images);

    if (!place) {
      return res.status(404).json({
        status: "fail",
        message: "The place was not found",
      });
    }

    await deleteUsersPatientM(id);

    if (place.images.length > 0) {
      for (let i = 0; i < place.images.length; i++) {
        fs.unlink(place.images[i].image_url, (err) => {
          if (err) console.error(err);
        });
      }
    }

    res.status(200).json({
      status: "success",
      message: "The place was successfullu deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `${error}`,
    });
  }
};

// places new data patch

export const updatePlacesDataC = async (req, res, next) => {
  try {
    const placeId = req.params;

    const newPlaceData = req.body;

    delete newPlaceData.name;

    const newPlace = {
      ...newPlaceData,
      name: req.capitalizedName,
      filename: req?.filename || "",
      fileHash: req?.hashedImage || "",
    };

    if (
      !newPlace.name ||
      !newPlace.place_type ||
      !newPlace.address ||
      !newPlace.rating ||
      !newPlace.is_free ||
      !newPlace.city_id
    )
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }

        return res.status(400).json({
          status: "fail",
          message: "not enough info",
        });
      }

    const id = newPlace.city_id;

    const exists = await getCityByIdM(id);

    if (exists.length === 0) {
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }
      }

      return res.status(404).json({
        status: "fail",
        message: "This city doesn't exist",
      });
    }

    const place = await findPlaceByIdM(placeId);

    if (!place) {
      if (req.files.length > 0) {
        for (let i = 0; i < req.files.length; i++) {
          fs.unlink(req.files[i].path, (err) => {
            if (err) console.error(err);
          });
        }
      }

      return res.status(404).json({
        status: "fail",
        message: "This place does not exist",
      });
    }

    // image conditional deletion
    const existingImages = await getImagesFromPlaces(place);
    const imageFetchedHash = await findImageHashM(newPlace, placeId);

    // Flatten the nested database results
    const keepHashes = imageFetchedHash.flat().map((image) => image.file_hash);

    // Hashes of all existing images
    const existingHashes = existingImages.map((image) => image.file_hash);

    // Images to delete
    let imagesToDelete = [];

    if (existingImages.length > 0) {
      if (req.files.length === 0) {
        imagesToDelete = existingImages;
      } else {
        imagesToDelete = existingImages.filter((image) =>
          keepHashes.includes(image.file_hash),
        );
      }
    }

    if (imagesToDelete.length > 0) {
      for (const image of imagesToDelete) {
        await deleteImagesM(image.image_id);

        await fs.unlink(image.image_url, (err) => {
          if (err) console.error(err);
        });
      }
    }

    let newFiles = {
      filename: new Array(),
      fileHash: new Array(),
    };

    for (let i = 0; i < req.filename.length; i++) {
      if (existingHashes.includes(req.hashedImage[i])) {
        await fs.unlink(req.filename[i]);
      } else {
        newFiles.filename.push(req.filename[i]);
        newFiles.fileHash.push(req.hashedImage[i]);
      }
    }
  
   

    // const imageObj = fromArrObjsToSinglObj(newFiles);

    const newImage = await addNewImageM(newFiles, newPlace);

    const updatedPlace = await updatePlacesDataM(newPlace, placeId);

    if (!updatedPlace)
      return res.status(424).json({
        status: "fail",
        message: "Failed to update",
      });

    res.status(201).json({
      status: "success",
      data: updatedPlace,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: `${error}`,
    });
  }
};
