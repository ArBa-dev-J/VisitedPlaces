import { sql } from "../dbConnection.js";

// add new city

export const addNewCityM = async (fullString) => {
    
    const newCity = await sql`
    INSERT INTO cities (name)
    VALUES (${fullString})
    RETURNING *;
    `

    return newCity;
}

// get city

export const doesCityExistM = async (fullString) => {
    
    const exists = await sql`
    SELECT name FROM cities
    WHERE name = ${fullString};
    `;
    
    return exists[0];
}

// get all cities

export const getAllCitiesM = async () => {
    const allCities = await sql`
    SELECT * FROM cities;
    `;

    return allCities;
}