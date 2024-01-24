import { Doctor } from "./Doctor";
import { Patient } from "./Patient";

export interface Appointment {
    id?: number, 
    patientId?: number,
    patient?: Patient,
    doctorId?: number,
    doctor?: Doctor,
    visitTime?: Date,
    isDeleted?: boolean
}