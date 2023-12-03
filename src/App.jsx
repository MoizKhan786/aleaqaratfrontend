import Register from "./pages/Register";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { useEffect, useState } from "react";
import Validate from "./pages/Validate";
import List from "./pages/List";
import PropertyDetails from "./pages/PropertyDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  // useEffect(() => {
  //   const validateToken = async () => {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       try {
  //         const response = await fetch("http://localhost:3500/verify-token", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ token }),
  //         });

  //         if (response.ok) {
  //           setIsAuthenticated(true);
  //         } else {
  //           setIsAuthenticated(false);
  //           localStorage.removeItem("token");
  //         }
  //       } catch (error) {
  //         console.error("Error validating token:", error);
  //         setIsAuthenticated(false);
  //         localStorage.removeItem("token");
  //       }
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   validateToken();
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
