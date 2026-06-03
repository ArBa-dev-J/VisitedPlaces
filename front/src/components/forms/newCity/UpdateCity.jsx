import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

function UpdateCity({ notToshow, city, fetchCities }) {
    const [serverError, setServerError] = useState(null);
    const [success, setSuccess] = useState(null);


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);

    }

    return (
        <>
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-900 p-50 rounded-[18px]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center mx-auto p-5 bg-sky-900 rounded-[20px] w-[500px] ">

                    <label className="text-white">Add a new city</label>
                    <input type="text" {...register("name", { required: true })} className="border block bg-sky-600 text-black text-center" />
                    {errors.name && <p className="text-red-500">This field must be populated</p> || <p className="text-red-500">{serverError}</p>}
                    <p className="text-green-500 text-[1rem]">{success}</p>

                    <input type="submit" value="Add a new city to the list" className="border mt-2 rounded-[20px] p-2 cursor-pointer  bg-white hover:bg-gray-200 " />

                </form>
            </section>
        </>
    );
}

export default UpdateCity;