function PlacesSearchByPrice({nameChange}) {
    return (
        <>
            <section>
                <div>
                    <label className="text-center block text-white font-bold">Search for a place</label>
                    <input onChange={nameChange} type="text" className="border rounded-[15px] text-center bg-sky-600 mt-3" />
                </div>
            </section>
        </>
    );
}

export default PlacesSearchByPrice;