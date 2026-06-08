import Dashboard from "./components/pages/Dashboard";
import NewCityForm from "./components/forms/newCity/NewCityForm";
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

        {/* List routes */}
        <Route path="/cityList" element={<CityListPage />} />


      </Routes>

    </>
  )
}

export default App
