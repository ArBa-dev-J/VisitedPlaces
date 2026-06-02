import AskForDeletion from "./AskFOrDeletion";
import x from "../../../assets/x.png"
import { useState } from "react";

function CityArrayMapping({ cities }) {
    const [show, setShow] = useState(false);

    const toShow = () => setShow(true);
    const notToShow = () => setShow(false);


    return (
        <>
            <div className="flex justify-between">
                <p className="text-[1.2rem] text-white">{cities.name}</p>

                <div className="flex gap-5">
                    <button className="block">update</button>
                    <button onClick={() => toShow()} className="block cursor-pointer"><img src={x} alt="x" className="h-5" /></button>
                    {show ? <AskForDeletion  notToShow={() => notToShow} city={cities}/> : null}
                </div>
            </div>
        </>
    );
}

export default CityArrayMapping;