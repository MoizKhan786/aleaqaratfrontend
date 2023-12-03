import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = {
    name: "Spacious Villa",
    location: "Suburb C",
    owner: "ALICE",
    price: 2500,
    type: "Sale",
    img: "img.jpg",
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum, culpa. Possimus cumque laboriosam veniam vero soluta ad ex quisquam asperiores eum consectetur quidem praesentium eveniet ratione, tempore voluptatibus incidunt animi?",
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <img
        src={property.img}
        alt="Property Image"
        className="w-full h-64 object-cover rounded-md mb-6"
      />
      <h2 className="text-3xl font-semibold mb-2">{property.name}</h2>
      <p className="text-gray-600 mb-4">{property.location}</p>
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-700">Owner: {property.owner}</p>
        <p className="text-green-800 uppercase font-semibold">
          {property.type === "Sale" ? "For Sale" : "For Rent"}
        </p>
      </div>
      <p className="text-gray-700 mb-5">Description: {property.desc}</p>
      <p className="text-2xl font-bold text-black">${property.price}</p>
      <button className="bg-gray-500 text-white px-4 py-2 mt-6 rounded-md hover:bg-amber-600">
        Enquiry
      </button>
    </div>
  );
};

export default PropertyDetails;
