import MainPage from "./components/pages/MainPage";
import NewCityForm from "./components/forms/newCity/NewCityForm";
import NewPlaceForm from "./components/forms/newPlace/NewPlaceForm";
import CityListPage from "./components/Lists/CityList/cityListPage";
import PlacesListPage from "./components/Lists/CityList/PlacesList/PlacesListPage";
import { Routes, Route } from "react-router";


function App() {

  return (
    <>
      <Routes>
        {/* Dasboard route */}
        <Route path="/" element={<MainPage />} />

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
