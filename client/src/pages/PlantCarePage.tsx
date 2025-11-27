import { Link } from "react-router";

const PlantCarePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-[var(--background)] text-4xl md:text-5xl font-bold mb-4 underline underline-offset-4">
            Plant care maintenance
          </p>
          <p className="w-[80%] text-xl md:text-lg py-2">
            Our plant care service goes beyond basic maintenance. We provide holistic care routine that addresses the specific needs of each plant,ensuring they not only survive but thrive in your space throughout.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Content Section */}
          <div>
            <p className="text-lg mb-6"></p>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-[var(--background)] mb-4">
                Plant care maintainance include
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓ </span>
                  <span>Watering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓ </span>
                  <span>Weeding.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓ </span>
                  <span>Pruning and trimming.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓ </span>
                  <span>Plant positioning and arrangement.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓ </span>
                  <span>Pest and disease monitoring and treatment.</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="flex flex-col">
            <div className="w-full h-80 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-6">
              <img src="/assets/care.jpeg"/>
            </div>
            <div className="text-center">
              <p className="text-gray-600">
                Routine plant care and maintenance makes plants stay healthy and grow.
              </p>
            </div>
          </div>
        </div>       
        {/* CTA Section */}
        <div className="w-[65%] mx-auto my-12 border-3 border-[var(--primary)] rounded-lg p-10 text-center">
          <p className="text-2xl font-bold mb-4">Keep your plants thriving</p>
          <p className="mb-6 text-lg">Schedule a plant health assessment and get a care plan</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="border-1 border-[var(--primary)] text-[var(--background)] bg-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--background)] hover:text-white transition duration-300">Schedule assessment</Link>
            <a href="https://wa.me/254720804523?text=Hello!%20I%E2%80%99m%20interested%20in%20your%20plant%20care%20and%20maintenance%20services.%20Could%20you%20please%20share%20your%20charges%20and%20what%E2%80%99s%20included?%20Thank%20you" className="border border-[var(--background)] px-8 py-3 rounded-lg text-[var(--background)] font-semibold hover:bg-[var(--primary)] hover:text-[var(--background)] transition duration-300">
              Call / WhatsApp (+254) 720 804523
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCarePage;
