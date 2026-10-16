function PlacesSearchChange({
  toShowOrToHide,
  placeName,
  cityName,
  rating,
  isFree,
  type,
}) {
  const activeSearchName = () => {
    if (placeName) return "#0C4A6E";
  };

  const activeSearchCity = () => {
    if (cityName) return "#0C4A6E";
  };

  const activeSearchRating = () => {
    if (rating === null) return null;
    if (rating >= 0) return "#0C4A6E";
  };

  const activeSearchIsFree = () => {
    if (isFree === false || isFree === true) return "#0C4A6E";
  };

  const activeSearchType = () => {
    if (type) return "#0C4A6E";
  };

  return (
    <>
      <section>
        <p className="text-white text-center pb-2">Place filter</p>

        <select className="bg-sky-600 rounded-[25px] p-2">
          <option>Choose search filter</option>
          <option
            onClick={() => toShowOrToHide("placeName")}
            style={{
              backgroundColor: activeSearchName(),
              color: activeSearchName() === "#0C4A6E" ? "white" : null,
            }}
          >
            Search by place name
          </option>
          <option
            onClick={() => toShowOrToHide("cityName")}
            style={{
              backgroundColor: activeSearchCity(),
              color: activeSearchCity() === "#0C4A6E" ? "white" : null,
            }}
          >
            Search by city name
          </option>
          <option
            onClick={() => toShowOrToHide("placeRating")}
            style={{
              backgroundColor: activeSearchRating(),
              color: activeSearchRating() === "#0C4A6E" ? "white" : null,
            }}
          >
            Search by place rating
          </option>
          <option
            onClick={() => toShowOrToHide("isFree")}
            style={{
              backgroundColor: activeSearchIsFree(),
              color: activeSearchIsFree() === "#0C4A6E" ? "white" : null,
            }}
          >
            Search by place price
          </option>
          <option
            onClick={() => toShowOrToHide("placeType")}
            style={{
              backgroundColor: activeSearchType(),
              color: activeSearchType() === "#0C4A6E" ? "white" : null,
            }}
          >
            Search by place type
          </option>
        </select>
      </section>
    </>
  );
}

export default PlacesSearchChange;
