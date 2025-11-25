/* Actions */
export default function Actions({ onClose, submitLabel }) {
  return (
    <div className="mt-6 flex gap-3">
      <button
        type="button"
        onClick={onClose}
        className="bg-medtrack-body-main flex-1 rounded-xl border-2 border-gray-300 px-6 py-3.5 font-semibold text-gray-700"
      >
        Cancelar
      </button>
      <button
        type="submit"
        className="bg-medtrack-blue-solid hover:bg-medtrack-blue-hover flex-1 rounded-xl px-6 py-3.5 font-semibold text-white"
      >
        {submitLabel}
      </button>
    </div>
  );
}
