import { useEffect, useState } from "react";

function PlacesSearchByPrice({ nameChange }) {
    const [searchText, setSearchText] = useState("");

    // Load saved text when component mounts
    useEffect(() => {
        const savedText = localStorage.getItem("placeSearch");

        if (savedText) {
            setSearchText(savedText);
        }
    }, []);

    const handleChange = (e) => {
        const value = e.target.value;

        setSearchText(value);
        localStorage.setItem("placeSearch", value);

        nameChange(e);
    };

    return (
        <section>
            <div>
                <label className="text-center block text-white font-bold">
                    Search for a place
                </label>

                <input
                    type="text"
                    value={searchText}
                    onChange={handleChange}
                    className="border rounded-[15px] text-center bg-sky-600 mt-3"
                />
            </div>
        </section>
    );
}

export default PlacesSearchByPrice;