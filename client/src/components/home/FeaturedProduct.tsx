import { FaCartPlus } from "react-icons/fa"
import { Link } from "react-router"
import { products } from "../../data/products"

const FeaturedProduct = () => {
    return(
        <section className="bg-[var(--background)] text-[var(--primary)]">
            <div className="container">
                <h3>Featured Products</h3>
                <h4 className="text-lg max-w-2xl mx-auto my-4">Handpicked favorites from our collection, loved by plant enthusiasts</h4>
                <div className="grid-responsive mt-8">
                    {products.slice(0, 5).map((product) => (
                        <div key={product.id} className="card">
                            <div className="p-4 text-left">
                                <h5 className="text-xl">{product.name}</h5>
                                <p className="text-sm text-[var(--text)]">{product.description}</p>
                            </div>
                            <div className="card-img" style={{ backgroundImage: `url(${product.image})`}}></div>
                            <div className="flex justify-between items-center p-4">
                                <p className="text-[var(--background)] font-bold">Kshs {product.price.toLocaleString()}</p>
                                <Link to={`/shop/${product.id}`} className="text-[var(--background)] hover:text-[var(--accent)] transition">
                                    <FaCartPlus size={24}/>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <Link to="/shop" className="btn btn-primary">View All Products</Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedProduct