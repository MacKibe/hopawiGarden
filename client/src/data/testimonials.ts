import profileFemale from "/assets/profile.jpg"
import profileMale from "/assets/profile2.jpg"

export type Testimonial = {
  rating: number;
  message: string;
  author: string;
  imgSrc: string;
};

export const testimonials: Testimonial[] = [
  {
    rating: 5,
    message: "HOPAWI truly transformed my office — so much life and vibrance!",
    author: "Alice Wanjiku",
    imgSrc: profileFemale,
  },
  {
    rating: 4,
    message: "Excellent service and beautiful plant arrangements. Highly recommend.",
    author: "John Mwangi",
    imgSrc: profileMale,
  },
  {
    rating: 5,
    message: "My home has never looked better. The flowers are fresh and stunning.",
    author: "Grace Njeri",
    imgSrc: profileFemale,
  },
  {
    rating: 5,
    message: "Their team was very professional and the delivery was timely.",
    author: "Michael Juma",
    imgSrc: profileMale,
  },
];
