import axios from "axios";
import CityArrayMapping from "./CityArrayMapping";
import { CityContext } from "../../../utils/CityContext";
import { useEffect, useState, useContext } from "react";

function CityList() {

    const API_URL = import.meta.env.VITE_BACK;

    const [serverError, setServerError] = useState(null);
    const { cities, setCities } = useContext(CityContext);


    // get all cities
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${API_URL}/cities/cityList`);

            setCities(response.data.data);
        } catch (error) {
            setServerError(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchCities();
    }, [cities?.id])

    return (
        <>
             <section className="mx-auto p-5 bg-sky-900 rounded-[20px] w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>

                {cities.map((item) => (
                    <CityArrayMapping key={item.id} cities={item} fetchCities={() => fetchCities()}/>
                ))} 
                
            </section> 
        </>
    );
}

export default CityList;