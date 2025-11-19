import { Link, useNavigate } from "react-router";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useAuthStore from "../../store/useAuthStore";
import { useCartStore } from "../../store/useCartStore";
import type { CartItem } from "../../types";
import { useState } from "react";
import logo from "/assets/HOPAWI_GARDENS_LOGO.png";

const Header = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const { items: cartItems } = useCartStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalItems = cartItems.reduce(
    (sum: number, item: CartItem) => sum + item.quantity,
    0
  );

  const navigate = useNavigate();

  const navItems = [
    { path: "/shop?category=indoor", label: "Indoor potted plants" },
    { path: "/shop?category=outdoor", label: "Outdoor potted plants" },
    { path: "/care_maintainance", label: "Plant care maintainance" },
    { path: "/soil_mixture", label: "HOPAWI compost mixture" },
    { path: "/landscaping", label: "Landscaping" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-center gap-8 py-3 bg-[var(--secondary)] text-black text-bold shadow-md">
        {/* Logo */}
        <div>
          <Link to="/" className="text-xl md:text-2xl font-bold hover:text-[var(--accent)] transition touch-target" onClick={closeMobileMenu}>
            <img src={logo} alt="HOPAWI GARDENS Logo" className="h-8 md:h-10" />
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:block">
          <ul className="flex gap-6">
            {navItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className="hover:underline hover:text-[var(--primary)] hover:decoration-[var(--primary)] underline-offset-8 transition touch-target"
                >
                  {item.label}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition touch-target"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>

          {/* User Actions */}
          <div className="relative flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                {/* Profile - Hidden on mobile, shown on desktop */}
                <Link
                  to="/profile"
                  className="hidden sm:flex h-10 w-10 items-center justify-center bg-[var(--primary)] text-[var(--background)] rounded-full touch-target"
                  onClick={closeMobileMenu}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Link>

                {/* Logout - Hidden on mobile, shown on desktop */}
                <button
                  onClick={() => {
                    logout();
                    closeMobileMenu();
                  }}
                  className="hidden sm:block text-sm hover:text-[var(--accent)] transition touch-target"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Login - Hidden on mobile, shown on desktop */}
                <Link
                  to="/login"
                  className="hidden sm:flex btn-base btn-accent touch-target"
                  onClick={closeMobileMenu}
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Cart Button */}
          <motion.button
            className="p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition relative touch-target"
            onClick={() => {
              navigate("/cart");
              closeMobileMenu();
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Cart</span>
            <FaShoppingCart size={20} />
            {totalItems > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 bg-[var(--accent)] text-[var(--text)] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={totalItems}
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 max-w-full bg-[var(--background)] text-[var(--primary)] shadow-2xl z-50 md:hidden overflow-y-auto"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-[var(--primary)] border-opacity-20">
                <h2 className="text-xl font-bold">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 rounded-full hover:bg-[var(--secondary)] hover:text-[var(--background)] transition touch-target"
                  aria-label="Close menu"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Mobile Navigation */}
              <nav className="p-6">
                <ul className="space-y-4">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        to={item.path}
                        className="block py-3 px-4 text-lg font-medium hover:text-[var(--accent)] hover:bg-[var(--secondary)] hover:bg-opacity-20 rounded-lg transition-all touch-target"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                {/* Mobile User Section */}
                <div className="mt-8 pt-8 border-t border-[var(--primary)] border-opacity-20">
                  {isAuthenticated ? (
                    <div className="space-y-4">
                      {/* Mobile Profile Link */}
                      <Link
                        to="/profile"
                        className="block py-3 px-4 text-lg font-medium hover:text-[var(--accent)] hover:bg-[var(--secondary)] hover:bg-opacity-20 rounded-lg transition-all touch-target"
                        onClick={closeMobileMenu}
                      >
                        My Profile
                      </Link>

                      {/* Mobile Logout */}
                      <button
                        onClick={() => {
                          logout();
                          closeMobileMenu();
                        }}
                        className="w-full text-left py-3 px-4 text-lg font-medium hover:text-[var(--accent)] hover:bg-[var(--secondary)] hover:bg-opacity-20 rounded-lg transition-all touch-target"
                      >
                        Logout
                      </button>
                    </div>
                  ) : (
                    /* Mobile Login */
                    <Link
                      to="/login"
                      className="block w-full text-center py-3 px-4 btn-base btn-accent touch-target"
                      onClick={closeMobileMenu}
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
