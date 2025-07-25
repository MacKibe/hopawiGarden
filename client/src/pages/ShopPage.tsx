import ProductFilter from "../components/shop/ProductFilter";
import ProductList from "../components/shop/ProductList";

const ShopPage = () => {
    return(
        <div className="p-8">
            <h3>Shop All Plants</h3>
            <h4>Discover our complete collection of beautiful plants and accessories</h4>
            <div className="grid grid-cols-5 py-8">
                <ProductFilter/>
                <main className="col-span-4 px-4 py-2">
                    <h4 className="p-2">Showing 50 products</h4>
                    <ProductList/>
                </main>
            </div>
        </div>
    )
}

export default ShopPage;