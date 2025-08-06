import img from "../assets/src.png";
import img1 from "../assets/src1.png";
import img2 from "../assets/src2.png";
import img3 from "../assets/src3.png";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
}

const images = [img, img1, img2, img3];

const plantNames = [
  "Pilea peperomioides",  "Rubber plant",  "Leopard lily",  "Croton",  "Ghost plant",  "Echeveria",  "Blue pearl",  "Radiator plant",
  "Haworthia Zebrina",  "Money tree",  "Jade plant",  "Caladium bicolor",  "Peace lily",  "Penthas plant",  "Artemisia",  "English Ivy",
  "White widow",  "Calathea",  "Pheasant Tail",  "Begonia",  "Bloodleaf",  "Aluminium plant",  "Pink panther plant"
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
