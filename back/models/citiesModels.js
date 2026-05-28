import { sql } from "../dbConnection.js";

// add new city

export const addNewCityM = async (newData) => {
    const { name } = newData;

    const newCity = await sql`
    INSERT INTO cities (name)
    VALUES (${name})
    RETURNING *;
    `

    return newCity;
}

