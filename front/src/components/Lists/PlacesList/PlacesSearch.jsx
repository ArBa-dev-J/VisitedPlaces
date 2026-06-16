function PlacesSearch({nameChange}) {
    return (
        <>
            <section>
                <div className="text-center">
                    <label className="block text-white font-bold">Search for a place</label>
                    <input onChange={nameChange} type="text" className="border rounded-[15px] text-center bg-sky-600 mt-3" />
                </div>
            </section>
        </>
    );
}

export default PlacesSearch;