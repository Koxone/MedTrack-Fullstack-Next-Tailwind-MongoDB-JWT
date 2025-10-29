// TextareaField.jsx
export default function TextareaField({
  label,
  placeholder,
  rows = 2,
  required = false,
  color = 'blue',
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">{label}</label>
      <textarea
        rows={rows}
        required={required}
        placeholder={placeholder}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-${color}-500 md:py-3`}
      ></textarea>
    </div>
  );
}
