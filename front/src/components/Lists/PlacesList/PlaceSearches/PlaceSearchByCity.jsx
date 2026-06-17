import { useState, useEffect } from "react";
import axios from "axios"

function PlacesSearchByCity({ cityNameChange }) {
    const [serverError, setServerError] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
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

    // Load saved city on mount
    useEffect(() => {
        const savedCity = localStorage.getItem("selectedCity");

        if (savedCity) {
            setSelectedCity(savedCity);
            cityNameChange(savedCity);
        }
    }, []);

    const handleCityChange = (e) => {
        const city = e.target.value;

        setSelectedCity(city);
        cityNameChange(city || null);

        if (city) {
            localStorage.setItem("selectedCity", city);
        } else {
            localStorage.removeItem("selectedCity");
        }
    };

    return (
        <>
            <section>
                <p className="text-white text-center block pb-2">
                    Search by city
                </p>

                <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="bg-sky-600 rounded-[25px] p-2"
                >
                    <option value="">Select the city</option>

                    {cities.map((city) => (
                        <option
                            key={city.id}
                            value={city.name}
                        >
                            {city.name}
                        </option>
                    ))}
                </select>
            </section>
        </>
    );
}

export default PlacesSearchByCity;