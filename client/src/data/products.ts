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

export const products: Product[] = [
  {
    id: 1,
    name: "Fiddle Leaf Fig",
    description: "Large Indoor Statement Plant",
    price: 2300,
    image: img,
    rating: 4,
    reviews: 120,
  },
  {
    id: 2,
    name: "Snake Plant",
    description: "Low Maintenance Air Purifier",
    price: 1500,
    image: img1,
    rating: 5,
    reviews: 80,
  },
  {
    id: 3,
    name: "Peace Lily",
    description: "Elegant Flowering Plant",
    price: 1800,
    image: img2,
    rating: 4,
    reviews: 60,
  },
  {
    id: 4,
    name: "Spider Plant",
    description: "Easy Care Hanging Plant",
    price: 1200,
    image: img3,
    rating: 5,
    reviews: 45,
  },
  {
    id: 5,
    name: "Aloe Vera",
    description: "Healing Succulent",
    price: 900,
    image: img4,
    rating: 4,
    reviews: 30,
  },
  {
    id: 6,
    name: "Montera",
    description: "Healing Succulent",
    price: 900,
    image: img5,
    rating: 4,
    reviews: 30,
  },
  {
    id: 7,
    name: "Palm Tree",
    description: "Healing Succulent",
    price: 900,
    image: img6,
    rating: 4,
    reviews: 30,
  },
]; 