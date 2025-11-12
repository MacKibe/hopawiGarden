import { FaWhatsapp } from "react-icons/fa";
import {
  FaFacebook,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";

const Socialsection = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/profile.php?id=61578230820890",
      color: "bg-blue-600 hover:bg-blue-700",
      name: "Facebook",
    },
    {
      icon: FaLinkedin,
      link: "https://www.linkedin.com/in/hopawi-gardens-229972371/",
      color: "bg-blue-800 hover:bg-blue-900",
      name: "LinkedIn",
    },
    {
      icon: FaYoutube,
      link: "https://www.youtube.com/@HOPAWIGardens",
      color: "bg-red-600 hover:bg-red-700",
      name: "YouTube",
    },
    {
      icon: FaInstagram,
      link: "https://www.instagram.com/hopawi_gardens/",
      color: "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700",
      name: "Instagram",
    },
    {
      icon: FaTiktok,
      link: "https://www.tiktok.com/@hopawi_gardens1",
      color: "bg-black hover:bg-gray-800",
      name: "TikTok",
    },
    {
      icon: FaWhatsapp,
      link: "https://wa.me/+254720804523",
      color: "bg-green-600 hover:bg-green-700",
      name: "WhatsApp",
    },
  ];

  return (
    <>
      {/* Social Media Floating Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3">
        {/* Social Media Icons */}
        <div
          className={`flex flex-col space-y-3 transition-all duration-500 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}
        >
          {socials.map((social, index) => {
            const IconComponent = social.icon;
            return (
              <Link
                key={index}
                to={social.link}
                className={`
                  ${social.color}
                  flex items-center justify-center
                  w-12 h-12 rounded-full
                  text-white shadow-lg
                  transform transition-all duration-300 ease-in-out
                  hover:scale-110 hover:shadow-xl
                  group relative
                  backdrop-blur-sm
                `}
                title={social.name}
              >
                <IconComponent size={20} />
                {/* Enhanced Tooltip */}
                <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2 shadow-lg">
                  {social.name}
                  <span className="absolute top-1/2 right-0 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></span>
                </span>
              </Link>
            );
          })}
        </div>

        {/* Enhanced Main Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative
            flex items-center justify-center
            w-auto min-w-[140px] h-14
            rounded-full
            bg-gradient-to-r from-green-600 to-green-800
            text-white font-semibold
            shadow-lg hover:shadow-xl
            transform transition-all duration-500 ease-in-out
            hover:scale-105
            group
            overflow-hidden
            ${isOpen ? "bg-gradient-to-r from-gray-700 to-gray-900" : ""}
          `}
          aria-label="Toggle social media links"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Button content */}
          <div className="relative z-10 flex items-center justify-center space-x-2 px-4">
            <svg
              className={`w-5 h-5 transition-transform duration-500 ${
                isOpen ? "rotate-45 scale-110" : "rotate-0"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-sm font-medium tracking-wide">
              {isOpen ? "Close" : "Our Socials"}
            </span>
          </div>

          {/* Pulse animation when closed */}
          {!isOpen && (
            <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
          )}

          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">{socials.length}</span>
          </div>
        </button>
      </div>
    </>
  );
};

export default Socialsection;