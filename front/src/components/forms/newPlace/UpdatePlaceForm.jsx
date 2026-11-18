import x from "../../../assets/x.png";
import { useForm } from "react-hook-form";
import { useState, useEffect, useContext } from "react";
import { CityContext } from "../../../utils/CityContext";
import axios from "axios";
import ReactPaginate from "react-paginate";

function UpdatePlaceForm({ toShowUpdateForm, place, fetchAllPlaces }) {
  const [serverDataError, setServerDataError] = useState([]);
  const [serverError, setServerError] = useState("");
  const [fetchError, setFetchError] = useState(null);


  const [success, setSuccess] = useState(null);
  const { cities, setCities } = useContext(CityContext);

   const images = place.images.map((image) => image.image_url);
  // for image pagination
  const [currentPage, setCurrentPage] = useState(0);

  const API_URL = import.meta.env.VITE_BACK;

  const handleChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  //logic for pagination

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const pageSize = 1;

  const offset = currentPage * pageSize;
  const paginatedItems = images?.slice(offset, offset + pageSize);

  // get all cities directly from db
  const fetchCities = async () => {
    try {
      const response = await axios.get(`${API_URL}/cities/cityList`);

      setServerError(null);
      setCities(response.data.data);
    } catch (error) {
      setFetchError(error.response.data.message);
    }
  };

  console.log(place);

  useEffect(() => {
    fetchCities();
  }, []);
  //----------------------------------------------------

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (setValue("name", place.place_name),
      setValue("place_type", place.place_type),
      setValue("description", place.description),
      setValue("image", ""),
      setValue("address", place.address),
      setValue("rating", place.rating),
      setValue("is_free", String(place.is_free)),
      setValue("city_id", Number(place.city_id)));
  }, []);

  // console.log(`${API_URL}/${place.image_url}`);

  const onSubmit = async (data) => {
    // console.log(data);

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("place_type", data.place_type);
    formData.append("description", data.description);
    formData.append("address", data.address);
    formData.append("rating", Number(data.rating));
    formData.append("is_free", data.is_free);
    formData.append("city_id", Number(data.city_id));

    // File input returns a FileList
    files.forEach((file) => {
      formData.append("image", file);
    });

    try {
      setSuccess(null);
      setServerDataError([]);
      setServerError("");
      const response = await axios.patch(
        `${API_URL}/places/updatePlace/${place.id}`,
        formData,
      );

      setServerError(null);
      fetchAllPlaces();
      if (response) reset();
      setSuccess(`${data.name} was successfully uploaded`);
    } catch (error) {
      setServerDataError(error?.response?.data?.error);
      setServerError(error?.response?.data?.message);
    }
  };

  // filter data errors by specific fields

  const getServerError = (fieldName) => {
    return serverDataError?.find((error) => error.path === fieldName)?.msg;
  };
  return (
    <>
      <section className="pt-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-sky-900 p-50 rounded-[18px] h-[80rem]">
        <div className="flex justify-around">
          <h2 className="text-center pt-10 pb-10 text-[1.4rem]">
            Update visited place
          </h2>
          <button onClick={() => toShowUpdateForm()} className="cursor-pointer">
            <img className="h-5" src={x} alt="delete" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center mx-auto gap-1 bg-sky-900 rounded-[20px] w-[500px] "
        >
          <label className="text-white">Add a new place name you visited</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="border block rounded-[15px] bg-sky-600 text-black text-center"
          />
          {(errors.name && (
            <p className="text-red-500">This field must be populated</p>
          )) || <p className="text-red-500">{getServerError("name")}</p>}

          <label className="text-white">Choose a place type</label>
          <select
            {...register("place_type", { required: true })}
            className="text-white"
          >
            <option value="">Select a category</option>
            <option value="castle">Castle</option>
            <option value="historical object">Historical object</option>
            <option value="park">Park</option>
            <option value="amusement_park">Amusement park</option>
            <option value="theme_park">Theme park</option>
            <option value="museum">Museum</option>
          </select>
          {(errors.place_type && (
            <p className="text-red-500">Place type must be chosen</p>
          )) || <p className="text-red-500">{getServerError("place_type")}</p>}

          <label className="text-white block">Write a description</label>
          <textarea
            {...register("description")}
            type="text"
            className="text-center w-[70%] border rounded-[15px] bg-sky-600"
          />
          {<p className="text-red-500">{getServerError("description")}</p>}

          <input
            {...register("image")}
            type="file"
            multiple
            onChange={handleChange}
            className="text-center border rounded-[15px] bg-sky-600 p-2"
          />
          {images?.length > 0 ? (
            <div className="flex flex-wrap bg-sky-600 p-5 rounded-[15px] gap-2">
              {paginatedItems.map((image) => (
                <figure className="p-5 2xl:w-full md:w-[400px] relative">
                  <img
                    src={`${API_URL}/${image}`}
                    alt={`${images}`}
                    className="border rounded-[20px] border-white"
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
                  <button
                    type="button"
                    onClick={() => {
                      setFiles((prevFiles) =>
                        prevFiles.filter((_, i) => i !== index),
                      );
                    }}
                    className="size-[2vh] absolute top-[13%] left-[84%] cursor-pointer"
                  >
                    <img src={x} alt="x" />
                  </button>
                </figure>
              ))}
            </div>
          ) : null}
          {<p className="text-red-500">{getServerError("image")}</p>}

          <label className="text-white block">Write an address</label>
          <input
            {...register("address", { required: true })}
            type="text"
            className="text-center border rounded-[15px] bg-sky-600"
          />
          {(errors.address && (
            <p className="text-red-500">Address must be required</p>
          )) || <p className="text-red-500">{getServerError("address")}</p>}

          <label className="text-white block">Place rating</label>
          <input
            {...register("rating", { required: true })}
            type="number"
            className="text-center border rounded-[15px] bg-sky-600"
          />
          {(errors.rating && (
            <p className="text-red-500">Must have a rating</p>
          )) || <p className="text-red-500">{getServerError("rating")}</p>}

          <label className="text-white">Is the place free</label>
          <select
            {...register("is_free", { required: true })}
            className="text-white"
          >
            <option value="">Select the option </option>
            <option value={"true"}>Yes</option>
            <option value={"false"}>No</option>
          </select>
          {(errors.is_free && (
            <p className="text-red-500">Must choose one of the option</p>
          )) || <p className="text-red-500">{getServerError("is_free")}</p>}

          <label className="text-white">City select</label>
          <select
            {...register("city_id", { required: true })}
            className="text-white"
          >
            <option value="">Select the option </option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          {(errors.city_id && (
            <p className="text-red-500">Must choose one of the option</p>
          )) || (
            <p className="text-red-500">
              {getServerError("city_id") || fetchError}
            </p>
          )}

          <input
            type="submit"
            value="Update the place"
            className="border mt-2 rounded-[20px] p-2 cursor-pointer  bg-white hover:bg-gray-200 "
          />
          <p className="text-red-500 font-bold text-center">{serverError}</p>
          <p className="text-green-400 font-bold text-center">{success}</p>
        </form>
      </section>
    </>
  );
}

export default UpdatePlaceForm;
