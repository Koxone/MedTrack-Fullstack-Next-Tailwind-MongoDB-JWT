'use client';

import { useEffect, useMemo, useState } from 'react';

import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import InputField from './formFields/InputField';
import SelectField from './formFields/SelectField';
import SectionContainer from './components/SectionContainer';
import TextareaField from './formFields/TextareaField';
import DateField from './formFields/DateField';
import CheckboxGroupField from './formFields/CheckboxGroupField';
import RadioGroupField from './formFields/RadioGroupField';

// Source of Truth
import questions from '@/data/questions.json';

export default function MedicalHistoryForm() {
  // Form States
  const [formData, setFormData] = useState({});

  // Tabs State
  const [activeTab, setActiveTab] = useState('weight');
  const [activeQuestions, setActiveQuestions] = useState([]);

  useEffect(() => {
    setActiveQuestions(
      questions.filter(
        (question) =>
          question.specialties.includes(activeTab) && question.versions.includes('short')
      )
    );
  }, [activeTab, questions]);

  function FieldRenderer({ q, value, onChange }) {
    const { id, question, type, placeholder, required, options } = q;

    switch (type) {
      // Text input
      case 'text':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <input
              type="text"
              required={required}
              value={value || ''}
              onChange={(e) => onChange(id, e.target.value)}
              placeholder={placeholder || ''}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
            />
          </div>
        );

      // Number input
      case 'number':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <input
              type="number"
              required={required}
              value={value || ''}
              onChange={(e) => onChange(id, e.target.value)}
              placeholder={placeholder || ''}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
            />
          </div>
        );

      // Date input
      case 'date':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <input
              type="date"
              required={required}
              value={value || ''}
              onChange={(e) => onChange(id, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
            />
          </div>
        );

      // Textarea
      case 'textarea':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <textarea
              required={required}
              value={value || ''}
              onChange={(e) => onChange(id, e.target.value)}
              placeholder={placeholder || ''}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
              rows={3}
            />
          </div>
        );

      // Select
      case 'select':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <select
              required={required}
              value={value || ''}
              onChange={(e) => onChange(id, e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 md:py-3"
            >
              <option value="">Seleccione</option>
              {options?.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        );

      // Radio
      case 'radio':
        return (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">{question}</label>
            <div className="flex flex-wrap gap-4">
              {options?.map((opt) => (
                <label key={opt} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`q-${id}`}
                    value={opt}
                    checked={value === opt}
                    onChange={() => onChange(id, opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        );

      // Default
      default:
        return null;
    }
  }

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">Selecciona el tipo de consulta</p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(formData);
            }}
            className="grid grid-cols-2 items-center space-x-4 p-4 md:p-8"
          >
            {/* Questions */}
            {activeQuestions.map((q) => (
              <FieldRenderer
                key={q.id}
                q={q}
                value={formData[q.id]}
                onChange={(id, val) => setFormData((prev) => ({ ...prev, [id]: val }))}
              />
            ))}

            {/* Actions */}
            <ActionButtons activeTab={activeTab} />
          </form>
        </div>

        {/* Progress */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
          <div className="h-2 w-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </div>
  );
}
