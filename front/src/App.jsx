import Dashboard from "./components/pages/Dashboard";
import NewCityForm from "./components/forms/newCity/NewCityForm";
import NewPlaceForm from "./components/forms/newPlace/NewPlaceForm";
import CityListPage from "./components/Lists/CityList/cityListPage";
import { Routes, Route } from "react-router";


function App() {

  return (
    <>
      <Routes>
        {/* Dasboard route */}
        <Route path="/" element={<Dashboard />} />

        {/* Form routes */}
        <Route path="/newCity" element={<NewCityForm />} />
        <Route path="/newPlace" element={<NewPlaceForm/>}/>

        {/* List routes */}
        <Route path="/cityList" element={<CityListPage />} />


      </Routes>

    </>
  )
}

export default App
