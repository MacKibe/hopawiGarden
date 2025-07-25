import img from "../assets/flower.jpg";
import img1 from "../assets/flower2.jpg";
import img2 from "../assets/flower3.jpg";
import img3 from "../assets/garden.jpg";
import img4 from "../assets/garden2.jpg";
import img5 from "../assets/img.jpg";
import img6 from "../assets/img_back.jpg";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

const images = [img, img1, img2, img3, img4, img5, img6];

const plantNames = [
  "Fiddle Leaf Fig", "Snake Plant", "Peace Lily", "Spider Plant", "Aloe Vera",
  "Monstera Deliciosa", "Areca Palm", "Rubber Plant", "ZZ Plant", "Jade Plant",
  "Dracaena", "Pothos", "Calathea", "Bird of Paradise", "Boston Fern",
  "Chinese Evergreen", "Croton", "Dieffenbachia", "Majesty Palm", "Philodendron",
  "Bamboo Palm", "Dumb Cane", "Anthurium", "Peperomia", "Aglaonema",
  "Parlor Palm", "Kalanchoe", "Schefflera", "Moth Orchid", "Kentia Palm",
  "Hoya", "Alocasia", "Oxalis", "Cast Iron Plant", "Yucca", "Prayer Plant",
  "String of Pearls", "English Ivy", "Cactus Mix", "Money Tree",
  "Succulent Set", "Lavender", "Rosemary", "Mint", "Basil", "Thyme",
  "Lemon Balm", "Gardenia", "Chrysanthemum", "Geranium"
];

export const products: Product[] = plantNames.map((name, index) => ({
  id: index + 1,
  name,
  description: `${name} for your home or office.`,
  price: Math.floor(800 + Math.random() * 2500), // Random price between 800 - 3300
  image: images[index % images.length],
  rating: Math.floor(3 + Math.random() * 2), // Rating 3 to 5
  reviews: Math.floor(10 + Math.random() * 150), // Reviews 10 to 160
}));
