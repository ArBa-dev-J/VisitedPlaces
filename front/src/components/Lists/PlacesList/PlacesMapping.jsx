import { useState } from "react";
import x from "../../../assets/x.png"

function PlacesMapping({ place }) {

    const API_URL = import.meta.env.VITE_BACK;

    const [show, setShow] = useState(null);

    const toShow = () => {
        return show ? setShow(null) : setShow(true);
    }




    return (
        <>
            <div className="flex flex-col items-center mx-auto mt-5 border border-white rounded-[25px] w-[90%]">
                <div className="flex relative items-center md:left-14 2xl:gap-20 2xl:left-29 md:gap-5">
                    <p className="text-[1.2rem] mt-2 mb-2 text-white">{place.place_name}</p>
                    <button className="cursor-pointer"><img className="h-5" src={x} alt="x" /></button>
                    <button className="cursor-pointer">Update</button>
                </div>
                <p className="text-white">{place.name}</p>

                <p className="mt-2 text-white">This place is: {place.place_type}</p>

                {place.is_free ? <p className="mt-2 text-white">This place is free</p> : <p className="mt-2 text-white">This place is not free</p>}

                <p className="mt-2 text-white">This place's rating is: {place.rating}</p>

                <p className="mt-2 text-white">This place address is: {place.address}</p>

                {place.image_url ? <figure className="p-5">
                    <img className="size-[100%] border rounded-[20px] border-white" src={`${API_URL}/${place.image_url}`} />
                </figure> : <p className="text-red-500 p-5">Image does not exist</p>}

                {place.description ? <button onClick={() => toShow()} className="mb-5 cursor-pointer p-1 rounded-[20px] hover:bg-gray-200 bg-white">Read Description</button> : <p className="mt-2 mb-2 text-red-500 ">There is no description</p>}

                {show ? <div className="m-5  text-white text-center bg-sky-600 border rounded-[25px]">
                    <p className="m-5">{place.description}</p>
                </div> : null}

            </div>
        </>
    );
}

export default PlacesMapping;