import calathea_plant from "/assets/CALATHEA_PLANT.jpeg";
import calla_lily from "/assets/Calla_Lily.jpeg";
import corn_plant from "/assets/Corn_Plant.jpeg";
import cotton_lavender from "/assets/Cotton_Lavender.jpeg";
import cyclamen_persicum from "/assets/Cyclamen_persicum.jpeg";
import elephant_ear from "/assets/Elephant_Ear.jpeg";
import money_plant from "/assets/Money_plant.jpeg";
import snake_plant from "/assets/sakeplat.jpeg";
import zz_plant from "/assets/zzplat.jpeg";
import type { Product } from "../types";


const images = [calathea_plant, calla_lily, corn_plant, cotton_lavender, cyclamen_persicum, elephant_ear, money_plant, snake_plant, zz_plant ];

const plantNames = [
  "Calathea plant",  "Calla Lily",  "Corn Plant",  "Cotton Lavender",  "Cyclamen persicum",  "Elephant Ear",  "Money plant",  "Snake Plant", "zz_plant"];

export const products: Product[] = plantNames.map((name, index) => ({
  id: `${index} + 1`,
  name,
  description: `${name} for your home or office.`,
  price: Math.floor(800 + Math.random() * 2500), // Random price between 800 - 3300
  path: images[index % images.length],
  rating: Math.floor(3 + Math.random() * 2), // Rating 3 to 5
  reviews: Math.floor(10 + Math.random() * 150), // Reviews 10 to 160
}));
