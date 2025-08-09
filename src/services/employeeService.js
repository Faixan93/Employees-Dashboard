import axios from 'axios';

/**
 * Axios instance configured with a base API URL.
 * Defaults to local server if REACT_APP_API_URL is not set.
 */
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5001'
});

/**
 * Employee API endpoints
 * These functions provide a clear interface for performing CRUD operations
 * on the employee resource.
 */
export const getEmployees = (params) => API.get('/employees', { params }); // Fetch list (with optional filters)
export const addEmployee = (employee) => API.post('/employees', employee); // Create a new employee
export const updateEmployee = (id, payload) => API.put(`/employees/${id}`, payload); // Update employee by ID
export const deleteEmployee = (id) => API.delete(`/employees/${id}`); // Delete employee by ID
