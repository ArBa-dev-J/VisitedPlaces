import { body } from "express-validator";

const placeVal = [
    body("name")
        .isString()
        .custom((body) => {
            const arr = Object.values(body);

            if (arr.some(a => /\d+/.test(String(a)))) {
                throw new Error("Cannot write numbers");
            }

            return true;
        })
        .withMessage(Error.message),

    body("place_type")
        .isString()
        // custom function to check if the place type is correct
        .custom((type) => {
            if (!(type == "castle" || type == "historical object" || type == "park" || type == "amusement_park" || type == "theme_park" || type == "museum")) {
                throw new Error("This category doesn't exist");
            }

            return true;
        })
        .withMessage(Error.message),

    body("description")
        .isString()
        .isLength({ max: 900 })
        .withMessage("Description is too long"),

    body("image_url")
        .isString()
        .isURL()
        .withMessage("Must be an url"),

    body("address")
        .isString()
        .isLength({ min: 2, max: 900 })
        .withMessage("Address is too short or too long"),

    body("rating")
        .isNumeric()
        // check number between 0 and 5
        .custom((number) => {
           if (number >= 0 && number <= 5) return true;
           else throw new Error("Rating cannot be lower than 0 and higher than 5");
        })
        .withMessage(Error.message),

        body("is_free")
        .isBoolean()
        .withMessage("Must be a boolean"),

        body("city_id")
        .isNumeric()
        .withMessage("Must be a number")


]

export default placeVal;