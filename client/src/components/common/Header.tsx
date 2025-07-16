import { Link } from "react-router";

const Header = () => {
    return(
        <div className="flex justify-evenly gap-64 p-4 bg-[var(--primary)] text-[var(--background)]">
            <div>
                <h1 className="text2xl">HG</h1>
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