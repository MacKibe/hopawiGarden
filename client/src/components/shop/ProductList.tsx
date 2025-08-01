import { FaCartPlus, FaStar } from "react-icons/fa";
import { products } from "../../data/products";

const ProductList = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      {products.map((product) => (
        <div key={product.id} className="card">
          <div className="card-img bg-cover relative" style={{ backgroundImage: `url(${product.image})`}}>
            <FaCartPlus size={30} color="white" className=" p-8 rounded-full absolute bottom-4 right-4 z-99"/>
          </div>
          <div className="p-4">
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-[var(--text)] truncate">{product.description}</p>
            <h6 className="font-bold text-[var(--background)] mt-4">Kshs {product.price.toLocaleString()}</h6>
            <div className="flex items-center gap-1 my-2">
              {[...Array(5)].map((_, i) => {
                const ratingValue = i + 1;
                return (
                  <div key={i} className="relative">
                    <FaStar size={10}/>
                    {product.rating >= ratingValue ? (
                      <FaStar size={10} fill="gold" className="absolute top-0 left-0" />
                    ) : product.rating >= ratingValue - 0.5 ? (
                      <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                        <FaStar size={10} fill="gold" />
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <span className="text-xs flex items-center">({product.reviews})</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList