function PlacesSearchChange({ toShowOrToHide }) {
    return (
        <>
            <section>
                <p className="text-white">Place filter</p>

                <select>
                    <option>Choose search filter</option>
                    <option onClick={() => toShowOrToHide("placeName")} >Search by place name</option>
                    <option onClick={() => toShowOrToHide("cityName")} >Search by city name</option>
                </select>
            </section>
        </>
    );
}

export default PlacesSearchChange;