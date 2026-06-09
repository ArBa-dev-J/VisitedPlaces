import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { CityContext } from "../../../utils/CityContext"
import axios from "axios";

function NewCityFormInput() {
    const [serverError, setServerError] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { cities, setCities } = useContext(CityContext);


    const API_URL = import.meta.env.VITE_BACK;

    // get all cities directly from db
    const fetchCities = async () => {
        try {
            const response = await axios.get(`${API_URL}/cities/cityList`);

            setServerError(null);
            setCities(response.data.data);
        } catch (error) {
            setFetchError(error.response.data.message);
        }
    }

    useEffect(() => {
        fetchCities();
    }, [])
    //----------------------------------------------------

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            
        } catch (error) {
            
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto p-5 bg-sky-900 rounded-[20px] w-[500px] ">

                <label className="text-white">Add a new place name you visited</label>
                <input type="text" {...register("name", { required: true })} className="border block bg-sky-600 text-black text-center" />
                {errors.name && <p className="text-red-500">This field must be populated</p> || <p className="text-red-500">{serverError}</p>}

                <label className="text-white">Choose a place type</label>
                <select {...register("place_type", { required: true })} className="text-white">
                    <option value="">Select a category</option>
                    <option value="castle">Castle</option>
                    <option value="historical object">Historical object</option>
                    <option value="park">Park</option>
                    <option value="amusement_park">Amusement park</option>
                    <option value="theme_park">Theme_park</option>
                    <option value="Museum">Museum</option>
                </select>
                {errors.place_type && <p className="text-red-500">Place type must be chosen</p> || <p className="text-red-500">{serverError}</p>}

                <label className="text-white block">Write a description</label>
                <input {...register("description")} type="text" className="border" />
                {<p className="text-red-500">{serverError}</p>}

                <label className="text-white">Post image url</label>
                <input {...register("image_url")} type="text" className="border" />

                <label className="text-white block">Write an address</label>
                <input {...register("address", { required: true })} type="text" className="border" />
                {errors.address && <p className="text-red-500">Address must be required</p> || <p className="text-red-500">{serverError}</p>}

                <label className="text-white block">Place rating</label>
                <input {...register("place_rating", { required: true })} type="number" className="border" />
                {errors.place_rating && <p className="text-red-500">Must have a rating</p> || <p className="text-red-500">{serverError}</p>}

                <label className="text-white">Is the place free</label>
                <select {...register("is_free", { required: true })} className="text-white">
                    <option value="">Select the option </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
                {errors.is_free && <p className="text-red-500">Must choose one of the option</p> || <p className="text-red-500">{serverError}</p>}

                <label className="text-white">City select</label>
                <select {...register("is_free", { required: true })} className="text-white">
                    <option value="">Select the option </option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </select>
                {errors.is_free && <p className="text-red-500">Must choose one of the option</p> || <p className="text-red-500">{serverError || fetchError}</p>}

                <input type="submit" value="Add a new city to the list" className="border mt-2 rounded-[20px] p-2 cursor-pointer  bg-white hover:bg-gray-200 " />
            </form>
        </>
    );
}

export default NewCityFormInput;