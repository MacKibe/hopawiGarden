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
        title: "Indoor potted plants",
        description: "Beautiful, low-maintenance plants perfect for your home or office interior.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Outdoor potted plants",
        description: "Plants that thrive in outdoor conditions and enhance your exterior spaces.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: " HOPAWI compost mixture",
        description: "Specialized soil blends tailored to different plant needs for optimal growth.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Landscaping services",
        description: "Complete garden design and installation for residential and commercial spaces.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    },
    {
        title: "Plant care maintenance",
        description: "Planned regular routine mainatianance service including watering pruning, leaf care, fertilizing, and pest control.",
        icon: React.createElement(PiPlantDuotone, {size: iconSize, className: "text-[var(--accent)]"})
    }
]