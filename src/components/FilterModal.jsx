import React, { useState } from "react";

const FilterModal = ({ isOpen, onClose, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleApplyClick = () => {
    onApplyFilters({
      priceRange,
      location,
      propertyType,
    });
  };
  const handleClear = () => {
    setPriceRange({ min: "", max: "" });
    setLocation("");
    setPropertyType("");
  };

  return (
    <div
      className={`fixed inset-0 overflow-y-auto ${isOpen ? "block" : "hidden"}`}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-gray-200 p-4">
            <h3 className="text-lg font-bold mb-2">Filter Options</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="p-2 border border-gray-300 flex-1"
                />
                <input
                  type="text"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="p-2 border border-gray-300 flex-1"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="p-2 border border-gray-300 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Property Type
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="p-2 border border-gray-300 w-full"
              >
                <option value="">Select Property Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
          </div>
          <div className="bg-gray-100 p-4 flex justify-end">
            <button
              onClick={handleApplyClick}
              className="px-4 py-2 mx-2 bg-blue-500 text-white"
            >
              Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="px-4 py-2 bg-blue-500 text-white"
            >
              Clear Filters
            </button>
            <button
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-500 text-white"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterModal;
