'use client';

// Static imports
import { Heart, Sparkles, ArrowLeft, Check, ClipboardPlus } from 'lucide-react';
import { useState } from 'react';
import TabsHeader from './components/TabsHeader';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import SectionContainer from './components/SectionContainer';
import TextareaField from './components/TextareaField';
import ActionButtons from './components/ActionButtons';

export default function MedicalHistoryForm() {
  // Tabs state
  const [activeTab, setActiveTab] = useState('peso');

  // Render
  return (
    <div className="h-full overflow-y-auto bg-linear-to-br from-blue-50 via-white to-green-50 p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Heart className="h-8 w-8 text-blue-500 md:h-10 md:w-10" />
            <span className="text-2xl font-bold text-gray-900 md:text-3xl">MedTrack</span>
          </div>
          <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Historial Clínico</h1>
          <p className="text-sm text-gray-600 md:text-base">
            Paso 2 de 2: Completa tu información médica
          </p>
        </div>

        {/* Tabs */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
          {/* Tab Selector */}
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Form General Data */}
          <form className="p-4 md:p-8">
            <div className="mb-8">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 md:text-xl">
                Datos Generales
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Age */}
                <InputField type="number" label="Edad" placeholder="30" required />

                {/* Gender */}
                <SelectField
                  label="Genero"
                  required
                  color="blue"
                  options={[
                    { value: 'masculino', label: 'Masculino' },
                    { value: 'femenino', label: 'Femenino' },
                  ]}
                />

                {/* Height */}
                <InputField type="number" label="Altura" placeholder="170" required />

                {/* Current Weight */}
                <InputField type="number" label="Peso Actual (kg)" placeholder="75" required />

                {/* Talla */}
                <InputField
                  type="number"
                  label="Talla (en Centimetros"
                  placeholder="120"
                  required
                />
              </div>
            </div>

            {/* Weight-control section */}
            {activeTab === 'peso' && (
              <SectionContainer title="Información para Control de Peso">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Target Weight */}
                  <InputField type="number" label="Peso Objetivo (kg)" placeholder="65" required />

                  {/* Physical Activity */}
                  <SelectField
                    label="Actividad Física"
                    required
                    color="blue"
                    options={[
                      { value: 'sedentario', label: 'Sedentario' },
                      { value: 'ligero', label: 'Ligero (1-2 días/semana)' },
                      { value: 'moderado', label: 'Moderado (3-5 días/semana)' },
                      { value: 'intenso', label: 'Intenso (6-7 días/semana)' },
                    ]}
                  />

                  {/* Sleeping Hours */}
                  <InputField type="number" label="Horas de Sueño" placeholder="7" required />

                  {/* Water Intake */}
                  <InputField
                    type="number"
                    label="Consumo de Agua (litros/día)"
                    placeholder="2"
                    required
                  />
                </div>

                {/* Chronic Diseases */}
                <TextareaField
                  label="Enfermedades Crónicas"
                  placeholder="Diabetes, hipertensión, tiroides, etc. (opcional)"
                  rows={2}
                  color="blue"
                />

                {/* Current Medications */}
                <TextareaField
                  label="Medicamentos Actuales"
                  placeholder="Lista de medicamentos que tomas actualmente (opcional)"
                  rows={2}
                  color="blue"
                />

                {/* Food Allergies */}
                <TextareaField
                  label="Alergias Alimentarias"
                  placeholder="Alergias o intolerancias alimentarias (opcional)"
                  rows={2}
                  color="blue"
                />

                {/* Eating Habits */}
                <TextareaField
                  label="Tipos de Alimentación"
                  placeholder="Describe tu alimentación típica diaria"
                  rows={3}
                  required
                  color="blue"
                />

                {/* Previous Surgeries */}
                <TextareaField
                  label="Cirugías Previas"
                  placeholder="Cualquier tipo de intervención quirúrgica anterior"
                  rows={2}
                  color="blue"
                />

                {/* Consultation Reason */}
                <TextareaField
                  label="Motivo de Consulta"
                  placeholder="¿Qué te motivó a buscar ayuda para el control de peso?"
                  rows={3}
                  required
                  color="blue"
                />
              </SectionContainer>
            )}

            {/* Aesthetic section */}
            {activeTab === 'estetico' && (
              <SectionContainer title="Información para Tratamiento Estético">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Treatment Of Interest */}
                  <SelectField
                    label="Tratamiento de Interés"
                    required
                    color="purple"
                    options={[
                      { value: 'botox', label: 'Botox' },
                      { value: 'rellenos', label: 'Rellenos Dérmicos' },
                      { value: 'peeling', label: 'Peeling Químico' },
                      { value: 'laser', label: 'Láser Facial' },
                      { value: 'hilos', label: 'Hilos Tensores' },
                      { value: 'plasma', label: 'Plasma Rico en Plaquetas' },
                      { value: 'otro', label: 'Otro' },
                    ]}
                  />

                  {/* Treatment Area */}
                  <SelectField
                    label="Zona a Tratar"
                    required
                    color="purple"
                    options={[
                      { value: 'frente', label: 'Frente' },
                      { value: 'entrecejo', label: 'Entrecejo' },
                      { value: 'patas-gallo', label: 'Patas de Gallo' },
                      { value: 'labios', label: 'Labios' },
                      { value: 'pomulos', label: 'Pómulos' },
                      { value: 'mandibula', label: 'Mandíbula' },
                      { value: 'cuello', label: 'Cuello' },
                      { value: 'rostro-completo', label: 'Rostro Completo' },
                    ]}
                  />
                </div>

                {/* Previous Treatments */}
                <TextareaField
                  label="Tratamientos Estéticos Previos"
                  placeholder="Describe tratamientos estéticos anteriores y resultados (opcional)"
                  rows={3}
                  color="purple"
                />

                {/* Treatment Expectations */}
                <TextareaField
                  label="Expectativas del Tratamiento"
                  placeholder="¿Qué esperas lograr con este tratamiento?"
                  rows={3}
                  required
                  color="purple"
                />

                {/* Skin Conditions */}
                <TextareaField
                  label="Condiciones de la Piel"
                  placeholder="Acné, rosácea, manchas, cicatrices, etc. (opcional)"
                  rows={2}
                  color="purple"
                />

                {/* Pregnancy Or Lactation */}
                <SelectField
                  label="¿Embarazo o Lactancia?"
                  required
                  color="purple"
                  options={[
                    { value: 'no', label: 'No' },
                    { value: 'embarazo', label: 'Embarazo' },
                    { value: 'lactancia', label: 'Lactancia' },
                    { value: 'planificando', label: 'Planificando embarazo' },
                  ]}
                />

                {/* Previous Aesthetic Surgeries */}
                <TextareaField
                  label="Cirugías Estéticas Previas"
                  placeholder="Rinoplastia, blefaroplastia, etc. (opcional)"
                  rows={2}
                  color="purple"
                />

                {/* Product Allergies */}
                <TextareaField
                  label="Alergias a Medicamentos o Productos"
                  placeholder="Alergias conocidas a medicamentos, anestesia, productos cosméticos (opcional)"
                  rows={2}
                  color="purple"
                />

                {/* Consultation Reason */}
                <TextareaField
                  label="Motivo de Consulta"
                  placeholder="¿Qué te motivó a buscar un tratamiento estético?"
                  rows={3}
                  required
                  color="purple"
                />
              </SectionContainer>
            )}

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
