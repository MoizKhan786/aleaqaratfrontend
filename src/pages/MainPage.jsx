import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import SearchAndFilter from "../components/SearchAndFilter";
import PropertyCard from "../components/PropertyCard";
import Login from "./Login";

const MainPage = ({ username, isAuthenticated }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");

        const response = await fetch("MOIZ_API_URL/properties", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log(data); // moiz check if data is proper or not
        setProperties(data.properties);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated]);

  return isAuthenticated ? (
    <div
      className="bg-gray-950 h-screen"
      style={{ backgroundImage: 'url("bgimg.jpeg")' }}
    >
      <Navbar username={username} />
      <SearchAndFilter properties={properties} setProperties={setProperties} />
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  ) : (
    <Login />
  );
};

export default MainPage;
