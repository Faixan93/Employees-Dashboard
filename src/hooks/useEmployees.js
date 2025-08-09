import { useState, useEffect, useCallback } from 'react';
import * as service from '../services/employeeService';

/**
 * useEmployees Hook
 * Handles fetching, creating, updating, and deleting employee data.
 * Wraps API calls with loading and error state management.
 *
 * Returns:
 * - employees (Array): Current employee list
 * - loading (boolean): Loading state for API requests
 * - error (Error|null): Error object from last failed request
 * - fetch (Function): Fetch employees with optional query params
 * - create (Function): Add a new employee
 * - remove (Function): Delete an employee by ID
 * - edit (Function): Update an employee by ID
 */
export default function useEmployees() {
  // ===== State =====
  const [employees, setEmployees] = useState([]);      // Employee list
  const [loading, setLoading] = useState(false);       // API loading state
  const [error, setError] = useState(null);            // Last error
  const [currentParams, setCurrentParams] = useState({}); // Last used fetch params

  /**
   * Fetch employees from the API
   * @param {Object} params - Optional query parameters
   */
  const fetch = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await service.getEmployees(params);
      setEmployees(res.data);
      setCurrentParams(params);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create a new employee
   * @param {Object} payload - Employee data
   */
  const create = async (payload) => {
    setLoading(true);
    try {
      const res = await service.addEmployee(payload);
      setEmployees((prev) => [...prev, res.data]);
      await fetch(currentParams); // Refresh list with current filters
      return res.data;
    } catch (err) {
      setError(err);
      throw err; // Re-throw so caller can handle
    } finally {
      setLoading(false);
    }
  };

  /**
   * Remove an employee by ID
   * @param {number|string} id - Employee ID
   */
  const remove = async (id) => {
    setLoading(true);
    try {
      await service.deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } finally {
      setLoading(false);
    }
  };

  /**
   * Edit an existing employee
   * @param {number|string} id - Employee ID
   * @param {Object} payload - Updated employee data
   */
  const edit = async (id, payload) => {
    setLoading(true);
    try {
      const res = await service.updateEmployee(id, payload);
      setEmployees((prev) => prev.map((e) => (e.id === id ? res.data : e)));
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  // Fetch initial employee list on mount
  useEffect(() => { fetch(); }, [fetch]);

  // Public API of the hook
  return { employees, loading, error, fetch, create, remove, edit };
}
