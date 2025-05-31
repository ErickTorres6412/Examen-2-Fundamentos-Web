import { createGenericService } from '../services/createGenericService';
import { API_ENDPOINTS } from '../constants/API_ENDPOINTS';

export const departmentService = createGenericService(API_ENDPOINTS.DEPARMENT.BASE);
export const personService  = createGenericService(API_ENDPOINTS.PERSON.BASE);