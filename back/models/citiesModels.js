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

// get city

export const doesCityExistM = async (newData) => {
    const { name } = newData;

    const exists = await sql`
    SELECT name FROM cities
    WHERE name = ${name};
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