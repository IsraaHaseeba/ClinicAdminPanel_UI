export const Models = {
    Doctor: 'Doctor',
    Patient: 'Patient',
    Appointments: 'Visit',
    Lookup: 'Lookup',
    Category: 'Category'
}

export const DoctorEndpoints = {
    getById: '/GetById',
    getAll: '/GetAll',
    addUpdate: '/AddUpdate',
    delete: '/Delete'
}

export const PatientEndpoints = {
    getById: '/GetById',
    getAll: '/GetAll',
    addUpdate: '/AddUpdate',
    delete: '/Delete'
}

export const AppointmentEndpoint = {
    getById: '/GetById',
    getAll: '/GetAll',
    addUpdate: '/AddUpdate',
    delete: '/Delete'
}

export const LookupEndpoint = {
    getById: '/GetById',
    getAll: '/GetAll',
    addUpdate: '/AddUpdate',
    delete: '/Delete',
    getLookupsByCategory: '/GetLookupsByCategory'
}

export const CategoryEndpoint = {
    getById: '/GetById',
    getAll: '/GetAll',
    addUpdate: '/AddUpdate',
    checkIfCodeExist: '/CheckIfCodeExist',
    getByCode: '/GetByCode',
    delete: '/Delete',
}