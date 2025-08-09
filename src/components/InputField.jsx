/**
 * InputField Component
 * A reusable, styled input field with optional label and icon.
 *
 * Props:
 * - label (string): The text label displayed above the input
 * - icon (React Component): Optional icon component to display inside the input
 * - ...props: Any additional props passed to the <input> element (e.g., type, placeholder, onChange)
 */
export default function InputField({ label, icon: Icon, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {/* Field Label */}
      <label className="text-sm font-medium text-gray-600">{label}</label>

      {/* Input wrapper with optional icon */}
      <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm">
        {Icon && <Icon className="h-5 w-5 text-gray-400 mr-2" />} {/* Icon only if provided */}
        
        {/* Actual input element */}
        <input
          {...props}
          className="flex-1 outline-none text-sm text-gray-700"
        />
      </div>
    </div>
  );
}
