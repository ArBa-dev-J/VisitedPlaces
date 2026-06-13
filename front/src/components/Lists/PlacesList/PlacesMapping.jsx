import { useState } from "react";

function PlacesMapping() {
    const [show, setShow] = useState(null);

    const toShow = () => {
        return show ? setShow(null) : setShow(true); 
    }

    return (
        <>
            <div className="flex flex-col items-center mx-auto mt-3 border border-white rounded-[25px] w-[90%]">
                <p className="text-[1.2rem] text-white">Place name</p>

                <p className="text-white">Place type</p>

                <p className="text-white">City name</p>


                <figure className="p-5">
                    <img className="size-[100%] border rounded-[20px] border-white" src="https://catlintucker.com/wp-content/uploads/2015/02/Catlin-Tucker-Meme-300x198.png" alt="test" />
                </figure>

                <button onClick={() => toShow()} className="mb-5 cursor-pointer p-1 rounded-[20px] hover:bg-gray-200 bg-white">Read Description</button>

                {show ? <div className="m-5  text-white text-center bg-sky-600 border rounded-[25px]">
                    <p className="m-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque quas illum omnis tempora possimus. Perspiciatis iste quisquam quis unde autem corporis cum fugit tempore hic ipsam, soluta quod ex debitis?</p>
                </div> : null}

            </div>
        </>
    );
}

export default PlacesMapping;