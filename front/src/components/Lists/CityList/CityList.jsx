import axios from "axios";
import Loading from "../../../utils/Loading";
import CityArrayMapping from "./CityArrayMapping";
import CitySearch from "./CitySearch"
import { CityContext } from "../../../utils/CityContext";
import { useEffect, useState, useContext } from "react";

function CityList() {

    const API_URL = import.meta.env.VITE_BACK;

    const [serverError, setServerError] = useState(null);
    const { cities, setCities } = useContext(CityContext);
    // const [show, setShow] = useState(false);

    // loading state

    const [loading, setLoading] = useState(true);

    // search by name
    const [name, setName] = useState();

    const nameChange = (e) => {
        setName(e.target.value);
    };

    // get all cities
    const fetchCities = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`${API_URL}/cities/cityList`, {
                params: {
                    name: name,
                }
            });

            if (response) setLoading(false);
            setServerError(null);
            setCities(response.data.data);
        } catch (error) {
            setServerError(error.response.data.message || error.response.data.error[0].msg);
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchCities();
    }, [name])


    // hide search bat if there are no cities in the list
    const hideSearchBar = () => {
        let show;
        if (cities.length > 0) {
            return show = true;
        } else return show = false;
    }
    // if (cities.length > 0) {
    //     setShow(true);
    // } else setShow(false);


    return (
        <>
            <section className="mx-auto p-5 bg-sky-900 rounded-[20px] 2xl:w-[27%]  md:w-[500px]">
                <p className="text-red-500 text-center">{serverError}</p>

                {hideSearchBar() ? <CitySearch nameChange={nameChange} /> : null}

                {hideSearchBar() ?   loading ? <div className="flex justify-center"><Loading/></div> : cities.map((item) => (
                   <CityArrayMapping key={item.id} cities={item} fetchCities={() => fetchCities()} />
                )) : null}

            </section>
        </>
    );
}

export default CityList;