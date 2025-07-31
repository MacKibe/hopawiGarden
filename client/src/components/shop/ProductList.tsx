import { CiShoppingCart, CiStar } from "react-icons/ci";
import { products } from "../../data/products";

const ProductList = () => {
  return (
    <div className="grid grid-cols-5">
      {products.map((product) => (
        <div key={product.id} className="card">
          <div className="card-img" style={{ backgroundImage: `url(${product.image})`}}></div>
          <div className="p-4">
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-[var(--text)]">{product.description}</p>
            <div className="flex items-center gap-1 my-2">
              <CiStar size={20} fill="gold"/> 
              <span>{product.rating} Stars</span>
              <span className="text-xs">({product.reviews} reviews)</span>
            </div>
            <div className="flex justify-between items-center mt-4">
              <h6 className="font-bold text-[var(--background)]">
                Kshs {product.price.toLocaleString()}
              </h6>
              <button className="btn btn-primary flex items-center gap-2">
                <CiShoppingCart size={20}/> Add To Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList