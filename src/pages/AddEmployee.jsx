import React, { useState, useEffect } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  CalendarDaysIcon,
  BriefcaseIcon,
} from "@heroicons/react/24/outline";

/**
 * AddEmployee Form Component
 * --------------------------
 * Handles creation and editing of employee records.
 * - Renders a controlled form with basic validation.
 * - Supports both "add" and "edit" modes based on `initial` prop.
 * - Delegates actual save logic to the `onSubmit` callback.
 */
export default function AddEmployee({ onClose, onSubmit, initial = {} }) {
  // Local form state — initialized from `initial` prop for editing
  const [form, setForm] = useState({
    name: initial.name || "",
    email: initial.email || "",
    designation: initial.designation || "",
    department: initial.department || "",
    joiningDate: initial.joiningDate || "",
  });

  // Keep local form state in sync when `initial` changes (important for edit flow)
  useEffect(() => {
    setForm({
      name: initial.name || "",
      email: initial.email || "",
      designation: initial.designation || "",
      department: initial.department || "",
      joiningDate: initial.joiningDate || "",
    });
  }, [initial]);

  // Validation errors
  const [errors, setErrors] = useState({});

  /**
   * Validate form fields before submission.
   * Returns `true` if valid, `false` otherwise.
   */
  const validate = () => {
    const e = {};
    if (!form.name) e.name = "Required";
    if (!form.email) e.email = "Required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
      e.email = "Invalid";
    if (!form.designation) e.designation = "Required";
    if (!form.department) e.department = "Required";
    if (!form.joiningDate) e.joiningDate = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Update form state when inputs change
  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; // stop if validation fails
    await onSubmit(form);
    // We do not close the modal here — parent handles it on success
  };

  // Flag to check if we are in edit mode
  const isEdit = !!initial?.id;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {/* Name */}
      <div>
        <label className="block text-sm">Name</label>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-400" />
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {errors.name && <div className="text-red-600 text-sm">{errors.name}</div>}
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm">Email</label>
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="h-5 w-5 text-gray-400" />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {errors.email && <div className="text-red-600 text-sm">{errors.email}</div>}
      </div>

      {/* Designation */}
      <div>
        <label className="block text-sm">Designation</label>
        <div className="flex items-center gap-2">
          <BriefcaseIcon className="h-5 w-5 text-gray-400" />
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {errors.designation && (
          <div className="text-red-600 text-sm">{errors.designation}</div>
        )}
      </div>

      {/* Department */}
      <div>
        <label className="block text-sm">Department</label>
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
        {errors.department && (
          <div className="text-red-600 text-sm">{errors.department}</div>
        )}
      </div>

      {/* Joining Date */}
      <div>
        <label className="block text-sm">Joining Date</label>
        <div className="flex items-center gap-2">
          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
          <input
            name="joiningDate"
            type="date"
            value={form.joiningDate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        {errors.joiningDate && (
          <div className="text-red-600 text-sm">{errors.joiningDate}</div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
          {isEdit ? "Update" : "Add"}
        </button>
        <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
          Cancel
        </button>
      </div>
    </form>
  );
}
