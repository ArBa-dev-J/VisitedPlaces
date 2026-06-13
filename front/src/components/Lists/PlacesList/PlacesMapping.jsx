import { useState } from "react";

function PlacesMapping({ place }) {
    const [show, setShow] = useState(null);

    const toShow = () => {
        return show ? setShow(null) : setShow(true);
    }

    return (
        <>
            <div className="flex flex-col items-center mx-auto mt-3 border border-white rounded-[25px] w-[90%]">
                <p className="text-[1.2rem] mt-2 mb-2 text-white">{place.place_name}</p>

                <p className="text-white">{place.name}</p>

                <p className="text-white">This place is: {place.place_type}</p>


                {place.image_url ? <figure className="p-5">
                    <img className="size-[100%] border rounded-[20px] border-white" src={place.image_url} />
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