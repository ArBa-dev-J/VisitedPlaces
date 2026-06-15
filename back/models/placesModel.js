import { sql } from "../dbConnection.js";

// post a new visited place

export const newVisitedPlaceM = async (newPlace) => {
    const { name, place_type, description, image_url, address, rating, is_free, city_id } = newPlace;

    const isFreeBool = is_free == "true";

    const upload = await sql`
    INSERT INTO places (name, place_type, description, image_url, address, rating, is_free, city_id)
    VALUES (${name}, ${place_type}, ${description}, ${image_url}, ${address}, ${rating}, ${isFreeBool}, ${city_id})
    RETURNING *;
    `;



    return upload[0];
}

// find place by name

export const findPlaceNameM = async (newPlace) => {
    const exists = await sql`
    SELECT name FROM places
    WHERE name = ${newPlace.name};
    `;

    return exists[0];
}

// get all places

export const getAllPlacesM = async (place_name, city, rating, is_free, type) => {

    const conditions = [];

    if (place_name) {
        conditions.push(sql`places.name ILIKE ${'%' + place_name + '%'}`);
    }

    if (city) {
        conditions.push(sql`cities.name ILIKE ${'%' + city + '%'}`);
    }

    if (rating) {
        conditions.push(sql`places.rating = ${rating}`);
    }

    if (is_free) {  
        conditions.push(sql`places.is_free = ${is_free == "true"}`);
    }

    if (type) {
        conditions.push(sql`places.place_type = ${type}`);
    }

    let whereClause = sql``;

    if (conditions.length > 0) {
        whereClause = sql`WHERE ${conditions[0]}`;

        for (let i = 1; i < conditions.length; i++) {
            whereClause = sql`${whereClause} AND ${conditions[i]}`;
        }
    }

    const allPlaces = await sql`
    SELECT places.*, places.name AS place_name, cities.name FROM places
    JOIN cities
    ON places.city_id = cities.id
    ${whereClause}

    `;

    return allPlaces;
}