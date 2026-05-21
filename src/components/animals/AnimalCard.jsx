import React from "react";
import { Link } from "react-router-dom";
import Card from "../common/Card";
import Badge from "../common/Badge";

const AnimalCard = ({ animal }) => {
  const getStatusVariant = (status) => {
    switch (status.toLowerCase()) {
      case "healthy":
      case "least concern":
        return "success";
      case "vulnerable":
      case "near threatened":
        return "warning";
      case "endangered":
      case "critically endangered":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <img
        src={animal.image}
        alt={animal.name}
        className="w-full h-48 object-cover"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        loading="lazy"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-900">{animal.name}</h3>
          <Badge variant={getStatusVariant(animal.conservationStatus)}>
            {animal.conservationStatus}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 mb-2">{animal.species}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="info">{animal.category}</Badge>
          <Badge variant="default">{animal.habitat}</Badge>
        </div>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {animal.description}
        </p>
        <Link
          to={`/animals/${animal.id}`}
          className="block w-full text-center bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
};

export default AnimalCard;
