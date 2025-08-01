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
