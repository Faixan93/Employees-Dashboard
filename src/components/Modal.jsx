/**
 * Modal Component
 * Displays a centered overlay dialog with a title, close button, and custom content.
 *
 * Props:
 * - open (boolean): Controls whether the modal is visible
 * - title (string): Title text displayed in the modal header
 * - children (ReactNode): Main content of the modal
 * - onClose (function): Callback fired when the close button is clicked
 */
export default function Modal({ open, title, children, onClose }) {
  // Do not render anything if modal is closed
  if (!open) return null;

  return (
    // ===== Overlay Background =====
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 px-4 sm:px-0">
      
      {/* ===== Modal Container ===== */}
      <div className="bg-white rounded-lg w-full sm:max-w-2xl p-4 sm:p-6 transform transition-transform duration-200 scale-100">
        
        {/* ===== Header ===== */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-base sm:text-lg font-semibold">{title}</h3>
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* ===== Content Area ===== */}
        <div className="overflow-y-auto max-h-[75vh]">
          {children}
        </div>
      </div>
    </div>
  );
}
