import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import Axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { API_URL } from "../service/api.service";

const PropertyDetails = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [property, setProperty] = useState({});

  const { id } = useParams();
  const authToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await Axios.get(
          API_URL + `get-property?propertyId=${id}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleBook = async () => {
    const startDate = new Date(dateRange[0].startDate);
    const endDate = new Date(dateRange[0].endDate);
    const formattedStartDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(startDate);
    const formattedEndDate = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(endDate);
    console.log(formattedEndDate, formattedStartDate);

    try {
      const response = await Axios.post(
        API_URL + `book-property?propertyId=${id}`,
        {
          fromDate: startDate.toISOString(),
          toDate: endDate.toISOString(),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Booking successful:", response.data);
    } catch (error) {
      console.error("Error booking property:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      {console.log(property)}
      <img
        src={property?.property?.imageKey}
        alt="Property Image"
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h2 className="text-3xl font-semibold mb-2">
        {property?.property?.name}
      </h2>
      <p className="text-gray-600 mb-4">{property?.property?.location}</p>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">Owner: {property?.property?.owner}</p>
        <p className="text-green-800 uppercase font-semibold">
          {property?.property?.type === "sale" ? "For Sale" : "For Rent"}
        </p>
      </div>
      <p className="text-gray-700 mb-5">
        Description: {property?.property?.desc}
      </p>
      <p className="text-2xl font-bold text-black">
        ${property?.property?.price}
      </p>
      <button className="bg-green-500 text-white px-4 py-2 mt-6 rounded-md ease-in transition hover:bg-green-600">
        Enquiry
      </button>
      {property?.property?.type === "rent" && !property?.property?.isBooked ? (
        <div className="mt-5">
          <h2 className="mt-5 flex justify-center mb-5 text-black font-bold">
            Book Your Property
          </h2>
          <div className="flex flex-col gap-5 justify-center items-center">
            <DateRangePicker
              ranges={dateRange}
              onChange={handleSelect}
              direction="vertical"
              showDateDisplay={false}
            />
            <button
              onClick={handleBook}
              className="w-full cursor-pointer bg-green-500 text-white px-4 py-2 mt-6 rounded-md ease-in transition hover:bg-green-600"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      ) : (
        <h1 className="mt-5 text-red-500 font-bold">
          Property Currently Not Available for Rental Bookings
        </h1>
      )}
    </div>
  );
};

export default PropertyDetails;
