import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAnimals } from "../../utils/storage";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import LoadingSpinner from "../../components/common/LoadingSpinner";
import { ArrowLeft, Heart, Info, Clock, User } from "lucide-react";

const AnimalDetails = () => {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const allAnimals = getAnimals();
    const foundAnimal = allAnimals.find((a) => a.id === id);
    setAnimal(foundAnimal);
    setLoading(false);
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!animal) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Animal not found</h2>
        <Link
          to="/animals"
          className="text-green-600 hover:underline mt-4 inline-block"
        >
          Back to all animals
        </Link>
      </div>
    );
  }

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        to="/animals"
        className="flex items-center text-gray-500 hover:text-green-600 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Animals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full h-56 sm:h-72 md:h-96 lg:h-[500px] object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
            <div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
                {animal.name}
              </h1>
              <p className="text-xl text-gray-500 italic">{animal.species}</p>
            </div>
            <Badge
              variant={getStatusVariant(animal.conservationStatus)}
              className="text-sm px-4 py-1"
            >
              {animal.conservationStatus}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            <Badge variant="info" className="px-3 py-1">
              {animal.category}
            </Badge>
            <Badge variant="default" className="px-3 py-1">
              {animal.habitat}
            </Badge>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Info className="w-5 h-5 mr-2 text-green-600" />
              Key Information
            </h2>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Age
                </p>
                <p className="text-gray-900 font-medium">{animal.age} years</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Gender
                </p>
                <p className="text-gray-900 font-medium">{animal.gender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Weight
                </p>
                <p className="text-gray-900 font-medium">{animal.weight}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Diet
                </p>
                <p className="text-gray-900 font-medium">{animal.diet}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Health
                </p>
                <Badge variant={getStatusVariant(animal.healthStatus)}>
                  {animal.healthStatus}
                </Badge>
              </div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Care & Feeding
            </h2>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Primary Caretaker
                </p>
                <p className="text-gray-900 font-medium">{animal.caretaker}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                  Next Feeding
                </p>
                <p className="text-gray-900 font-medium flex items-center justify-end">
                  <Clock className="w-4 h-4 mr-1 text-green-600" />
                  {animal.feedingTime}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {animal.description}
            </p>
          </div>

          <div className="mt-auto">
            <Link to="/book-tickets">
              <Button className="w-full py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
