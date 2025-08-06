import React from "react";
import { TbMessageDots } from "react-icons/tb";
import { RiPlantFill } from "react-icons/ri";
import { FiPhoneCall } from "react-icons/fi";

export interface ContactInfo {
  icon: React.ReactNode;
  title: string;
  content: {
    heading: string;
    subHeading: string;
    link: string;
    linkText: string;
  };
}

const iconSizeNumber: number = 25

export const contactInfo: ContactInfo[] = [
  {
    icon: React.createElement(RiPlantFill, {size : iconSizeNumber}),
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
    iconSize:iconSizeNumber,
    title: "Email Us",
    content: {
      heading: "greenery@hopawigardens.com",
      subHeading: "We usually respond within 24 hrs",
      link: "mailto:greenery@hopawigardens.com",
      linkText: "Send Email"
    }
  }
];