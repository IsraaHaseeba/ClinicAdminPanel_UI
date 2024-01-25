export interface Appointment {
    id?: number, 
    patientId?: number,
    patientName?: string,
    doctorId?: number,
    doctorName?: string,
    visitTime?: Date,
}