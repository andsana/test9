export interface Category {
  id: string;
  type: string;
  name: string;
}

export type ApiCategory = Omit<Category, 'id'>

export interface CategoriesList {
  [id: string]: ApiCategory
}