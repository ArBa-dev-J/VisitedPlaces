import PlacesMapping from "./PlacesMapping";
import axios from "axios";
import PlacesSearch from "./PlacesSearch"
import { useState, useEffect } from "react";

function PlacesList() {
    const [serverError, setServerError] = useState(null);
    const [fetchedPlaces, setFetchedPlaces] = useState([]);
    const API_URL = import.meta.env.VITE_BACK;

    // search by name
    const [placeName, setPlaceName] = useState();


    const nameChange = (e) => {
        setPlaceName(e.target.value);
    };

    // fetch all places
    const fetchAllPlaces = async () => {

        try {
            const response = await axios.get(`${API_URL}/places/placesList`, {
                params: {
                    place_name: placeName,
                }
            });


            setServerError(null);
            setFetchedPlaces(response.data.data);
        } catch (error) {
            setServerError(error.response.data.message || error.response.data.error[0].msg);
        }
    }


    //--------------------------------
    useEffect(() => {
        fetchAllPlaces();
    }, [placeName])

    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] 2xl:w-[27%]  md:w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>

                <PlacesSearch nameChange={nameChange} />

                {fetchedPlaces.map((place) => (
                    <PlacesMapping key={place.id} place={place} />
                ))}
            </section>
        </>
    );
}

export default PlacesList;