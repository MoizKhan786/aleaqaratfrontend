import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DateRangePicker } from "react-date-range";
import Axios from "axios";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { API_URL } from "../service/api.service";
import Navbar from "../components/Navbar";

const PropertyDetails = () => {
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [property, setProperty] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
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

  const openModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUpdateSubmit = async (e, formData) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: formData.title,
        location: formData.location,
        description: formData.description,
        price: formData.price,
        type: formData.type,
        image: formData.imageKey,
      };
      const resData = { updatedData };
      console.log(resData);
      const response = await Axios.put(
        API_URL + `update-property?propertyId=${id}`,
        resData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Property Updated Successfully!");
      setProperty(response.data);
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating property:", error);
      alert("You are not the owner of this property");
      handleCloseModal();
    }
  };

  const deleteProperty = async () => {
    try {
      const res = await Axios.delete(
        API_URL + `delete-property?propertyId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      alert("Property Deleted Successfully!");
      navigate("/");
    } catch (e) {
      alert("You are not the owner of the property");
      console.error("Error Deleting the property", e);
    }
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
      alert("Property Booked Successfully!");
    } catch (error) {
      console.error("Error booking property:", error);
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <img
          src={property?.property?.imageKey}
          alt="Property Image"
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h2 className="text-3xl font-semibold mb-4">
          {property?.property?.title}
        </h2>
        <p className="text-gray-600">
          Location: {property?.property?.location}
        </p>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-700">Owner: {property?.property?.owner}</p>
          <div className="flex flex-col items-center">
            <p className="text-green-800 uppercase font-semibold">
              {property?.property?.type === "sale" ? "For Sale" : "For Rent"}
            </p>
            <div className="gap-5 flex">
              <button
                onClick={deleteProperty}
                className="bg-red-500 text-white px-4 py-2 mt-6 rounded-md ease-in transition hover:bg-red-600"
              >
                Delete Property
              </button>
              <button
                onClick={openModal}
                className="bg-yellow-500 text-white px-4 py-2 mt-6 rounded-md ease-in transition hover:bg-yellow-600"
              >
                Update Property
              </button>
            </div>
          </div>
        </div>
        <p className="text-gray-700 mb-5">
          Description: {property?.property?.description}
        </p>
        <p className="text-2xl font-bold text-black">
          ${property?.property?.price}
        </p>
        <button className="bg-green-500 text-white px-4 py-2 mt-6 rounded-md ease-in transition hover:bg-green-600">
          Enquiry
        </button>
        {property?.property?.type === "rent" ? (
          <div className="mt-5">
            <h2 className="mt-5 flex justify-center mb-5 text-black font-bold">
              {property?.property?.isBooked
                ? "Property is currently booked. You can book for future dates"
                : "Book Your Property"}
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
        <Modal
          showModal={showModal}
          onClose={handleCloseModal}
          onSubmit={handleUpdateSubmit}
          property={property}
        >
          <h2>Property Updated</h2>
          <p>Your property has been successfully updated.</p>
          <button onClick={handleCloseModal}>Close</button>
          {console.log(property)}
        </Modal>
      </div>
    </div>
  );
};

const Modal = ({ showModal, onClose, onSubmit, property }) => {
  console.log(property);
  const [formData, setFormData] = useState({
    title: property?.property?.title || "",
    description: property?.property?.description || "",
    price: property?.property?.price || "",
    location: property?.property?.location || "",
    type: property?.property?.type || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setFormData(property?.property);
  }, [property]);

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        {console.log(formData)}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="modal-content bg-white p-4 rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-2">Update Property</h2>
            <form onSubmit={(e) => onSubmit(e, formData)}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-black">
                  Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData?.title}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData?.description}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-full"
                ></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData?.price}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  name="type"
                  value={formData?.type}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 w-full"
                >
                  <option value="">Select Property Type</option>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Update Property
              </button>
            </form>
            <button
              onClick={onClose}
              className="mt-2 px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
