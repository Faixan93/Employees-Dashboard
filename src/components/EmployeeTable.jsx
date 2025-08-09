import React, { useMemo } from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import { formatDate } from "../utils/format";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

/**
 * EmployeeTable Component
 * Renders a responsive, sortable, paginated employee list table
 * using react-table hooks.
 *
 * Props:
 * - data (Array): Employee list data
 * - onDelete (Function): Callback when deleting an employee
 * - onEdit (Function): Callback when editing an employee
 */
export default function EmployeeTable({ data, onDelete, onEdit }) {
  /**
   * Memoized table column definitions
   * - Prevents unnecessary re-renders when props don't change
   * - Includes custom cell renderers for index, formatted date, and action buttons
   */
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
        Cell: ({ row }) => row.index + 1, // Display row number instead of DB ID
      },
      { Header: "Name", accessor: "name" },
      { Header: "Email", accessor: "email" },
      { Header: "Designation", accessor: "designation" },
      { Header: "Department", accessor: "department" },
      {
        Header: "Joining Date",
        accessor: "joiningDate",
        Cell: ({ value }) => formatDate(value), // Format date for display
      },
      {
        Header: "Actions",
        accessor: "actions",
        disableSortBy: true, // Prevent sorting on actions column
        Cell: ({ row }) => (
          <div className="flex gap-2">
            {/* Edit Button */}
            <button
              title="Edit"
              onClick={() => onEdit && onEdit(row.original)} // Pass full employee data to edit handler
              className="p-2 border rounded hover:bg-gray-100"
            >
              <PencilSquareIcon className="h-5 w-5 text-indigo-600" />
            </button>

            {/* Delete Button */}
            <button
              title="Delete"
              onClick={() => onDelete(row.original.id)}
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              <TrashIcon className="h-5 w-5 text-red-600" />
            </button>
          </div>
        ),
      },
    ],
    [onDelete, onEdit]
  );

  /**
   * React Table Instance
   * - useSortBy: Adds column sorting
   * - usePagination: Adds pagination support
   */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // Current page rows
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data: data || [], // Ensure table works even if data is null
      initialState: { pageSize: 5 }, // Default rows per page
    },
    useSortBy,
    usePagination
  );

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* ===== Table Wrapper (for horizontal scrolling on mobile) ===== */}
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-[800px] w-full border-collapse"
        >
          {/* ===== Table Header ===== */}
          <thead className="bg-gray-50">
            {headerGroups.map((hg) => (
              <tr {...hg.getHeaderGroupProps()}>
                {hg.headers.map((col) => (
                  <th
                    {...col.getHeaderProps(col.getSortByToggleProps())}
                    className="px-4 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer whitespace-nowrap"
                  >
                    {col.render("Header")}
                    {/* Sort Indicator */}
                    {col.isSorted
                      ? col.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* ===== Table Body ===== */}
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-50">
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-4 py-3 text-sm text-gray-600 border-t whitespace-nowrap"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== Pagination Controls ===== */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-gray-50 gap-3">
        {/* Navigation Buttons */}
        <div>
          <button
            disabled={!canPreviousPage}
            onClick={previousPage}
            className="text-white bg-indigo-600 px-4 py-2 rounded-lg disabled:opacity-50 mr-2"
          >
            Prev
          </button>
          <button
            disabled={!canNextPage}
            onClick={nextPage}
            className="text-white bg-indigo-600 px-4 py-2 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Page Indicator */}
        <div className="text-sm text-gray-600">
          Page {pageIndex + 1}
        </div>
      </div>
    </div>
  );
}
