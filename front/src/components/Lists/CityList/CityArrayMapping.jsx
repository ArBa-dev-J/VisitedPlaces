import AskForDeletion from "./AskFOrDeletion";
import UpdateCity from "../../forms/newCity/UpdateCity";
import x from "../../../assets/x.png"
import update from "../../../assets/update.png"
import { useState } from "react";

function CityArrayMapping({ cities, fetchCities }) {
    const [show, setShow] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const toShow = () => setShow(true);
    const notToShow = () => setShow(false);

    const toShowUpdate = () => setShowUpdate(true);
    const notToShowUpdate = () => setShowUpdate(false);



    return (
        <>
            <div className="flex justify-between mt-3">
                <p className="text-[1.2rem] text-white">{cities.name}</p>

                <div className="flex gap-5">
                    <button onClick={() => toShowUpdate()} className="block cursor-pointer"><img src={update} alt="update" className="h-7" /></button>
                    {showUpdate ? <UpdateCity notToShow={() => setShowUpdate} city={cities} fetchCities={() => fetchCities()} /> : null}
                    <button onClick={() => toShow()} className="block cursor-pointer"><img src={x} alt="x" className="h-5" /></button>
                    {show ? <AskForDeletion notToShow={() => notToShow} city={cities} fetchCities={() => fetchCities()} /> : null}
                </div>
            </div>
        </>
    );
}

export default CityArrayMapping;