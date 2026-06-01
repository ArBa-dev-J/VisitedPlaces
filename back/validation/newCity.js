import { body } from "express-validator";

const cityVal = [
    body("name")
        .isString()
        .custom((body) => {
            const arr = Object.values(body);
            
            if (arr.some(a => /\d+/.test(String(a)))) {
                throw new Error("Cannot write numbers");
            }

            return true;
        })
        .withMessage(Error.message)
];

export default cityVal;

