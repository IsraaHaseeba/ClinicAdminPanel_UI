export interface Doctor {
    id?: number,
    name?: string,
    specificationId?: number,
    specificationName?: string,
    locationId?: number,
    locationName?: string,
    fromWorkingHour?: Date,
    toWorkingHour?: Date,
}