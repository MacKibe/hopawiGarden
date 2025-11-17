import { Link } from 'react-router';

const PlantCarePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-#b89b51 text-black py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-4xl md:text-5xl font-bold mb-4">Plant care & maintenance</p>
          <p className="text-lg w-[70%] mx-auto mb-8">Our plant care service goes beyond basic maintenance. We provide holistic care that addresses 
              the specific needs of each plant, ensuring they not only survive but thrive in your space 
              throughout the year.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-10 items-center">
          {/* Content Section */}
          <div>
            <p className="text-gray-700 text-lg mb-6">
            </p>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-emerald-700 mb-4">Our services include</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Regular pruning and strategic trimming</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Customized fertilization and nutrient management</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Pest and disease monitoring and treatment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Seasonal plant protection and care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Growth monitoring and health assessment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-80 bg-emerald-200 rounded-lg flex items-center justify-center mb-6">
              <span className="text-emerald-800 font-semibold text-xl">Plant Care Image</span>
            </div>
            <div className="text-center">
              <p className="text-gray-600">
                Regular maintenance keeps your plants healthy and beautiful year-round
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="my-12 bg-emerald-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Keep Your Plants Thriving</h3>
          <p className="text-emerald-100 mb-6 text-lg">
            Schedule a plant health assessment and get a customized care plan
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition duration-300">
              Schedule Assessment
            </Link>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition duration-300">
              Call: (+254) 720 804523
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCarePage;