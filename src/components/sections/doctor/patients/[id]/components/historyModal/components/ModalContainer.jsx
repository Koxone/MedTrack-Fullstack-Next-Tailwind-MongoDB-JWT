'use client';

/* container */
export default function ModalContainer({ children, onClick }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="animate-slideUp bg-beehealth-body-main pointer-events-auto max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl shadow-2xl"
        onClick={onClick}
      >
        {children}
      </div>
    </div>
  );
}
