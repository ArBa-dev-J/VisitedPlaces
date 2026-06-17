function PlacesSearchChange({ toShowOrToHide }) {
    return (
        <>
            <section>
                <p className="text-white text-center pb-2">Place filter</p>

                <select className="bg-sky-600 rounded-[25px] p-2">
                    <option>Choose search filter</option>
                    <option onClick={() => toShowOrToHide("placeName")} >Search by place name</option>
                    <option onClick={() => toShowOrToHide("cityName")} >Search by city name</option>
                    <option onClick={() => toShowOrToHide("placeRating")} >Search by place rating</option>
                    <option onClick={() => toShowOrToHide("isFree")} >Search by place price</option>
                    <option onClick={() => toShowOrToHide("placeType")} >Search by place type</option>
                </select>
            </section>
        </>
    );
}

export default PlacesSearchChange;