import { RootState } from "@/store/reduxstore";
import { StaticImageData } from "next/image";

interface Product {
  id: string
  title: string
  price: number
  image01: StaticImageData
  image02: StaticImageData
  image03: StaticImageData
  category: string
  desc: string
  quantity? : number
}


export default function calculateSubtotal(cartItems: RootState['FoodData']['checkoutdata']) {
    return cartItems.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
  }
  
  export const filterProducts = (products: Product[], searchTerm: string): Product[] => {
    return products.filter((product) =>
      searchTerm === "" || product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  export const sortedProducts = (filterProducts:Product[], sortOrder:string): Product[] => {
    return [...filterProducts].sort((a, b) => {
      if (a.price === b.price) {
        if (sortOrder === 'asc') {
          return a.title.localeCompare(b.title);
        } else if (sortOrder === 'desc') {
          return b.title.localeCompare(a.title);
        }
      }
      return sortOrder === 'asc' ? (a.price - b.price) : (b.price - a.price);
    });
  } 
  
  
  
  
  
  