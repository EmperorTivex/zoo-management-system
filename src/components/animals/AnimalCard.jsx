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
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={animal.image}
          alt={animal.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute top-3 right-3">
          <Badge variant={getStatusVariant(animal.conservationStatus)} className="shadow-sm">
            {animal.conservationStatus}
          </Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="mb-1">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
            {animal.name}
          </h3>
          <p className="text-xs font-semibold text-green-600 uppercase tracking-wider">
            {animal.species}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 my-3">
          <Badge variant="info" className="text-[10px] py-0 px-2">{animal.category}</Badge>
          <Badge variant="default" className="text-[10px] py-0 px-2">{animal.habitat}</Badge>
        </div>

        <p className="text-gray-500 text-sm line-clamp-2 mb-5 h-10 leading-relaxed">
          {animal.description}
        </p>
        
        <Link
          to={`/animals/${animal.id}`}
          className="block w-full text-center bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition-all text-sm font-bold shadow-md hover:shadow-lg active:scale-95"
        >
          View Details
        </Link>
      </div>
    </Card>
  );
};

export default AnimalCard;
