import img from "../assets/flower.jpg"
const ShopPage = () => {
    return(
        <div>
            <h2>Shop All Plants</h2>
            <h3>Discover our complete collection of beautiful plants and accessories</h3>
            <div className="grid grid-cols-5">
                <aside className="border-2 border-[var(--primary)]">

                </aside>
                <main className="col-span-4 p-4">
                    <h4 className="p-2">Showing 8 of 8 products</h4>
                    <section className="grid grid-cols-3 gap-4">
                        <div>
                            <div className="w-full h-64 bg-cover bg-center" style={{ background: `url(${img})`}}></div>
                            <h3>Fiddle Leaf Fig</h3>
                            <h4>Large Indoor Statement Plant</h4>
                            <h5>4 Stars (120 reviews)</h5>
                            <h6>Kshs 2,300</h6>
                            <button className="bg-[var(--primary)] text-[var(--background)] py-2 px-4 rounded-xl">Add To Cart</button>
                        </div>
                        <div>
                            <div className="w-full h-64 bg-cover bg-center" style={{ background: `url(${img})`}}></div>
                            <h3>Fiddle Leaf Fig</h3>
                            <h4>Large Indoor Statement Plant</h4>
                            <h5>4 Stars (120 reviews)</h5>
                            <h6>Kshs 2,300</h6>
                            <button className="bg-[var(--primary)] text-[var(--background)] py-2 px-4 rounded-xl">Add To Cart</button>
                        </div>
                        <div>
                            <div className="w-full h-64 bg-cover bg-center" style={{ background: `url(${img})`}}></div>
                            <h3>Fiddle Leaf Fig</h3>
                            <h4>Large Indoor Statement Plant</h4>
                            <h5>4 Stars (120 reviews)</h5>
                            <h6>Kshs 2,300</h6>
                            <button className="bg-[var(--primary)] text-[var(--background)] py-2 px-4 rounded-xl">Add To Cart</button>
                        </div>
                        <div>
                            <div className="w-full h-64 bg-cover bg-center" style={{ background: `url(${img})`}}></div>
                            <h3>Fiddle Leaf Fig</h3>
                            <h4>Large Indoor Statement Plant</h4>
                            <h5>4 Stars (120 reviews)</h5>
                            <h6>Kshs 2,300</h6>
                            <button className="bg-[var(--primary)] text-[var(--background)] py-2 px-4 rounded-xl">Add To Cart</button>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}

export default ShopPage;