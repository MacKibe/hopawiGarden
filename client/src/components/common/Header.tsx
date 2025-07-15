import { Link } from "react-router";

const Header = () => {
    return(
        <div className="flex justify-evenly p-4 bg-amber-100">
            <div>
                <h1>HG</h1>
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