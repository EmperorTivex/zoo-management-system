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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      <Link
        to="/animals"
        className="inline-flex items-center text-gray-500 hover:text-green-600 mb-6 sm:mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
        Back to Animals
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
        {/* Left: Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-gray-100 sticky top-8">
          <img
            src={animal.image}
            alt={animal.name}
            className="w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] object-cover"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Info */}
        <div className="flex flex-col pt-2">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight">
                {animal.name}
              </h1>
              <p className="text-xl text-green-600 font-semibold tracking-wide uppercase mt-1">
                {animal.species}
              </p>
            </div>
            <div className="shrink-0">
              <Badge
                variant={getStatusVariant(animal.conservationStatus)}
                className="text-xs sm:text-sm px-4 py-1.5 shadow-sm font-bold"
              >
                {animal.conservationStatus}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-10">
            <Badge
              variant="info"
              className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100"
            >
              {animal.category}
            </Badge>
            <Badge
              variant="default"
              className="px-3 py-1 bg-gray-50 text-gray-700 border border-gray-100"
            >
              {animal.habitat}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center">
                <Info className="w-4 h-4 mr-2 text-green-600" />
                Physical Profile
              </h2>
              <div className="space-y-4">
                {[
                  ["Age", `${animal.age} years`],
                  ["Gender", animal.gender],
                  ["Weight", animal.weight],
                  ["Diet", animal.diet],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0"
                  >
                    <span className="text-gray-500 text-sm">{label}</span>
                    <span className="text-gray-900 font-bold">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-green-50/50 rounded-2xl p-6 border border-green-100/50">
              <h2 className="text-sm font-bold text-green-700 uppercase tracking-widest mb-4 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Care Team
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-green-600/70 text-xs font-bold uppercase mb-1">
                    Lead Caretaker
                  </p>
                  <p className="text-gray-900 font-black text-lg">
                    {animal.caretaker}
                  </p>
                </div>
                <div>
                  <p className="text-green-600/70 text-xs font-bold uppercase mb-1 text-right">
                    Feeding Schedule
                  </p>
                  <p className="text-gray-900 font-black text-lg flex items-center justify-end">
                    <Clock className="w-4 h-4 mr-1.5 text-green-600" />
                    {animal.feedingTime}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500 fill-red-500" />
              About {animal.name}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg italic bg-white p-6 rounded-2xl border-l-4 border-green-500 shadow-sm">
              "{animal.description}"
            </p>
          </div>

          <div className="sticky bottom-4 sm:relative sm:bottom-0">
            <Link to="/book-tickets">
              <Button className="w-full py-4 text-xl font-black shadow-xl hover:shadow-2xl active:scale-95 transition-all bg-green-600 hover:bg-green-700 text-white rounded-2xl flex items-center justify-center">
                Book a Visit to see {animal.name}
                <ArrowRight className="ml-2 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalDetails;
