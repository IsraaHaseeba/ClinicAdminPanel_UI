import { Time } from "@angular/common";
import { Appointment } from "./Appointment";
import { Lookup } from "./Lookup";

export interface Doctor {
    id?: number,
    name?: string,
    specificationId?: number,
    specification?: Lookup,
    locationId?: number,
    location?: Lookup,
    fromWorkingHour?: Date,
    toWorkingHour?: Date,
    visits?: Array<Appointment>,
    isDeleted?: boolean
}