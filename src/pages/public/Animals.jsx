import React, { useState, useEffect } from "react";
import { getAnimals, seedAnimals } from "../../utils/storage";
import defaultAnimals from "../../data/animals";
import SearchBar from "../../components/common/SearchBar";
import AnimalFilters from "../../components/animals/AnimalFilters";
import AnimalGrid from "../../components/animals/AnimalGrid";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const Animals = () => {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [habitat, setHabitat] = useState("All");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  // Initialize and load animals
  useEffect(() => {
    // Ensure we have data in storage
    seedAnimals(defaultAnimals);

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      const data = getAnimals();
      setAnimals(data);
      setFilteredAnimals(data);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter logic
  useEffect(() => {
    let result = animals;

    // Search filter
    if (searchQuery) {
      result = result.filter(
        (animal) =>
          animal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          animal.species.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Category filter
    if (category !== "All") {
      result = result.filter((animal) => animal.category === category);
    }

    // Habitat filter
    if (habitat !== "All") {
      result = result.filter((animal) => animal.habitat === habitat);
    }

    // Health status filter
    if (status !== "All") {
      result = result.filter((animal) => animal.healthStatus === status);
    }

    setFilteredAnimals(result);
  }, [searchQuery, category, habitat, status, animals]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Animals</h1>
          <p className="mt-2 text-gray-600">
            Meet the residents of Zoomania and learn about their conservation
            status.
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-64">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name or species..."
          />
        </div>
      </div>

      <AnimalFilters
        category={category}
        setCategory={setCategory}
        habitat={habitat}
        setHabitat={setHabitat}
        status={status}
        setStatus={setStatus}
      />

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Showing {filteredAnimals.length}{" "}
          {filteredAnimals.length === 1 ? "animal" : "animals"}
        </p>
      </div>

      {loading ? <LoadingSpinner /> : <AnimalGrid animals={filteredAnimals} />}
    </div>
  );
};

export default Animals;
