import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import x from "../../../assets/x.png"
import axios from "axios";

function UpdateCity({ notToShowUpdate, city, fetchCities }) {

    const API_URL = import.meta.env.VITE_BACK;

    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setSuccess(null);
        setServerError(null);

        try {
            await axios.patch(`${API_URL}/cities/${city.id}/updateCity`, data);

            setSuccess(`${city.name} was successfully updated to ${data.name}`);
            setServerError(null);
        } catch (error) {
            setServerError(error?.response.data.error?.[0].msg || error?.response.data.message);
        }
    }

    return (
        <>
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-900 p-50 rounded-[18px]">
                <button onClick={notToShowUpdate()} className="relative left-150 bottom-40 cursor-pointer"><img className="h-5" src={x} alt="delete" /></button>

                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto p-5 bg-sky-900 rounded-[20px] w-[500px] ">

                    <label className="text-white mb-5">Update old city name <span className="font-bold">{city.name}</span> to a new name</label>
                    <input type="text" {...register("name", { required: true })} className="border block bg-sky-600 text-black text-center" />
                    {errors.name && <p className="text-red-500">This field must be populated</p> || <p className="text-red-500">{serverError}</p>}
                    <p className="text-green-500 text-[1rem]">{success}</p>

                    <input type="submit" value="Update the name" className="border mt-2 rounded-[20px] p-2 cursor-pointer  bg-white hover:bg-gray-200 " />

                </form>
            </section>
        </>
    );
}

export default UpdateCity;