import { query } from "express-validator";

const paramVal = [
    query("place_name")
        .optional()
        .isString()
        .custom((body) => {
            if (/^\d+$/.test(body)) {
                throw new Error("Name cannot consist only of numbers");
            }

            return true;
        })
        .withMessage(Error.message),

    query("city")
        .optional()
        .isString()
        .custom((body) => {
            const arr = Object.values(body);

            if (arr.some(a => /\d+/.test(String(a)))) {
                throw new Error("Cannot write numbers");
            }

            return true;
        })
        .withMessage(Error.message),

    query("rating")
        .optional()
        .isNumeric()
        // check number between 0 and 5
        .custom((number) => {
            if (number >= 0 && number <= 5) return true;
            else throw new Error("Rating cannot be lower than 0 and higher than 5");
        })
        .withMessage(Error.message),

    query("is_free")
        .optional()
        .isBoolean()
        .withMessage("Must be a boolean"),

    query("type")
        .optional()
        .isString()
        // custom function to check if the place type is correct
        .custom((type) => {
            if (!(type == "castle" || type == "historical object" || type == "park" || type == "amusement_park" || type == "theme_park" || type == "museum")) {
                throw new Error("This category doesn't exist");
            }

            return true;
        })
        .withMessage(Error.message),
]

export default paramVal;