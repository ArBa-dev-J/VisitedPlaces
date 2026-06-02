import { sql } from "../dbConnection.js";

// add new city

export const addNewCityM = async (name) => {

    const newCity = await sql`
    INSERT INTO cities (name)
    VALUES (${name})
    RETURNING *;
    `

    return newCity;
}

// get city

export const doesCityExistM = async (name) => {

    const exists = await sql`
    SELECT name FROM cities
    WHERE name = ${name};
    `;

    return exists[0];
}

// get all cities

export const getAllCitiesM = async (name) => {
    const allCities = await sql`
    SELECT * FROM cities
    ${name ? sql`WHERE name ILIKE ${`%` + name + `%`}` : sql``}
    `;

    return allCities;
}

//get city by id

export const getCityByIdM = async (id) => {
    const cityById = sql`
    SELECT id FROM cities
    WHERE id = ${id};
    `;
    return cityById;
}

//delete city

export const deleteCityM = async (id) => {
    return sql`
    DELETE FROM cities
    WHERE id = ${id}
    `;
}

// update city name

export const updateCityNameM = async (newName, id) => {

    const cityList = await sql`
    UPDATE cities
    SET name = ${newName}
    WHERE id = ${Number(id)}
    RETURNING *;
    `;

    return cityList[0];
}
