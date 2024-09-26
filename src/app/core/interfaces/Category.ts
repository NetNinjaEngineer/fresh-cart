import { Subcategory } from "./Subcategory";

export interface Category {
   _id: string;
   name: string;
   slug: string;
   image: string;
   subCategories?: Subcategory[]
}
