import PlacesMapping from "./PlacesMapping";
import axios from "axios";
import PlacesSearchChange from "./PlaceSearches/PlacesSearchChange";
import PlacesSearch from "./PlaceSearches/PlacesSearch"
import PlacesSearchByCity from "./PlaceSearches/PlaceSearchByCity";
import PlacesSearchByPrice from "./PlaceSearches/PlaceSearchByPrice";
import PlacesSearchByRating from "./PlaceSearches/PlaceSearchByRating";
import PlacesSearchByType from "./PlaceSearches/PlaceSearchByType";
import { useState, useEffect } from "react";

function PlacesList() {
    const [serverError, setServerError] = useState(null);
    const [fetchedPlaces, setFetchedPlaces] = useState([]);
    const [showPlaceName, setShowPlaceName] = useState();
    const [showPCityName, setShowCityName] = useState();
    const [showPlaceRating, setShowPlaceRating] = useState();
    const [showIsFree, setShowIsFree] = useState();
    const [showPlaceType, setShowPlaceType] = useState();
    const API_URL = import.meta.env.VITE_BACK;

    // search by name
    const [placeName, setPlaceName] = useState();


    const nameChange = (e) => {
        setPlaceName(e.target.value);
    };

    // search by city name

    const [cityName, setCityName] = useState();


    const cityNameChange = (e) => {
        setcCityName(e.target.value);
    };

    // fetch all places
    const fetchAllPlaces = async () => {

        try {
            const response = await axios.get(`${API_URL}/places/placesList`, {
                params: {
                    place_name: placeName,
                    city: cityName,
                    // rating: rating,
                    // is_free: isFree,
                    // type: type,
                }
            });


            setServerError(null);
            setFetchedPlaces(response.data.data);
        } catch (error) {
            // console.log(error);
            setServerError(error.response.data.message || error.response.data.error[0].msg);
        }
    }


    //--------------------------------
    useEffect(() => {
        fetchAllPlaces();
    }, [placeName, cityName])

    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] 2xl:w-[27%]  md:w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>

                <div className="flex justify-center items-center">
                    {showPlaceName ? <PlacesSearch nameChange={nameChange} /> : null}
                    {showPCityName ? <PlacesSearchByCity cityNameChange={cityNameChange} /> : null}

                    <PlacesSearchChange />
                </div>

                {fetchedPlaces.map((place) => (
                    <PlacesMapping key={place.id} place={place} />
                ))}
            </section>
        </>
    );
}

export default PlacesList;