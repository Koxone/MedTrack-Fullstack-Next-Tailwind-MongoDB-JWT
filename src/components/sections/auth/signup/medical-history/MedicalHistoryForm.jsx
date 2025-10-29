'use client';

import { useState } from 'react';

import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';
import InputField from './formFields/InputField';
import SelectField from './formFields/SelectField';
import SectionContainer from './components/SectionContainer';
import TextareaField from './formFields/TextareaField';
import DateField from './formFields/DateField';
import CheckboxGroupField from './formFields/CheckboxGroupField';
import RadioGroupField from './formFields/RadioGroupField';

/* Config */
import {
  OPTIONS,
  DISEASES_OPTIONS,
  FAMILY_HISTORY_OPTIONS,
  PERSONAL_PATH_OPTIONS,
  IMMUNIZATIONS_OPTIONS,
  BASIC_INFO_FIELDS,
  GENERAL_INFO_GROUPS,
  TABS_CONFIG,
  BACKGROUND_GROUPS,
  PHYSICAL_EXAM_FIELDS,
  CLINICAL_SECTIONS,
  OBSERVATIONS_FIELDS,
} from './formFields/medicalHistoryConfig';

/* ============== Helpers ============== */
function computeAge(dateStr) {
  if (!dateStr) return '';
  const today = new Date();
  const dob = new Date(dateStr);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age >= 0 ? String(age) : '';
}

function computeIMC(weightKg, heightCm) {
  const w = parseFloat(weightKg);
  const h = parseFloat(heightCm) / 100;
  if (!w || !h) return '';
  const bmi = w / (h * h);
  return isFinite(bmi) ? String(Number(bmi.toFixed(1))) : '';
}

/* ============== Field Renderer ============== */
function FieldRenderer({ field, runtimeValues, setRuntimeValues }) {
  // Shortcuts
  const { type, label, rows, name, options, placeholder, readOnly, valueKey, gridSpan, required } =
    field || {};

  const val =
    valueKey &&
    {
      fechaNacimiento: runtimeValues.fechaNacimiento,
      alturaCm: runtimeValues.alturaCm,
      pesoActualKg: runtimeValues.pesoActualKg,
      edad: computeAge(runtimeValues.fechaNacimiento),
      imc: computeIMC(runtimeValues.pesoActualKg, runtimeValues.alturaCm),
    }[valueKey];

  const onChange =
    valueKey &&
    {
      fechaNacimiento: (e) =>
        setRuntimeValues((s) => ({ ...s, fechaNacimiento: e?.target?.value || e })),
      alturaCm: (e) => setRuntimeValues((s) => ({ ...s, alturaCm: e?.target?.value })),
      pesoActualKg: (e) => setRuntimeValues((s) => ({ ...s, pesoActualKg: e?.target?.value })),
    }[valueKey];

  const sharedProps = {
    label,
    placeholder,
    required,
    ...(readOnly ? { readOnly: true } : {}),
    ...(valueKey && val !== undefined ? { value: val } : {}),
    ...(onChange ? { onChange } : {}),
  };

  // Grid span utility
  const wrapperClass = gridSpan === 'full' ? 'col-span-1 md:col-span-2' : 'col-span-1';

  // Switch
  if (type === 'input') {
    return (
      <div className={wrapperClass}>
        <InputField type={field.inputType || 'text'} {...sharedProps} />
      </div>
    );
  }
  if (type === 'select') {
    return (
      <div className={wrapperClass}>
        <SelectField options={options || []} {...sharedProps} />
      </div>
    );
  }
  if (type === 'textarea') {
    return (
      <div className={wrapperClass}>
        <TextareaField rows={rows || 2} {...sharedProps} />
      </div>
    );
  }
  if (type === 'date') {
    return (
      <div className={wrapperClass}>
        <DateField {...sharedProps} />
      </div>
    );
  }
  if (type === 'radio') {
    return (
      <div className={wrapperClass}>
        <RadioGroupField name={name} options={options || OPTIONS.yesNo} label={label} />
      </div>
    );
  }
  if (type === 'checkboxGroup') {
    return (
      <div className={wrapperClass}>
        <CheckboxGroupField label={label} options={options || []} />
      </div>
    );
  }
  return null;
}

/* ============== Main ============== */
export default function MedicalHistoryForm() {
  // Local States
  const [activeTab, setActiveTab] = useState('peso');

  const [runtimeValues, setRuntimeValues] = useState({
    fechaNacimiento: '',
    alturaCm: '',
    pesoActualKg: '',
  });

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Selecciona el tipo de consulta de tu interes
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          <form className="p-4 md:p-8">
            {/* ========== Información básica ========== */}
            <SectionContainer title="Información básica">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {BASIC_INFO_FIELDS.map((f) => (
                  <FieldRenderer
                    key={f.key || f.label}
                    field={f}
                    runtimeValues={runtimeValues}
                    setRuntimeValues={setRuntimeValues}
                  />
                ))}
              </div>
            </SectionContainer>

            {/* ========== Información general ========== */}
            <SectionContainer title="Información general">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {GENERAL_INFO_GROUPS.top.map((f) => (
                  <FieldRenderer
                    key={f.key || f.label}
                    field={f}
                    runtimeValues={runtimeValues}
                    setRuntimeValues={setRuntimeValues}
                  />
                ))}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <FieldRenderer
                  field={{
                    type: 'checkboxGroup',
                    label: 'Enfermedades',
                    options: DISEASES_OPTIONS,
                    gridSpan: 'full',
                  }}
                  runtimeValues={runtimeValues}
                  setRuntimeValues={setRuntimeValues}
                />
                <FieldRenderer
                  field={{
                    type: 'textarea',
                    label: 'Enfermedades: otras',
                    rows: 2,
                    gridSpan: 'full',
                  }}
                  runtimeValues={runtimeValues}
                  setRuntimeValues={setRuntimeValues}
                />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {GENERAL_INFO_GROUPS.bottom.map((f) => (
                  <FieldRenderer
                    key={f.key || f.label}
                    field={f}
                    runtimeValues={runtimeValues}
                    setRuntimeValues={setRuntimeValues}
                  />
                ))}
              </div>
            </SectionContainer>

            {/* ========== Tabs dinámicos ========== */}
            {TABS_CONFIG[activeTab]?.sections?.map((section) => (
              <SectionContainer key={section.title} title={section.title}>
                <div
                  className={
                    section.grid
                      ? 'grid grid-cols-1 gap-4 md:grid-cols-2'
                      : 'grid grid-cols-1 gap-4'
                  }
                >
                  {section.fields.map((f) => (
                    <FieldRenderer
                      key={f.key || f.label}
                      field={f}
                      runtimeValues={runtimeValues}
                      setRuntimeValues={setRuntimeValues}
                    />
                  ))}
                </div>
              </SectionContainer>
            ))}

            {/* ========== Antecedentes ========== */}
            <SectionContainer title="Antecedentes">
              <div className="grid grid-cols-1 gap-6">
                <FieldRenderer
                  field={{
                    type: 'checkboxGroup',
                    label: 'Heredofamiliares',
                    options: FAMILY_HISTORY_OPTIONS,
                  }}
                  runtimeValues={runtimeValues}
                  setRuntimeValues={setRuntimeValues}
                />
                <FieldRenderer
                  field={{
                    type: 'checkboxGroup',
                    label: 'Personales patológicos',
                    options: PERSONAL_PATH_OPTIONS,
                  }}
                  runtimeValues={runtimeValues}
                  setRuntimeValues={setRuntimeValues}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {BACKGROUND_GROUPS.top.map((f) => (
                    <FieldRenderer
                      key={f.key || f.label}
                      field={f}
                      runtimeValues={runtimeValues}
                      setRuntimeValues={setRuntimeValues}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {BACKGROUND_GROUPS.bottom.map((f) => (
                    <FieldRenderer
                      key={f.key || f.label}
                      field={f}
                      runtimeValues={runtimeValues}
                      setRuntimeValues={setRuntimeValues}
                    />
                  ))}
                </div>
                <FieldRenderer
                  field={{
                    type: 'checkboxGroup',
                    label: 'Inmunizaciones',
                    options: IMMUNIZATIONS_OPTIONS,
                  }}
                  runtimeValues={runtimeValues}
                  setRuntimeValues={setRuntimeValues}
                />
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {BACKGROUND_GROUPS.habits.map((f) => (
                    <FieldRenderer
                      key={f.key || f.label}
                      field={f}
                      runtimeValues={runtimeValues}
                      setRuntimeValues={setRuntimeValues}
                    />
                  ))}
                </div>
              </div>
            </SectionContainer>

            {/* ========== Exploración física ========== */}
            <SectionContainer title="Exploración física">
              <div className="grid grid-cols-1 gap-4">
                {PHYSICAL_EXAM_FIELDS.map((f) => (
                  <FieldRenderer
                    key={f.key || f.label}
                    field={f}
                    runtimeValues={runtimeValues}
                    setRuntimeValues={setRuntimeValues}
                  />
                ))}
              </div>
            </SectionContainer>

            {/* ========== Campos clínicos del médico ========== */}
            {CLINICAL_SECTIONS.map((section) => (
              <SectionContainer key={section.title} title={section.title}>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {section.fields.map((f) => (
                    <FieldRenderer
                      key={f.key || f.label}
                      field={f}
                      runtimeValues={runtimeValues}
                      setRuntimeValues={setRuntimeValues}
                    />
                  ))}
                </div>
              </SectionContainer>
            ))}

            {/* ========== Observaciones y complementos ========== */}
            <SectionContainer title="Observaciones y complementos">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {OBSERVATIONS_FIELDS.map((f) => (
                  <FieldRenderer
                    key={f.key || f.label}
                    field={f}
                    runtimeValues={runtimeValues}
                    setRuntimeValues={setRuntimeValues}
                  />
                ))}
              </div>
            </SectionContainer>

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
