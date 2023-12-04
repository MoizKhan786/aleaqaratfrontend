import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchAndFilter from "../components/SearchAndFilter";
import PropertyCard from "../components/PropertyCard";
import Login from "./Login";
import Axios from "axios";
import { API_URL } from "../service/api.service";
import { useNavigate } from "react-router-dom";

const MainPage = ({ username, isAuthenticated }) => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signup");
    }
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("token");

        const response = await Axios.get(API_URL + "/get-all-properties", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (response.status !== 200) {
          throw new Error("Failed to fetch data");
        }

        const data = response.data;
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <div
      className="bg-gray-950 min-h-screen"
      style={{ backgroundImage: 'url("bgimg.jpeg")' }}
    >
      <Navbar username={username} />
      <SearchAndFilter properties={properties} setProperties={setProperties} />
      {properties?.length === 0 ? (
        <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <h1 className="text-white">Loading Properties...</h1>
        </div>
      ) : (
        <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties?.map((property) => (
            <PropertyCard key={property.propertyId} property={property} />
          ))}
        </div>
      )}
    </div>
  ) : (
    <Login />
  );
};

export default MainPage;
