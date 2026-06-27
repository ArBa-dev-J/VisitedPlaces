import { useState, useEffect } from "react";

function PlacesSearchByPrice({ setPlacePrice }) {
    const [price, setPrice] = useState(null);

    // Load saved value on refresh
    useEffect(() => {
        const savedPrice = localStorage.getItem("placePrice");

        if (savedPrice === "true") {
            setPrice(true);
            setPlacePrice(true);
        } else if (savedPrice === "false") {
            setPrice(false);
            setPlacePrice(false);
        } else {
            setPrice(null);
            setPlacePrice(null);
        }
    }, []);

    const handleChange = (e) => {
        let value;

        if (e.target.value === "true") {
            value = true;
        } else if (e.target.value === "false") {
            value = false;
        } else {
            value = null;
        }

        setPrice(value);
        setPlacePrice(value);

        if (value === null) {
            localStorage.removeItem("placePrice");
        } else {
            localStorage.setItem("placePrice", String(value));
        }
    };

    return (
        <section>
            <div>
                <label className="text-center block text-white">
                    Search by free or not free
                </label>

                <select
                    value={price === null ? "" : String(price)}
                    onChange={handleChange}
                    className="bg-sky-600 rounded-[25px] p-2 mt-2"
                >
                    <option value="">Choose place</option>
                    <option value="true">Place is free</option>
                    <option value="false">Place is not free</option>
                </select>
            </div>
        </section>
    );
}

export default PlacesSearchByPrice;