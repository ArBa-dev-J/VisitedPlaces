import { useState } from "react";
import x from "../../../assets/x.png";
import update from "../../../assets/update.png";
import PlaceAskForDelete from "./PlaceAskForDelete";
import UpdatePlaceForm from "../../forms/newPlace/UpdatePlaceForm";
import ReactPaginate from "react-paginate";

function PlacesMapping({ setFetchedPlaces, place, fetchAllPlaces }) {
  const API_URL = import.meta.env.VITE_BACK;

  const [show, setShow] = useState(null);
  const [showDelete, setShowDelete] = useState();
  const [showUpdateForm, setShowUpdateForm] = useState();

  // for image pagination
  const [currentPage, setCurrentPage] = useState(0);

  //logic for pagination

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageSize = 1;

  const offset = currentPage * pageSize;

  const toShow = () => {
    return show ? setShow(null) : setShow(true);
  };

  const toShowDelete = () => {
    return (
      showDelete ? setShowDelete(false) : setShowDelete(true),
      setShowUpdateForm(false)
    );
  };

  const toShowUpdateForm = () => {
    return (
      showUpdateForm ? setShowUpdateForm(false) : setShowUpdateForm(true),
      setShowDelete(false)
    );
  };

  const images = place.images.map((image) => image.image_url);

  const paginatedItems = images.slice(offset, offset + pageSize);

  return (
    <>
      <div className="flex flex-col items-center mx-auto mt-5 border border-white rounded-[25px]">
        <div className="flex gap-10 relative left-15">
          <p className="text-[1.2rem] mt-2 mb-2 text-white">
            {place.place_name}
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => toShowUpdateForm()}
              className="cursor-pointer"
            >
              <img className="h-8" src={update} alt="update" />
            </button>
            <button onClick={() => toShowDelete()} className="cursor-pointer">
              <img className="h-5" src={x} alt="x" />
            </button>
          </div>
        </div>

        {showUpdateForm ? (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            {" "}
            <UpdatePlaceForm
              place={place}
              key={place.id}
              toShowUpdateForm={toShowUpdateForm}
              fetchAllPlaces={fetchAllPlaces}
            />{" "}
          </div>
        ) : null}
        {showDelete ? (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            {" "}
            <PlaceAskForDelete
              setFetchedPlaces={setFetchedPlaces}
              key={place.id}
              place={place}
              toShowDelete={toShowDelete}
              fetchAllPlaces={fetchAllPlaces}
            />{" "}
          </div>
        ) : null}

        <p className="text-white">{place.name}</p>

        <p className="mt-2 text-white">This place is: {place.place_type}</p>

        {place.is_free ? (
          <p className="mt-2 text-white">This place is free</p>
        ) : (
          <p className="mt-2 text-white">This place is not free</p>
        )}

        <p className="mt-2 text-white">
          This place's rating is: {place.rating}
        </p>

        <p className="mt-2 text-white">
          This place address is: {place.address}
        </p>

        {images.length > 0 ? (
          paginatedItems.map((image) => (
            <figure className="p-5 lg:w-full md:w-[400px]">
              <img
                className="size-[100%] border rounded-[20px] border-white"
                src={`${API_URL}/${image}`}
                alt={`${images}`}
              />
              <div className="pt-5">
                <ReactPaginate.default
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={Math.ceil(images.length / pageSize)}
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={2}
                  onPageChange={handlePageChange}
                  containerClassName={
                    "flex justify-center gap-3 items-center font-poppins text-xs"
                  }
                  activeClassName={
                    "bg-transparent border-b-4 border-gray-800 text-white rounded-lg font-medium py-2"
                  }
                  pageLinkClassName={
                    "bg-transparent text-gray-800 border border-gray-800 rounded-lg font-medium px-3 py-2"
                  }
                  previousLinkClassName={
                    "bg-gray-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                  }
                  nextLinkClassName={
                    "bg-gray-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                  }
                  disabledClassName={"pointer-events-none opacity-50"}
                />
              </div>
            </figure>
          ))
        ) : (
          <p className="text-red-500 p-5">Image does not exist</p>
        )}

        {place.description ? (
          <button
            onClick={() => toShow()}
            className="mb-5 cursor-pointer p-1 rounded-[20px] hover:bg-gray-200 bg-white"
          >
            Read Description
          </button>
        ) : (
          <p className="mt-2 mb-2 text-red-500 ">There is no description</p>
        )}

        {show ? (
          <div className="m-5  text-white text-center bg-sky-600 border rounded-[25px]">
            <p className="m-5">{place.description}</p>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default PlacesMapping;
