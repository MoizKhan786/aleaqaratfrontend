import React from "react";
import { Link } from "react-router-dom";

const PropertyCard = ({ property }) => {
  return (
    <Link
      to={{
        pathname: `/propertyDetails/${property.propertyId}`,
        state: { property },
      }}
    >
      <div
        className="max-w-md mx-auto bg-gray-400 rounded-xl overflow-hidden shadow-md cursor-pointer mb-5 flex"
        style={{ backgroundColor: "rgba(255, 255, 255, 1)" }}
      >
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img
              className="h-72 w-42 object-cover md:w-48"
              src={property.imageKey}
              alt="Property"
            />
          </div>
          <div className="p-8 flex-none w-72 h-72 flex-shrink-0">
            <div
              className={`uppercase tracking-wide text-sm  font-semibold ${
                property.type === "sale" ? "text-amber-500" : "text-blue-500"
              }`}
            >
              {property.type === "sale" ? "For Sale" : "For Rent"}
            </div>
            <p className="block mt-1 text-md leading-tight font-medium text-black">
              {property.name}
            </p>
            <p className="mt-2 text-gray-600 font-semibold">Location: </p>
            <p className="mt-2 text-gray-700 text-sm">{property.location}</p>
            <p className="mt-2 text-gray-600 font-semibold">Owner: </p>
            <p className="mt-2 text-gray-600 text-sm">{property.owner} </p>
            <p className="mt-2 text-gray-600 font-semibold">Price: </p>
            <p className="mt-2 text-gray-950 text-sm mb-3">${property.price}</p>
            {console.log(property.type === "rent" && property.isBooked)}
            {property.type === "rent" ? (
              property.isBooked ? (
                <p className="text-red-600">Booked</p>
              ) : (
                <p className="text-green-500">Book Now</p>
              )
            ) : null}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
