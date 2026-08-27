import { Suspense, lazy } from "react";
import Loading from "./utils/Loading";
const MainPage = lazy(() => import("./components/pages/MainPage"));
const NewCityForm = lazy(
  () => import("./components/forms/newCity/NewCityForm"),
);
import NewPlaceForm from "./components/forms/newPlace/NewPlaceForm";
import CityListPage from "./components/Lists/CityList/cityListPage";
import PlacesListPage from "./components/Lists/PlacesList/PlacesListPage";
import { Routes, Route } from "react-router";

function App() {
  return (
    <>
      <Routes>
        {/* Dasboard route */}
        <Route
          path="/"
          element={
            <Suspense
              fallback={
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loading />
                </div>
              }
            >
              <MainPage />
            </Suspense>
          }
        />

        {/* Form routes */}
        <Route
          path="/newCity"
          element={
            <Suspense
              fallback={
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Loading />
                </div>
              }
            >
              <NewCityForm />
            </Suspense>
          }
        />
        <Route path="/newPlace" element={<NewPlaceForm />} />

        {/* List routes */}
        <Route path="/cityList" element={<CityListPage />} />
        <Route path="/placesList" element={<PlacesListPage />} />
      </Routes>
    </>
  );
}

export default App;
