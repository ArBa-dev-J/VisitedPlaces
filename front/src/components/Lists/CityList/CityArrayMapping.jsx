function CityArrayMapping({ cities }) {

    return (
        <>
            <div className="flex justify-between">
                <p className="text-[1.2rem] text-white">{cities.name}</p>

                <div className="flex gap-5">
                    <button className="block">update</button>
                    <button className="block">Delete</button>
                </div>
            </div>
        </>
    );
}

export default CityArrayMapping;