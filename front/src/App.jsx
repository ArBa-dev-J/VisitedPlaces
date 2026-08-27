import { Suspense, lazy } from 'react';
import Loading from './utils/Loading';
const MainPage = lazy(() => import("./components/pages/MainPage"));
import NewCityForm from "./components/forms/newCity/NewCityForm";
import NewPlaceForm from "./components/forms/newPlace/NewPlaceForm";
import CityListPage from "./components/Lists/CityList/cityListPage";
import PlacesListPage from "./components/Lists/PlacesList/PlacesListPage"
import { Routes, Route } from "react-router";


function App() {

  return (
    <>
      <Routes>
        {/* Dasboard route */}
        <Route path="/" element={<Suspense fallback={<Loading />}><MainPage /></Suspense>} />

        {/* Form routes */}
        <Route path="/newCity" element={<NewCityForm />} />
        <Route path="/newPlace" element={<NewPlaceForm />} />

        {/* List routes */}
        <Route path="/cityList" element={<CityListPage />} />
        <Route path="/placesList" element={<PlacesListPage />} />

      </Routes>

    </>
  )
}

export default App
