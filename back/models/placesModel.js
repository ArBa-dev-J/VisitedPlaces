import { sql } from "../dbConnection.js";

// post a new visited place

export const newVisitedPlaceM = async (newPlace) => {
    const { name, place_type, description, image_url, address, rating, is_free, city_id } = newPlace;

    const upload = await sql`
    INSERT INTO places (name, place_type, description, image_url, address, rating, is_free, city_id)
    VALUES (${name}, ${place_type}, ${description}, ${image_url}, ${address}, ${rating}, ${is_free}, ${city_id})
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