import { Link } from "react-router"
import { products } from "../../data/products";
import { FaCartPlus } from "react-icons/fa";

const FeaturedProduct = () => {
    return(
        <section className="bg-[var(--background)] text-[var(--primary)]">
            <h3 className="text-center text-[var(--primary)]">Featured Products</h3>
            <h4 className="text-lg text-center">Handpicked favorites from our collection, loved by plant enthusiasts</h4>
            <div className="w-full grid grid-cols-3 gap-8 mt-8">
                {products.slice(0, 5).map((product, index) => (
                    <div key={index} className="flex flex-col rounded-xl text-[var(--background)] bg-[var(--primary)] w-full">
                        <div className="text-left py-4 px-8">
                            <h5 className="text-xl">{product.name}</h5>
                            <p className="">{product.description}</p>
                        </div>
                        <div className="w-full h-50 aspect-[4/3] bg-cover bg-center" style={{ backgroundImage: `url(${product.image})`}}></div>
                        <div className="flex justify-between items-center py-4 px-8">
                            <p className="text-[var(--background)] font-bold text-">Kshs {product.price}</p>
                            <Link to="/shop" className="text-[var(--background)]"><FaCartPlus size={30}/></Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <Link to="/shop" className="bg-[var(--primary)] text-[var(--background)] mt-4 py-2 px-6 rounded-xl">View All Products</Link>
            </div>
        </section>
    )
}

export default FeaturedProduct