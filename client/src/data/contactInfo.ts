import React from "react";
import { TbMessageDots } from "react-icons/tb";
import { RiPlantFill } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";
import type { ContactInfo } from "../types";

const iconSizeNumber = 25;

export const contactInfo: ContactInfo[] = [
  {
    icon: React.createElement(RiPlantFill, {size : iconSizeNumber}),
    iconSize: 25,
    title: "Visit our garden",
    content: {
      heading: "Greenfield",
      subHeading: "Kamiti Rd, Opposite WoodCreek",
      link: "https://maps.app.goo.gl/W7WAqbg1JhovujST8",
      linkText: "Get Directions"
    }
  },
  {
    icon: React.createElement(FiPhoneCall, {size : iconSizeNumber}),

    iconSize: 25,
    title: "Call Us Today",
    content: {
      heading: "(+254) 720 804523",
      subHeading: "Mon - Fri, 9am - 5pm",
      link: "tel:+254720804523",
      linkText: "Call Now"
    }
  },
  {
    icon: React.createElement(TbMessageDots, {size : iconSizeNumber}),
    iconSize: 25,
    title: "Email Us",
    content: {
      heading: "greenery@hopawigardens.com",
      subHeading: "We usually respond within 24 hrs",
      link: "mailto:greenery@hopawigardens.com",
      linkText: "Send Email"
    }
  }
];