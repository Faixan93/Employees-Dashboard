import { useMemo, useState, useEffect } from "react";
import useEmployees from "../hooks/useEmployees";
import EmployeeTable from "../components/EmployeeTable";
import Modal from "../components/Modal";
import AddEmployee from "./AddEmployee";
import { MagnifyingGlassIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * Employees Page
 * --------------
 * Main container for managing employees.
 * Features:
 * - Search, filter by department
 * - Add, edit, delete employees
 * - Modal form for creation/edit
 * - Toast notifications for feedback
 */
export default function Employees() {
  // Data & API hooks
  const { employees, loading, create, remove, fetch, edit } = useEmployees();

  // UI state
  const [open, setOpen] = useState(false);       // modal open state
  const [editing, setEditing] = useState(null);  // employee being edited
  const [dept, setDept] = useState("");          // department filter
  const [search, setSearch] = useState("");      // search term

  // Compute list of unique departments for filter dropdown
  const departments = useMemo(() => {
    const s = new Set();
    employees.forEach((e) => e.department && s.add(e.department));
    return Array.from(s);
  }, [employees]);

  // Fetch employees whenever filters change
  useEffect(() => {
    const params = {};
    if (dept) params.department = dept;
    if (search) params.q = search;
    fetch(params);
  }, [dept, search, fetch]);

  /**
   * Handle form submission for adding/updating employees.
   * - If editing: update existing employee.
   * - If adding: create new employee.
   */
  const handleSubmit = async (payload) => {
    try {
      if (editing && editing.id) {
        await edit(editing.id, payload);
        toast.success("Employee updated");
      } else {
        await create(payload);
        toast.success("Employee added");
      }
      setOpen(false);
      setEditing(null);
    } catch (e) {
      toast.error("Failed to save");
    }
  };

  /**
   * Handle deletion of employee after user confirmation.
   */
  const handleDelete = async (id) => {
    if (!confirm("Delete this employee?")) return;
    try {
      await remove(id);
      toast.success("Deleted");
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  /**
   * Open modal for editing selected employee.
   */
  const handleEdit = (employee) => {
    setEditing(employee);
    setOpen(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Employees</h1>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full sm:w-auto">
          
          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employees..."
              className="pl-10 pr-3 py-2 border rounded-lg w-full outline-none focus:border-indigo-500"
            />
          </div>

          {/* Department Filter */}
          <div className="relative w-full sm:w-64">
            <select
              value={dept}
              onChange={(e) => setDept(e.target.value)}
              className="w-full pl-3 pr-10 py-2 border rounded-lg appearance-none bg-white cursor-pointer outline-none focus:border-indigo-500"
            >
              <option value="">All Departments</option>
              {departments.map((d) => (
                <option value={d} key={d}>
                  {d}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>

          {/* Add Employee Button */}
          <button
            onClick={() => { setEditing(null); setOpen(true); }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md w-full sm:w-auto"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* Employee Table or Loader */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <EmployeeTable data={employees} onDelete={handleDelete} onEdit={handleEdit} />
      )}

      {/* Modal with Add/Edit Form */}
      <Modal
        open={open}
        title={editing ? "Edit Employee" : "Add Employee"}
        onClose={() => { setOpen(false); setEditing(null); }}
      >
        <AddEmployee
          initial={editing || {}}
          onClose={() => { setOpen(false); setEditing(null); }}
          onSubmit={handleSubmit}
        />
      </Modal>

      {/* Toast Notification Container */}
      <ToastContainer position="bottom-right" />
    </div>
  );
}
