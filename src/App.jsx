import Register from "./pages/Register";
import Login from "./pages/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";
import Validate from "./pages/Validate";
import List from "./pages/List";
import PropertyDetails from "./pages/PropertyDetails";
import Axios from "axios";
import { API_URL } from "./service/api.service";
const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const token = localStorage.getItem("token");
  // useEffect(() => {
  //   const auth = Axios.post(
  //     API_URL + "verify-token",
  //     localStorage.getItem("token"),
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   setIsAuthenticated(auth);
  // }, []);
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={<MainPage isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/"
          exact={true}
          element={<MainPage isAuthenticated={isAuthenticated} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/validate" element={<Validate />} />
        <Route
          path="/list"
          isAuthenticated={isAuthenticated}
          element={<List />}
        />
        <Route
          path="/propertyDetails/:id"
          isAuthenticated={isAuthenticated}
          element={<PropertyDetails />}
        />
      </Routes>
    </Router>
  );
};

export default App;
