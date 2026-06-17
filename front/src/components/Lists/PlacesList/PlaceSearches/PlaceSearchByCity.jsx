import { useState, useEffect } from "react";
import axios from "axios"

function PlacesSearchByCity({ cityNameChange }) {
    const [serverError, setServerError] = useState(null);
    const [cities, setCities] = useState([]);

    const API_URL = import.meta.env.VITE_BACK;

    // get all cities
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${API_URL}/cities/cityList`);


            setServerError(null);
            setCities(response.data.data);
        } catch (error) {
            console.log(error);

            setServerError(error.response.data.message || error.response.data.error[0].msg);

        }
    }

    useEffect(() => {
        fetchCities();
    }, [])

    return (
        <>
            <section>
                <p className="text-white text-center block pb-2">Search by city</p>
                <select className="bg-sky-600 rounded-[25px] p-2">
                    <option onClick={() => cityNameChange(null)}>Select the city </option>
                    {cities.map(city => (
                        <option onClick={() => cityNameChange(city.name)} key={city.id}>{city.name}</option>
                    ))}
                </select>
            </section>
        </>
    );
}

export default PlacesSearchByCity;