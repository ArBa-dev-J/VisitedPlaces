import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";


function NewCityFormInputs() {
    const [serverError, setServerError] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <section>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">

                    <label>Add new city</label>
                    <input type="text" {...register("name", { required: true})} className="border block" />

                    <input type="submit" value="Add new city to the list" />

                </form>
            </section>
        </>
    );
}

export default NewCityFormInputs;