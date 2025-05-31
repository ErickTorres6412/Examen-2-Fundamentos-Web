export const API_ENDPOINTS = {
  DEPARMENT: {
    BASE: 'api/Department',
    GET_ALL: 'api/Department',
    GET_BY_ID: (id) => `api/Department/${id}`,
    CREATE: 'api/Department',
    UPDATE: (id) => `api/Department/${id}`,
    DELETE: (id) => `api/Department/${id}`
  },
  PERSON: {
    BASE: 'api/Person',
    GET_ALL: 'api/Person',
    GET_BY_ID: (id) => `api/Person/${id}`,
    CREATE: 'api/Person',
    UPDATE: (id) => `api/Person/${id}`,
    DELETE: (id) => `api/Person/${id}`
  }
};
