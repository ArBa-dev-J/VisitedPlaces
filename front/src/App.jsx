import { Suspense, lazy } from "react";
import Loading from "./utils/Loading";
import { Routes, Route } from "react-router";

// Lazy-loaded components
const MainPage = lazy(() => import("./components/pages/MainPage"));
const NewCityForm = lazy(
  () => import("./components/forms/newCity/NewCityForm"),
);
const NewPlaceForm = lazy(
  () => import("./components/forms/newPlace/NewPlaceForm"),
);
const CityListPage = lazy(
  () => import("./components/Lists/CityList/cityListPage"),
);
const PlacesListPage = lazy(
  () => import("./components/Lists/PlacesList/PlacesListPage"),
);

function App() {
  return (
    <Routes>
      {/* Dashboard route */}
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

      <Route
        path="/newPlace"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loading />
              </div>
            }
          >
            <NewPlaceForm />
          </Suspense>
        }
      />

      {/* List routes */}
      <Route
        path="/cityList"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loading />
              </div>
            }
          >
            <CityListPage />
          </Suspense>
        }
      />

      <Route
        path="/placesList"
        element={
          <Suspense
            fallback={
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loading />
              </div>
            }
          >
            <PlacesListPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;