import { useState, useEffect } from "react";

function PlacesSearchByType({ setTypeF }) {
    const [type, setType] = useState();


    const handleChange = (e) => {
        const value = e.target.value || null;


        setType(value);
        setTypeF(value);

        if (value === null) {
            localStorage.removeItem("placeType");
        } else {
            localStorage.setItem("placeType", value);
        }
    };

    useEffect(() => {
        const savedType = localStorage.getItem("placeType");

        if (savedType) {
            setType(savedType);
            setTypeF(savedType);
        }
    }, []);

    return (
        <>
            <section>
                <div>
                    <label className="text-center block text-white">
                        Search by place type
                    </label>
                </div>
                <select
                    value={type}
                    onChange={handleChange}
                    className="bg-sky-600 rounded-[25px] p-2 mt-2"
                >
                    <option value="">Select a category</option>
                    <option value="castle">Castle</option>
                    <option value="historical object">Historical object</option>
                    <option value="park">Park</option>
                    <option value="amusement_park">Amusement park</option>
                    <option value="theme_park">Theme park</option>
                    <option value="museum">Museum</option>
                </select>
            </section>
        </>
    );
}

export default PlacesSearchByType;