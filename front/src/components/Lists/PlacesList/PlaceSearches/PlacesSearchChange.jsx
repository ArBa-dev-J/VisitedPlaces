function PlacesSearchChange({
  toShowOrToHide,
  placeName,
  cityName,
  rating,
  isFree,
  type,
}) {
  
  const activeSearchName = () => {
    if (placeName) return "green";
  };

  const activeSearchCity = () => {
    if (cityName) return "green";
  };

  const activeSearchRating = () => {
    if (rating === null) return null;
    if (rating >= 0) return "green";
  };

  const activeSearchIsFree = () => {
    if (isFree === false || isFree === true) return "green";
  };

  const activeSearchType = () => {
    if (type) return "green";
  };

  return (
    <>
      <section>
        <p className="text-white text-center pb-2">Place filter</p>

        <select className="bg-sky-600 rounded-[25px] p-2">
          <option>Choose search filter</option>
          <option
            onClick={() => toShowOrToHide("placeName")}
            style={{ backgroundColor: activeSearchName() }}
          >
            Search by place name
          </option>
          <option
            onClick={() => toShowOrToHide("cityName")}
            style={{ backgroundColor: activeSearchCity() }}
          >
            Search by city name
          </option>
          <option
            onClick={() => toShowOrToHide("placeRating")}
            style={{ backgroundColor: activeSearchRating() }}
          >
            Search by place rating
          </option>
          <option
            onClick={() => toShowOrToHide("isFree")}
            style={{ backgroundColor: activeSearchIsFree() }}
          >
            Search by place price
          </option>
          <option
            onClick={() => toShowOrToHide("placeType")}
            style={{ backgroundColor: activeSearchType() }}
          >
            Search by place type
          </option>
        </select>
      </section>
    </>
  );
}

export default PlacesSearchChange;
