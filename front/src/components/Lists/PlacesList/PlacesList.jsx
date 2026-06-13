import PlacesMapping from "./PlacesMapping";
import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_BACK;

function PlacesList() {
    const [serverError, setServerError] = useState(null);
    const [fetchedPlaces, setFetchedPlaces] = useState([]);

    // fetch all places

    const fetchAllPlaces = async () => {
        try {
            const response = await axios.get(`${API_URL}/places/placesList`);


            setServerError(null);
            setFetchedPlaces(response.data.data);
        } catch (error) {
            setServerError(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchAllPlaces();
    }, [])

    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] 2xl:w-[27%]  md:w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>


                {fetchedPlaces.map((place) => (
                    <PlacesMapping key={place.id} place={place} />
                ))}
            </section>
        </>
    );
}

export default PlacesList;