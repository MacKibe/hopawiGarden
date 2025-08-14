import { products } from "../../data/products";
import ProductCard from "./ProductCard";

const ProductList = () => {

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.5, ease: "easeOut" }
    })
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {products.map((product, index) => (
        <ProductCard product={product} key={index} cardVariants={cardVariants}/>
      ))}
    </div>
  );
};

export default ProductList;
