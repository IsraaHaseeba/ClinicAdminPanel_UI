import { Appointment } from "./Appointment";

export interface Patient {
    id?: number, 
    name?: string,
    birthDate?: Date,
    identityNumber?: number,
    address?: string,
    visits?: Array<Appointment>,
    isDeleted?: boolean
}