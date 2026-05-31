import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";


function NewCityFormInputs() {
    const [serverError, setServerError] = useState(null);

    const API_URL = import.meta.env.VITE_BACK;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${API_URL}/cities/newCity`, data)

            reset();
            setServerError(null);
        } catch (error) {
            setServerError(error.response.data.error?.[0].msg || error.response.data.message);
        }
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">

                    <label>Add new city</label>
                    <input type="text" {...register("name", { required: true })} className="border block" />
                    {errors.name && <p>This field must be populated</p> || <p>{serverError}</p>}

                    <input type="submit" value="Add new city to the list" />

                </form>
            </section>
        </>
    );
}

export default NewCityFormInputs;