import { useRef } from "react";
import { Link } from "react-router";

const LandscapingPage = () => {
  const serviceDetailsRef = useRef(null);

  const services = {
    lawnCare: {
      title: "Lawn care & grass cutting",
      description:
        "Keep your lawn lush, healthy, and perfectly manicured with our professional grass cutting and lawn maintenance services.",
      details: [
        "Regular grass cutting and edging",
        "Lawn fertilization and weed control",
        "Aeration and overseeding",
        "Disease and pest management",
        "Seasonal lawn cleanup",
      ],
      image: "/api/placeholder/600/400",
    },
    fenceMaintenance: {
      title: "Fence maintenance & repair",
      description:
        "Protect and enhance your property boundaries with our professional fence maintenance services.",
      details: [
        "Fence cleaning and pressure washing",
        "Staining and sealing",
        "Post replacement and repair",
        "Gate installation and repair",
        "Vine and vegetation control",
      ],
      image: "/api/placeholder/600/400",
    },
    plantPositioning: {
      title: "Plant positioning and arrangement",
      description:
        "Create stunning visual appeal with our expert plant placement and garden design services.",
      details: [
        "Garden bed design and installation",
        "Plant spacing and arrangement",
        "Color coordination and seasonal planning",
        "Height and texture consideration",
        "Focal point creation",
      ],
      image: "/api/placeholder/600/400",
    },
    plantAdvisory: {
      title: "Plant selection advisory",
      description:
        "Get expert advice on the best plants for your specific environment and preferences.",
      details: [
        "Native plant recommendations",
        "Climate-appropriate species selection",
        "Low-maintenance plant options",
        "Seasonal blooming planning",
        "Drought-resistant varieties",
      ],
      image: "/api/placeholder/600/400",
    },
    irrigation: {
      title: "Irrigation systems",
      description:
        "Efficient watering solutions to keep your landscape healthy while conserving water.",
      details: [
        "Sprinkler system installation",
        "Drip irrigation setup",
        "Smart irrigation controllers",
        "System maintenance and repair",
        "Water conservation consulting",
      ],
      image: "/api/placeholder/600/400",
    },
  };

  return (
    <div className="min-h-screen bg-#b89b51">
      {/* Hero Section */}
      <section className="bg-#b89b51 text-black py-10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-4xl md:text-5xl font-bold mb-2">
            Landscaping services
          </p>
          <p className="text-xl md:text-2xl mb-8">
            Transforming outdoor spaces with excellence
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8 py-16">
          {/* Service Details */}
          <div ref={serviceDetailsRef}>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(services).map(([key, service]) => (
                  <div key={key} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                    <div className="h-48 bg-green-50 flex items-center justify-center">
                      <span className="text-green-800 font-semibold">
                        Service Image
                      </span>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-black mb-2">
                        {service.title}
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-green-50 text-center rounded-lg p-6 mt-8">
                <h4 className="text-xl font-semibold text-green-800 mb-4">
                  Ready to transform your space?
                </h4>
                <p className="text-gray-700 mb-4">
                  Contact us for a free consultation and quote for your
                  landscaping needs.
                </p>
                <div className="flex justify-center flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
                  >
                    Schedule consultation
                  </Link>
                  <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition duration-300">
                    Call Now: (+254) 720 804523
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandscapingPage;
