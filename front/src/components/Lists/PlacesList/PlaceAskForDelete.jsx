import axios from "axios";
import { useState } from "react";

function PlaceAskForDelete({setFetchedPlaces, place, toShowDelete, fetchAllPlaces }) {
    const API_URL = import.meta.env.VITE_BACK;

    const [serverError, setServerError] = useState(null);


    // delete data

    const deleteData = async (id) => {
        try {
            await axios.delete(`${API_URL}/places/deletePlace/${place.id}`);

            setFetchedPlaces(prev =>
                prev.filter(place=> place.id !== place.id)
            );

            fetchAllPlaces();
            toShowDelete();
        } catch (error) {
            setServerError(error.response.data.message);
        }
    }



    return (
        <>
            <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-900 p-50 rounded-[18px]">
                <h2 className="text-white text-center pb-5 font-bold">Do you want to remove {place.place_name}?</h2>
                <div className="flex justify-between">
                    <div>
                        <button onClick={() => deleteData(place.id)} className="cursor-pointer p-2 right-15 bg-red-500 hover:bg-red-900 rounded-[15px] text-[1.2rem]">
                            Yes
                        </button>
                    </div>

                    <div>
                        <button onClick={() => toShowDelete()} className="cursor-pointer p-2 right-15 bg-green-500 hover:bg-green-700 rounded-[15px] text-[1.2rem]">
                            No
                        </button>
                    </div>
                </div>

                <p className="text-red-500 text-center font-bold pt-5">{serverError}</p>
            </section>
        </>
    );
}

export default PlaceAskForDelete;