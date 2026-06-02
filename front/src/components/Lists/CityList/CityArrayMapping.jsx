import x from "../../../assets/x.png"

function CityArrayMapping({ cities }) {

    return (
        <>
            <div className="flex justify-between">
                <p className="text-[1.2rem] text-white">{cities.name}</p>

                <div className="flex gap-5">
                    <button className="block">update</button>
                    <button className="block cursor-pointer"><img src={x} alt="x" className="h-5" /></button>
                </div>
            </div>
        </>
    );
}

export default CityArrayMapping;