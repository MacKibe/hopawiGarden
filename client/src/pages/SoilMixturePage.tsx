import { Link } from 'react-router';

const SoilMixturePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-#b89b51 py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-4xl md:text-5xl font-bold text-black mb-4">HOPAWI Soil mixture</p>
            <p className="text-gray-700 w-[70%] mx-auto text-lg mb-6">
              Our proprietary HOPAWI soil mixture is scientifically formulated to provide the ideal environment 
              for plant roots to thrive. Whether you're growing vegetables, flowers, or ornamental plants, 
              our soil ensures optimal development and health.
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16 items-center">
          {/* Content Section */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-amber-700 mb-4">Key features</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Nutrient-rich organic compost base with essential minerals</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Perfect pH balance tailored for different plant types</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Enhanced water retention with proper drainage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Beneficial microorganisms and mycorrhizae</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-3 text-xl">✓</span>
                  <span className="text-gray-700">Weed-free and pest-resistant formulation</span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-lg p-6 mb-8">
              <h4 className="text-xl font-semibold text-amber-800 mb-3">Ideal for:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <ul className="space-y-2">
                    <li className="text-gray-700">• Vegetable gardens</li>
                    <li className="text-gray-700">• Flower beds</li>
                    <li className="text-gray-700">• Potted plants</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className="text-gray-700">• Lawn establishment</li>
                    <li className="text-gray-700">• Tree planting</li>
                    <li className="text-gray-700">• Landscape projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-80 bg-amber-200 rounded-lg flex items-center justify-center mb-6">
              <span className="text-amber-800 font-semibold text-xl">Soil mixture image</span>
            </div>
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Available in various sizes from small bags to bulk delivery
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-amber-800 mb-8 text-center">Why choose HOPAWI soil mixture?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-2xl">🌱</span>
              </div>
              <h4 className="font-semibold text-amber-700 mb-2">Faster growth</h4>
              <p className="text-gray-600">Promotes strong root development and faster plant establishment</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-2xl">💧</span>
              </div>
              <h4 className="font-semibold text-amber-700 mb-2">Better water management</h4>
              <p className="text-gray-600">Optimal water retention while preventing waterlogging and root rot</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-600 text-2xl">🌿</span>
              </div>
              <h4 className="font-semibold text-amber-700 mb-2">Healthier plants</h4>
              <p className="text-gray-600">Rich in organic matter and essential nutrients for vibrant growth</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="my-12 bg-amber-600 text-white rounded-lg p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to improve your soil?</h3>
          <p className="text-amber-100 mb-6 text-lg">
            Get our premium HOPAWI soil mixture delivered to your location
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-amber-50 transition duration-300">
              Order Now
            </Link>
            <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300">
              Call: (+254) 720 804523
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMixturePage;