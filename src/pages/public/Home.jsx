import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PawPrint, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../../components/common/Button";
import animals from "../../data/animals";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // Pick the first 5 animals for the slideshow
  const slides = animals.slice(0, 5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="animate-fade-in">
      {/* Hero Slideshow */}
      <div className="relative h-[450px] sm:h-[650px] w-full overflow-hidden bg-gray-900">
        {slides.map((animal, index) => (
          <div
            key={animal.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 bg-black/40 z-20" />
            <img
              src={animal.image}
              alt={animal.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-4">
              <span className="text-green-400 font-bold uppercase tracking-widest mb-2 sm:mb-4">
                Featured Resident
              </span>
              <h1 className="text-4xl sm:text-7xl font-black text-white mb-4 drop-shadow-2xl">
                {animal.name}
              </h1>
              <p className="text-lg sm:text-2xl text-white/90 max-w-2xl font-medium drop-shadow-lg mb-8 italic">
                "{animal.description}"
              </p>
              <Link to={`/animals/${animal.id}`}>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black"
                >
                  Meet {animal.name}
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {/* Manual Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                index === currentSlide ? "w-8 bg-green-500" : "w-3 bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold text-gray-900 mb-6">
          Welcome to <span className="text-green-600">ZOOMANIA</span>
        </h2>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 leading-relaxed mb-12">
          Step into a world of wildlife wonder. From the majestic roar of our
          lions to the playful antics of our primates, discover the incredible
          diversity of nature right here at Zoomania.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/book-tickets">
            <Button className="w-full sm:w-auto flex items-center justify-center py-4 px-10 text-lg shadow-lg">
              Book Your Visit
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/animals">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center justify-center py-4 px-10 text-lg"
            >
              <PawPrint className="mr-2 w-5 h-5" />
              Browse Animals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
