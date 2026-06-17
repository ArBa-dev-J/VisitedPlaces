import { useEffect, useState } from "react";

function PlacesSearchByRating({ ratingChange }) {
    const [searchRating, setSearchRating] = useState();

    // Load saved text when component mounts
    useEffect(() => {
        const savedRating = localStorage.getItem("searchRating");

        if (savedRating) {
            setSearchRating(savedRating);
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        setSearchRating(value);
        localStorage.setItem("searchRating", value);

        ratingChange(e);
    };

    return (
        <>
            <section>
                <div>
                    <p className="text-white text-center pb-2">Place rating</p>
                    <input onChange={handleChange} value={searchRating} type="number" className="text-center border rounded-[15px] bg-sky-600" />
                </div>
            </section>
        </>
    );
}

export default PlacesSearchByRating;