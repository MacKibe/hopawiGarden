import { Link } from 'react-router';

const SoilMixturePage = () => {
  return (
    <div className="min-h-screen pb-8">
      {/* Hero Section */}
      <div className="py-8">
        <div className="container mx-auto px-4">
          <p className="text-[var(--background)] text-4xl md:text-5xl font-bold underline underline-offset-4">HOPAWI compost mixture</p>
            <p className="w-[80%] text-xl md:text-lg py-2">
              Our proprietary HOPAWI compost mixture is organically formulated to provide the ideal environment 
              for plant roots to thrive. Whether you're growing indoor or oudoor potted plant, either flowering or non-flowering our soil ensures optimal plant development and growth.
            </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Content Section */}
          <div>
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-[var(--background)]">Key features</h3>
              <ul className="space-y-3 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Nutrient-rich organic compost base with essential minerals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Perfect pH balance tailored for different plant types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Enhanced water retention with proper drainage</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Weed-free and pest-resistant formulation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-xl">✓</span>
                  <span>Beneficial microorganisms</span>
                </li>
              </ul>
            </div>

            <div className="rounded-lg mb-8">
              <h4 className="text-xl font-semibold mb-3 text-[var(--background)]">Ideal for:</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className='pl-4'>
                  <ul className="space-y-2">
                    <li className='flex items-center gap-2'><span className='text-4xl'>•</span> Indoor potted plants</li>
                    <li className='flex items-center gap-2'><span className='text-4xl'>•</span>Outdoor potted plants</li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2">
                    <li className='flex items-center gap-2'><span className='text-4xl'>•</span>Flower beds</li>
                    <li className='flex items-center gap-2'><span className='text-4xl'>•</span>Fruit tree planting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="flex flex-col items-center">
            <div className="w-full h-80 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-6">
              <span className="text-amber-800 font-semibold text-xl">Soil mixture image</span>
            </div>
            <div className="text-center">
              <p className="mb-4 text-[var(--background)]">
                Available in various sizes from small bags to bulk delivery
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className='my-4'>
          <h3 className="text-2xl font-bold text-[var(--background)] mb-8">Why choose HOPAWI compost mixture?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-[var(--primary)] p-8 rounded-xl">
              <div className="bg-[var(--secondary)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl"><img src="/assets/root.svg" /></span>
              </div>
              <h4 className="font-semibold text-[var(--background)] mb-2">Faster growth</h4>
              <p>Promotes strong root development and faster plant growth</p>
            </div>
            <div className="text-center bg-[var(--primary)] p-8 rounded-xl">
              <div className="bg-[var(--secondary)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💧</span>
              </div>
              <h4 className="font-semibold text-[var(--background)] mb-2">Better water retention</h4>
              <p>Optimal water retention while preventing waterlogging and root rot</p>
            </div>
            <div className="text-center bg-[var(--primary)] p-8 rounded-xl">
              <div className="bg-[var(--secondary)] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌿</span>
              </div>
              <h4 className="font-semibold text-[var(--background)] mb-2">Healthier plants</h4>
              <p>Rich in organic matter and essential nutrients for vibrant growth</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-[65%] mx-auto mt-12 border-3 border-[var(--primary)] rounded-lg p-10 text-center">
          <p className="text-2xl font-bold mb-4">Ready to improve your soil?</p>
          <p className="mb-6 text-lg">
            Get our premium HOPAWI soil mixture delivered to your location
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="border-1 border-[var(--primary)] text-[var(--background)] bg-[var(--primary)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--background)] hover:text-white transition duration-300">
              Order now
            </Link>
                  <button className="border border-[var(--background)] px-8 py-3 rounded-lg text-[var(--background)] font-semibold hover:bg-[var(--primary)] hover:text-[var(--background)] transition duration-300">
                    Call / WhatsApp (+254) 720 804523
                  </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilMixturePage;