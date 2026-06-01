import axios from "axios";
import CityArrayMapping from "./CityArrayMapping";
import { useEffect, useState, } from "react";

function CityList() {

    const API_URL = import.meta.env.VITE_BACK;

    const [serverError, setServerError] = useState(null);


    // get all cities
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${API_URL}/cities/cityList`);
            console.log(response);
        } catch (error) {
            setServerError(error);
        }
    }

    useEffect(() => {
        fetchCities();
    }, [])

    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>
                <CityArrayMapping />
            </section>
        </>
    );
}

export default CityList;