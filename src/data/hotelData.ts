export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/lokesh-pallagani-878324410',
  instagram: 'https://www.instagram.com/plokesh3617/?hl=en',
};

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  email: 'hello@orangehotel.com',
  location: 'Vijayawada, Andhra Pradesh, India',
};

export const HERO_IMAGE = 'https://images.pexels.com/photos/27275300/pexels-photo-27275300.jpeg?auto=compress&cs=tinysrgb&w=1920';
export const HERO_IMAGE_DARK = 'https://images.pexels.com/photos/12387870/pexels-photo-12387870.jpeg?auto=compress&cs=tinysrgb&w=1920';

export const ABOUT_IMAGE = 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200';

export interface Room {
  name: string;
  description: string;
  price: string;
  image: string;
  features: string[];
}

export const ROOMS: Room[] = [
  {
    name: 'Single Room',
    description: 'Comfortable stay designed for solo travellers.',
    price: '₹1,500',
    image: 'https://images.pexels.com/photos/7722153/pexels-photo-7722153.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['AC', 'Wi-Fi', 'TV'],
  },
  {
    name: 'Double Room',
    description: 'Relaxed, spacious room for two guests.',
    price: '₹2,500',
    image: 'https://images.pexels.com/photos/3688261/pexels-photo-3688261.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['AC', 'Wi-Fi', 'TV'],
  },
  {
    name: 'Deluxe Room',
    description: 'Extra comfort and style for a premium stay.',
    price: '₹3,500',
    image: 'https://images.pexels.com/photos/8134808/pexels-photo-8134808.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['AC', 'King Bed', 'Wi-Fi'],
  },
  {
    name: 'Family Room',
    description: 'Spacious accommodation for the whole family.',
    price: '₹4,500',
    image: 'https://images.pexels.com/photos/2725675/pexels-photo-2725675.jpeg?auto=compress&cs=tinysrgb&w=800',
    features: ['AC', 'Family Space', 'Wi-Fi'],
  },
];

export interface Service {
  icon: string;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  { icon: 'Bell', title: '24/7 Reception', description: 'Assistance whenever you need it.' },
  { icon: 'Wifi', title: 'Free Wi-Fi', description: 'Stay connected throughout the hotel.' },
  { icon: 'Car', title: 'Parking', description: 'Convenient on-site guest parking.' },
  { icon: 'UtensilsCrossed', title: 'Restaurant', description: 'Fresh meals and refreshments daily.' },
  { icon: 'Sparkles', title: 'Room Service', description: 'Comfort delivered right to your room.' },
  { icon: 'Snowflake', title: 'AC Rooms', description: 'Cool, comfortable rooms all year.' },
  { icon: 'Shirt', title: 'Laundry Service', description: 'Convenient laundry and dry cleaning.' },
  { icon: 'ShieldCheck', title: 'Security', description: 'A secure environment for all guests.' },
];

export interface GalleryItem {
  label: string;
  image: string;
}

export const GALLERY: GalleryItem[] = [
  { label: 'Hotel Exterior', image: 'https://images.pexels.com/photos/9119782/pexels-photo-9119782.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Rooms', image: 'https://images.pexels.com/photos/8082217/pexels-photo-8082217.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Restaurant', image: 'https://images.pexels.com/photos/17057034/pexels-photo-17057034.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { label: 'Lobby', image: 'https://images.pexels.com/photos/26729556/pexels-photo-26729556.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

export interface Review {
  stars: number;
  text: string;
  author: string;
}

export const REVIEWS: Review[] = [
  { stars: 5, text: 'Clean rooms, friendly staff and a smooth check-in experience.', author: 'Business Traveller' },
  { stars: 5, text: 'A comfortable option for a family stay with useful facilities.', author: 'Family Guest' },
  { stars: 4, text: 'Good service, convenient location and comfortable rooms.', author: 'Leisure Traveller' },
];

export interface Offer {
  title: string;
  description: string;
  cta: string;
}

export const OFFERS: Offer[] = [
  { title: 'Weekend Offer', description: 'Enjoy a special rate for selected weekend stays.', cta: 'Check Availability' },
  { title: 'Family Package', description: 'Comfortable family accommodation with selected benefits.', cta: 'Book Family Stay' },
  { title: 'Seasonal Discount', description: 'Look out for limited-time seasonal rates throughout the year.', cta: 'View Offer' },
];
