import { products } from "../../data/products";
import { CiStar } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => (
        <div key={product.id} className="shadow-md rounded-xl overflow-hidden border">
          <div className="w-full h-50 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }}></div>
          <div className="p-4">
            <h4 className="text-lg font-bold">{product.name}</h4>
            <h5 className="">{product.description}</h5>
            <h5 className="flex justify-start items-center gap-1 p-1">
                <CiStar size={20} fill="gold"/> {product.rating} Stars <p className="text-xs">({product.reviews} reviews)</p>
            </h5>
            <div className="flex justify-between items-center">
                <h6 className="text-md text-[var(--background)] font-bold">
                    Kshs {product.price.toLocaleString()}
                </h6>
                <button className="flex items-center gap-2 bg-[var(--background)] text-[var(--primary)] py-2 px-4 rounded-xl">
                    <CiShoppingCart size={30}/> Add To Cart
                </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;