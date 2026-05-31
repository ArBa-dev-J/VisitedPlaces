import Dashboard from "./components/pages/Dashboard";
import NewCityForm from "./components/forms/newCity/NewCityForm";
import { Routes, Route } from "react-router";


function App() {

  return (
    <>
      <Routes>
        {/* Dasboard route */}
        <Route path="/" element={<Dashboard />} />

        {/* Form routes */}
        <Route path="/newCity" element={<NewCityForm />} />


      </Routes>
    </>
  )
}

export default App
