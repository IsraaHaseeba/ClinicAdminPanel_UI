import { Category } from "./Category";

export interface Lookup {
    id?: number,
    name?: string,
    categoryId?: number,
    category?: Category,
    isDeleted?: boolean
}