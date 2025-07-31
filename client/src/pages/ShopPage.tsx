import ProductFilter from "../components/shop/ProductFilter"
import ProductList from "../components/shop/ProductList"
import { products } from "../data/products"

const ShopPage = () => {
    return(
        <div className="container">
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                <div className="lg:w-[25%]">
                    <ProductFilter/>
                </div>
                <div className="lg:w-[75%]">
                    <div className="flex justify-between items-center mb-6">
                        <h4>Showing {products.length} products</h4>
                        <select className="border rounded-lg py-2">
                            <option>Sort by: Featured</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Customer Rating</option>
                        </select>
                    </div>
                    <ProductList/>
                </div>
            </div>
        </div>
    )
}

export default ShopPage