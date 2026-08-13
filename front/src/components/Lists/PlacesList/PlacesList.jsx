import PlacesMapping from "./PlacesMapping";
import axios from "axios";
import PlacesSearchChange from "./PlaceSearches/PlacesSearchChange";
import PlacesSearch from "./PlaceSearches/PlacesSearch"
import PlacesSearchByCity from "./PlaceSearches/PlaceSearchByCity";
import PlacesSearchByPrice from "./PlaceSearches/PlaceSearchByPrice";
import PlacesSearchByRating from "./PlaceSearches/PlaceSearchByRating";
import PlacesSearchByType from "./PlaceSearches/PlaceSearchByType";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

function PlacesList() {
    const [serverError, setServerError] = useState(null);

    // for place pagination
    const [currentPage, setCurrentPage] = useState(0);

    const pageSize = 10;

    const [fetchedPlaces, setFetchedPlaces] = useState([]);
    const [showPlaceName, setShowPlaceName] = useState(true);
    const [showCityName, setShowCityName] = useState();
    const [showPlaceRating, setShowPlaceRating] = useState();
    const [showIsFree, setShowIsFree] = useState();
    const [showPlaceType, setShowPlaceType] = useState();

    const API_URL = import.meta.env.VITE_BACK;

    // set search bars to show or hide
    const toShowOrToHide = (parameter) => {

        switch (parameter) {
            case "placeName":
                setShowPlaceName(true);
                setShowCityName(false);
                setShowPlaceRating(false);
                setShowIsFree(false);
                setShowPlaceType(false);
                return;
            case "cityName":
                setShowPlaceName(false);
                setShowCityName(true);
                setShowPlaceRating(false);
                setShowIsFree(false);
                setShowPlaceType(false);
                return;
            case "placeRating":
                setShowPlaceName(false);
                setShowCityName(false);
                setShowPlaceRating(true);
                setShowIsFree(false);
                setShowPlaceType(false);
                return;
            case "isFree":
                setShowPlaceName(false);
                setShowCityName(false);
                setShowPlaceRating(false);
                setShowIsFree(true);
                setShowPlaceType(false);
                return;
            case "placeType":
                setShowPlaceName(false);
                setShowCityName(false);
                setShowPlaceRating(false);
                setShowIsFree(false);
                setShowPlaceType(true);
                return;
            default:
                setShowPlaceName(true);
                setShowCityName(false);
                setShowPlaceRating(false);
                setShowIsFree(false);
                setShowPlaceType(false);
                return;

        }
    }


    // search by name
    const [placeName, setPlaceName] = useState();


    const nameChange = (e) => {
        setPlaceName(e.target.value);
    };

    // search by city name

    const [cityName, setCityName] = useState();

    const cityNameChange = (value) => {
        setCityName(value);
    };

    // search by rating

    const [rating, setRating] = useState();

    const ratingChange = (e) => {
        const value = e.target.value;

        if (value === "") {
            setRating(null);
        } else {
            setRating(Number(value));
        }
    };

    // search by price

    const [isFree, setIsFree] = useState(null);


    const setPlacePrice = (value) => {
        if (value === true) {
            setIsFree(true);
        } else if (value === false) {
            setIsFree(false);
        } else setIsFree(null);
    }

    // search by type

    const [type, setType] = useState();

    const setTypeF = (value) => {
        setType(value);
    }

    // fetch all places
    const fetchAllPlaces = async () => {

        try {
            const response = await axios.get(`${API_URL}/places/placesList`, {
                params: {
                    place_name: placeName,
                    city: cityName,
                    rating: rating,
                    is_free: isFree,
                    type: type,
                }
            });


            setServerError(null);
            setFetchedPlaces(response.data.data);
        } catch (error) {
            // console.log(error);
            setServerError(error.response.data.message || error.response.data.error[0].msg);
        }
    }


    // hide search bat if there are no cities in the list
    const hideSearchBar = () => {
        const places = fetchedPlaces.length;
        let show;
        if (places > 0) {
            return show = true;
        } else return show = false;
    }

    //--------------------------------
    useEffect(() => {
        fetchAllPlaces();
    }, [placeName, cityName, rating, isFree, type])

    //logic for pagination

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * pageSize;

    const paginatedItems = fetchedPlaces.slice(offset, offset + pageSize);
    console.log(ReactPaginate);

    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] 2xl:w-[27%]  md:w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>

                {hideSearchBar() ? <div className="flex justify-between items-baseline-last">
                    {showPlaceName ? <PlacesSearch nameChange={nameChange} /> : null}
                    {showCityName ? <PlacesSearchByCity cityNameChange={cityNameChange} /> : null}
                    {showPlaceRating ? <PlacesSearchByRating ratingChange={ratingChange} /> : null}
                    {showIsFree ? <PlacesSearchByPrice setPlacePrice={setPlacePrice} /> : null}
                    {showPlaceType ? <PlacesSearchByType setTypeF={setTypeF} /> : null}

                    <PlacesSearchChange toShowOrToHide={toShowOrToHide} />
                </div> : null}

                {paginatedItems.map((place) => (
                    <PlacesMapping setFetchedPlaces={setFetchedPlaces} key={place.id} place={place} fetchAllPlaces={fetchAllPlaces} />
                ))}

                
                  <ReactPaginate.default
                        previousLabel={"Previous"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={Math.ceil(fetchedPlaces.length / pageSize)}
                        marginPagesDisplayed={5}
                        pageRangeDisplayed={2}
                        onPageChange={handlePageChange}
                        containerClassName={
                            "flex justify-center gap-3 items-center font-poppins text-xs"
                        }
                        activeClassName={
                            "bg-transparent border-b-4 border-gray-800 text-white rounded-lg font-medium py-2"
                        }
                        pageLinkClassName={
                            "bg-transparent text-gray-800 border border-gray-800 rounded-lg font-medium px-3 py-2"
                        }
                        previousLinkClassName={
                            "bg-gray-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                        }
                        nextLinkClassName={
                            "bg-gray-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                        }
                        disabledClassName={"pointer-events-none opacity-50"}
                    />
                
            </section>
        </>
    );
}

export default PlacesList;