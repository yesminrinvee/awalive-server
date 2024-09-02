export interface LanguageMap {
    en: string;
    ar: string;
    [key: string]: string; // Add this line
  }


export type TPromotionRoom = {
  
    roomName: LanguageMap
    
    roomImage: string;
    price: number;
    priceHistory?: number
    saleTag: LanguageMap
    numberOfGuests: number[];
    breakfastAvailable: LanguageMap
    description: LanguageMap
    fullDetails: LanguageMap
    quantity: number;
}