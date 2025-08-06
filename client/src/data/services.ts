import React from "react"
import { PiPlantDuotone } from "react-icons/pi";

export interface ServicesTypes {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const iconSize: number = 40

export const services:ServicesTypes[] = [
    {
        title: "Indoor Potted Plants",
        description: "Beautiful, low-maintenance plants perfect for your home or office interior.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Outdoor Potted Plants",
        description: "Hardy plants that thrive in outdoor conditions and enhance your exterior spaces.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: " HOPAWI Soil Mix",
        description: "Specialized soil blends tailored to different plant needs for optimal growth.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Plant Consultation",
        description: "Expert advice on plant selection, care, and troubleshooting.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Landscaping Services",
        description: "Complete garden design and installation for residential and commercial spaces.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Plant Care & Maintenance",
        description: "Regular care services including watering pruning, fertilizing, and pest control.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    }
]