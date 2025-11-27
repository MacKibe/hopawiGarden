import { useRef } from "react";
import { Link } from "react-router";

const LandscapingPage = () => {
  const serviceDetailsRef = useRef(null);

  const services = {
    lawnCare: {
      title: "Lawn mowing",
      description:
        "Keep your lawn lush, healthy, and perfectly manicured with our professional grass cutting and lawn maintenance services.",
      details: [
        "Regular grass cutting and edging",
        "Lawn fertilization and weed control",
        "Aeration and overseeding",
        "Disease and pest management",
        "Seasonal lawn cleanup",
      ],
      image: "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3960.jpg",
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
      image: "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3964.jpg",
    },
    plantPositioning: {
      title: "Plant arrangement",
      description:
        "Create stunning visual appeal with our expert plant placement and garden design services.",
      details: [
        "Garden bed design and installation",
        "Plant spacing and arrangement",
        "Color coordination and seasonal planning",
        "Height and texture consideration",
        "Focal point creation",
      ],
      image: "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3939-min.JPG",
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
      image: "https://jujkvczxnzflaukmssqb.supabase.co/storage/v1/object/public/testing_bucket/assests/IMG_3926-min.JPG",
    },
  };

  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-[var(--background)] text-4xl md:text-5xl font-bold underline underline-offset-4 mb-2">
            Landscaping services.
          </p>
          <p className="w-[80%] text-xl md:text-lg py-2">
            Transforming outdoor spaces with excellence.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Service Details */}
          <div ref={serviceDetailsRef}>
            <div className="">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {Object.entries(services).map(([key, service]) => (
                  <div key={key} className="grid grid-row-2 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                    <div className="bg-[var(--accent)] flex items-center justify-center">
                      <img src={service.image} alt={service.title} />
                    </div>
                    <div className="p-8">
                      <p className="text-xl font-extrabold mb-2">
                        {service.title}
                      </p>
                      <p className="text-sm line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* CTA Section */}
              <div className="w-[65%] mx-auto mt-12 border-3 border-[var(--primary)] rounded-lg p-10 text-center">
                <p className="text-2xl font-bold mb-4">
                        Ready to transform your space?
                </p>
                <p className="mb-6 text-lg">
                        Contact us for a free consultation and quote for your
                        landscaping needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/contact" className="border-1 border-[var(--primary)] bg-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--background)] hover:text-white transition duration-300">Schedule consultation</Link>
                  <a href="https://wa.me/254720804523?text=Hello!%20I%E2%80%99d%20love%20to%20learn%20more%20about%20your%20landscaping%20services.%20Please%20share%20the%20available%20options%20and%20pricing.%20Thank%20you" className="border border-[var(--background)] px-8 py-3 rounded-lg text-[var(--background)] font-semibold hover:bg-[var(--primary)] hover:text-[var(--background)] transition duration-300">
                    Call / WhatsApp (+254) 720 804523
                  </a>
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
