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
    const allPlaces = await sql`
    SELECT places.*, places.name AS place_name, cities.name FROM places
    JOIN cities
    ON places.city_id = cities.id

    -- FILTERING LOGIC

    ${place_name ? sql`WHERE places.name ILIKE ${`%` + place_name + `%`}` : sql``}
    ${city ? sql`${place_name ? sql`AND cities.name ILIKE  ${`%` + city + `%`}` : sql`WHERE cities.name ILIKE  ${`%` + city + `%`}`}` : sql``}
    
    `;

    return allPlaces;
}