import { sql } from "../dbConnection.js";

// post a new visited place

export const newVisitedPlaceM = async (newPlace) => {
    const { name, place_type, description, image_url, address, rating, is_free, city_id } = newPlace;

    const upload = await sql`
    INSERT INTO places (name, place_type, description, image_url, address, rating, is_free, city_id)
    VALUES (${name , place_type, description, image_url, address, rating, is_free, city_id})
    RETURNIG *;
    `;
    return upload[0];
}