import React from 'react';

const AnimalFilters = ({
  category,
  setCategory,
  habitat,
  setHabitat,
  status,
  setStatus,
}) => {
  const categories = ["All", "Mammal", "Bird", "Reptile", "Amphibian", "Fish"];
  const habitats = ["All", "Savannah", "Rainforest", "Wetlands", "Desert", "Aquarium"];
  const statuses = ["All", "Healthy", "Stable", "Excellent"];

  return (
    <div className="flex flex-wrap gap-4 mb-8 bg-gray-50 p-4 rounded-lg">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-green-500 focus:border-green-500"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Habitat</label>
        <select
          value={habitat}
          onChange={(e) => setHabitat(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-green-500 focus:border-green-500"
        >
          {habitats.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Health Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border-gray-300 text-sm focus:ring-green-500 focus:border-green-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AnimalFilters;
