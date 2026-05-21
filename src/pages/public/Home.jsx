import { Link } from "react-router-dom";
import { ArrowRight, PawPrint } from "lucide-react";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-green-600">ZOOMANIA</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-6 md:text-xl md:max-w-3xl">
          Discover the wonders of wildlife and experience nature like never
          before. Book your tickets now and start your adventure!
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center max-w-md sm:max-w-none mx-auto">
          <Link to="/book-tickets" className="w-full sm:w-auto">
            <Button className="w-full flex items-center justify-center py-3 px-8 text-base sm:text-lg">
              Get Started
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link to="/animals" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center py-3 px-8 text-base sm:text-lg"
            >
              <PawPrint className="mr-2 w-5 h-5" />
              Explore Animals
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
