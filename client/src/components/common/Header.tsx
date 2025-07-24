import { Link } from "react-router";

const Header = () => {
    return(
        <div className="sticky flex justify-evenly gap-64 p-6 bg-[var(--background)] text-[var(--primary)] ">
            <div>
                <p className="text2xl">HG</p>
            </div>
            <ul className="flex gap-16">
                <li><Link to="/">Home</Link></li>
                <li><Link to='/about'>About Us</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
                <li><Link to='/shop' >Shop</Link></li>
            </ul>
            <div>Cart</div>
        </div>
    )
}

export default Header;