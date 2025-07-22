import { PiFlowerTulip } from "react-icons/pi"
import Img from "../../assets/img.jpg"
import Flower from "../../assets/flower.jpg"
import { PiSun } from "react-icons/pi";
import { Link } from "react-router";

const FeatureSection = () =>{
    const featuresDetails = [
        {
            backgroundImg : Img,
            icon : "leaf",
            image: <PiFlowerTulip size={32} />,
            featureName: "Indoor Plants",
            featureDeatails: "Perfect for your living space",
        },
        {
            backgroundImg : Flower,
            icon : "sun",
            image : <PiSun size={32} />,
            featureName: "Outdoor Plants",
            featureDeatails: "Garden Favorites",
        }
    ]
    return(
        <section id="collection" className="flex flex-col items-center">
            <h2>Featured Collections</h2>
            <h3>Explore our carefully curated categories to find the perfect plants for your space</h3>
            <div className="w-full flex flex-row justify-center items-center gap-16">
                {featuresDetails.map((detail, index) => (
                    <div key={index} className="flex flex-col items-center rounded-xl text-[var(--primary)] bg-[var(--background)] shadow-md max-w-xs w-full">
                        <div className="w-full aspect-[5/3] bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${detail.backgroundImg})`}}></div>
                        <div className="flex flex-col items-center p-6 gap-2">
                            <span>{detail.image}</span>
                            <h3 className="text-xl font-semibold">{detail.featureName}</h3>
                            <p className="text-[var(--accent)]">{detail.featureDeatails}</p>
                            <Link to='/shop' className="mt-2 text-[var(--background)] bg-[var(--primary)] py-2 px-4 rounded-lg hover:bg-[var(--accent)] transition">Explore</Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default FeatureSection