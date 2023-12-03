import React, { useState, useEffect } from "react";
import FilterModal from "./FilterModal";
import { propertiesData } from "../assets/mock";

const SearchAndFilter = ({ properties, setProperties }) => {
  const [isFilterModalOpen, setFilterModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(propertiesData);
  const [allProperties, setAllProperties] = useState(propertiesData);

  const [filterOptions, setFilterOptions] = useState({
    priceRange: { min: "", max: "" },
    location: "",
    propertyType: "",
  });

  useEffect(() => {
    const newFilteredProperties = allProperties.filter((property) => {
      const isNameMatch = property.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const isLocationMatch = property.location
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const isOwnerMatch = property.owner
        .toLowerCase()
        .includes(searchText.toLowerCase());
      return isNameMatch || isLocationMatch || isOwnerMatch;
    });
    setFilteredProperties(newFilteredProperties);

    setProperties(newFilteredProperties);
  }, [searchText]);

  const handleFilterClick = () => {
    setFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    // If the filter modal is closed without applying filters, reset to all properties
    if (!filterOptions) {
      setFilteredProperties(allProperties);
      setProperties(allProperties);
    }

    setFilterModalOpen(false);
  };

  const handleApplyFilters = (filters) => {
    setFilterOptions(filters);
    if (filters.priceRange.min === "") {
      filters.priceRange.min = 0;
    }
    if (filters.priceRange.max === "") {
      filters.priceRange.max = Number.MAX_SAFE_INTEGER;
    }
    const newFilteredProperties = allProperties.filter((property) => {
      const isLocationMatch = property.location
        .toLowerCase()
        .includes(filters.location.toLowerCase());
      const isPropertyTypeMatch = property.type
        .toLowerCase()
        .includes(filters.propertyType.toLowerCase());
      const isPriceMatch =
        filters.priceRange.min <= property.price &&
        filters.priceRange.max >= property.price;

      return isLocationMatch && isPropertyTypeMatch && isPriceMatch;
    });
    setFilteredProperties(newFilteredProperties);

    setProperties(newFilteredProperties);

    setFilterModalOpen(false);
  };

  return (
    <div className="bg-gray-950 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="p-2 border border-gray-500 flex-1 focus:outline-none rounded-md"
          />
          <button
            onClick={handleFilterClick}
            className="ml-2 p-2 bg-gray-600 text-white rounded-md  hover:bg-gray-800"
          >
            Filter
          </button>
        </div>
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={handleCloseFilterModal}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default SearchAndFilter;
