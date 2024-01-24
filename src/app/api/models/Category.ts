import { Lookup } from "./Lookup";

export interface Category {
    id?: number, 
    title?: string,
    lookups?: Array<Lookup>,
    isDeleted?: boolean,
    code?: string,
}