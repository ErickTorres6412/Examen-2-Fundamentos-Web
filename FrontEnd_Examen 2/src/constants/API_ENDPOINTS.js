export const API_ENDPOINTS = {
  DEPARMENT: {
    BASE: '/Department',
    GET_ALL: '/Department',
    GET_BY_ID: (id) => `/Department/${id}`,
    CREATE: '/Department',
    UPDATE: (id) => `/Department/${id}`,
    DELETE: (id) => `/Department/${id}`
  }
};
