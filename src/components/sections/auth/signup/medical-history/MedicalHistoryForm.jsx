'use client';

import { Heart, Sparkles, ArrowLeft, Check, ClipboardPlus } from 'lucide-react';
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
import {
  OPTIONS,
  DISEASES_OPTIONS,
  FAMILY_HISTORY_OPTIONS,
  PERSONAL_PATH_OPTIONS,
  IMMUNIZATIONS_OPTIONS,
} from './formFields/medicalHistoryConfig';

/* ==================== FUNCIONES AUXILIARES ==================== */

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

/* ==================== COMPONENTE PRINCIPAL ==================== */

export default function MedicalHistoryForm() {
  const [activeTab, setActiveTab] = useState('peso');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [alturaCm, setAlturaCm] = useState('');
  const [pesoActualKg, setPesoActualKg] = useState('');

  const edad = computeAge(fechaNacimiento);
  const imc = computeIMC(pesoActualKg, alturaCm);

  return (
    <div className="h-full overflow-y-auto p-4 py-6 md:py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
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
            {/* ==================== INFORMACIÓN BÁSICA ==================== */}
            <SectionContainer title="Información básica">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DateField label="Fecha" required />
                <InputField
                  type="text"
                  label="Nombre completo"
                  placeholder="Nombre y apellidos"
                  required
                />
                <DateField
                  label="Fecha de nacimiento"
                  value={fechaNacimiento}
                  onChange={(v) => setFechaNacimiento(v?.target?.value || v)}
                />
                <InputField
                  type="text"
                  label="Lugar de nacimiento"
                  placeholder="Ciudad, Estado, País"
                />
                <InputField type="number" label="Edad" placeholder="Auto" value={edad} readOnly />
                <SelectField label="Género" required options={OPTIONS.gender} />
                <InputField
                  type="number"
                  label="Altura (cm)"
                  placeholder="170"
                  value={alturaCm}
                  onChange={(e) => setAlturaCm(e?.target?.value)}
                />
                <InputField
                  type="number"
                  label="Peso actual (kg)"
                  placeholder="75"
                  value={pesoActualKg}
                  onChange={(e) => setPesoActualKg(e?.target?.value)}
                />
                <InputField type="number" label="Talla (cm)" placeholder="120" />
                <InputField type="text" label="Ocupación" placeholder="Profesión u oficio" />
                <SelectField label="Estado civil" options={OPTIONS.civilStatus} />
                <InputField type="text" label="RFC" placeholder="XXXX000000XXX" />
                <InputField type="email" label="Correo" placeholder="nombre@dominio.com" />
                <TextareaField
                  label="Domicilio"
                  placeholder="Calle, número, colonia, ciudad, estado, CP"
                  rows={2}
                />
                <InputField type="text" label="Teléfono celular" placeholder="+52..." />
                <InputField type="text" label="Teléfono fijo" placeholder="55..." />
                <InputField
                  type="text"
                  label="Contacto de emergencia"
                  placeholder="Nombre completo"
                />
                <InputField type="text" label="Teléfono de emergencia" placeholder="55..." />
              </div>
            </SectionContainer>

            {/* ==================== INFORMACIÓN GENERAL ==================== */}
            <SectionContainer title="Información general">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextareaField label="Motivo de consulta" rows={3} />
                <TextareaField label="Alergias conocidas" rows={3} />
                <TextareaField label="Medicamentos actuales" rows={3} />
                <RadioGroupField
                  label="Buen estado de salud"
                  name="buenEstadoSalud"
                  options={OPTIONS.yesNo}
                />
                <RadioGroupField
                  label="Bajo tratamiento"
                  name="bajoTratamiento"
                  options={OPTIONS.yesNo}
                />
                <RadioGroupField
                  label="Tomando medicamentos"
                  name="tomandoMedicamentos"
                  options={OPTIONS.yesNo}
                />
                <RadioGroupField
                  label="Alérgico a medicamentos"
                  name="alergicoMedicamentos"
                  options={OPTIONS.yesNo}
                />
                <RadioGroupField
                  label="Operado u hospitalizado"
                  name="operadoHospitalizado"
                  options={OPTIONS.yesNo}
                />
                <RadioGroupField label="Hemorragias" name="hemorragias" options={OPTIONS.yesNo} />
                <RadioGroupField
                  label="Problemas de cicatrización"
                  name="problemasCicatrizacion"
                  options={OPTIONS.yesNo}
                />
                <TextareaField label="Otras enfermedades" rows={2} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <CheckboxGroupField label="Enfermedades" options={DISEASES_OPTIONS} />
                <TextareaField label="Enfermedades: otras" rows={2} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <SelectField label="Consumo de alcohol" options={OPTIONS.alcohol} />
                <SelectField label="Consumo de tabaco" options={OPTIONS.tobacco} />
                <TextareaField label="Consumo de drogas" rows={2} />
                <RadioGroupField label="Embarazo" name="embarazo" options={OPTIONS.yesNo} />
                <RadioGroupField label="Lactancia" name="lactancia" options={OPTIONS.yesNo} />
                <SelectField label="Anticonceptivos" options={OPTIONS.anticonceptivos} />
                <RadioGroupField
                  label="Medicamentos para potencia"
                  name="medicamentosPotencia"
                  options={OPTIONS.yesNo}
                />
                <InputField type="number" label="Hijos" placeholder="0" />
              </div>
            </SectionContainer>

            {/* ==================== TAB: CONTROL DE PESO ==================== */}
            {activeTab === 'peso' && (
              <>
                <SectionContainer title="Información clínica — Control de peso">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField type="number" label="Peso objetivo (kg)" placeholder="65" />
                    <SelectField label="Actividad física" options={OPTIONS.physicalActivity} />
                    <InputField type="number" label="Horas de sueño" placeholder="7" />
                    <InputField type="number" label="Consumo de agua (L/día)" placeholder="2" />
                  </div>
                  <TextareaField label="Enfermedades crónicas" rows={2} />
                  <TextareaField label="Medicamentos actuales" rows={2} />
                  <TextareaField label="Alergias alimentarias" rows={2} />
                  <TextareaField label="Tipo de alimentación" rows={2} />
                  <TextareaField label="Cirugías previas" rows={2} />
                  <TextareaField label="Motivo de consulta en peso" rows={3} />
                </SectionContainer>

                <SectionContainer title="Signos vitales">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField type="text" label="Tensión arterial" placeholder="120/80" />
                    <InputField type="number" label="Frecuencia cardiaca" placeholder="72" />
                    <InputField type="number" label="Frecuencia respiratoria" placeholder="16" />
                    <InputField type="number" label="Temperatura" placeholder="36.7" />
                    <InputField type="number" label="Saturación de oxígeno" placeholder="98" />
                    <InputField type="number" label="IMC" placeholder="Auto" value={imc} readOnly />
                    <InputField
                      type="number"
                      label="Peso"
                      placeholder="75"
                      value={pesoActualKg}
                      readOnly
                    />
                    <InputField
                      type="number"
                      label="Talla"
                      placeholder="170"
                      value={alturaCm}
                      readOnly
                    />
                  </div>
                </SectionContainer>
              </>
            )}

            {/* ==================== TAB: ODONTOLOGÍA ==================== */}
            {activeTab === 'odontologia' && (
              <>
                <SectionContainer title="Información clínica — Odontología">
                  <TextareaField label="Motivo de consulta" rows={3} />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <RadioGroupField
                      label="¿Es tu primera visita?"
                      name="primeraVisita"
                      options={OPTIONS.yesNo}
                    />
                    <TextareaField label="Visita anterior agradable" rows={2} />
                    <RadioGroupField label="Flúor" name="fluor" options={OPTIONS.yesNo} />
                    <RadioGroupField
                      label="Extracción de dientes"
                      name="extraccionDientes"
                      options={OPTIONS.yesNo}
                    />
                    <RadioGroupField
                      label="Sangrado post extracción"
                      name="sangradoPostExtraccion"
                      options={OPTIONS.yesNo}
                    />
                    <TextareaField label="Tratamientos previos" rows={2} />
                    <InputField type="number" label="Pérdida de dientes" placeholder="0" />
                    <RadioGroupField
                      label="Sangrado de encías"
                      name="sangradoEncias"
                      options={OPTIONS.yesNo}
                    />
                    <SelectField label="Cepillado diario" options={OPTIONS.brushing} />
                    <RadioGroupField
                      label="Enjuague bucal"
                      name="enjuagueBucal"
                      options={OPTIONS.yesNo}
                    />
                    <RadioGroupField
                      label="Hilo dental"
                      name="hiloDental"
                      options={OPTIONS.yesNo}
                    />
                    <RadioGroupField
                      label="Usa cepillo"
                      name="usaCepillo"
                      options={OPTIONS.yesNo}
                    />
                    <RadioGroupField
                      label="Dolor dental"
                      name="dolorDental"
                      options={OPTIONS.yesNo}
                    />
                    <SelectField label="Tipo de dolor" options={OPTIONS.painType} />
                  </div>
                </SectionContainer>

                <SectionContainer title="Campos clínicos del médico — Odontología">
                  <div className="grid grid-cols-1 gap-4">
                    <TextareaField label="Cavidad bucal" rows={2} />
                    <TextareaField label="Cuello y estructuras" rows={2} />
                    <TextareaField label="Diagnóstico dental" rows={2} />
                    <TextareaField label="Plan de tratamiento dental" rows={2} />
                    <TextareaField label="Materiales usados" rows={2} />
                    <TextareaField label="Recomendaciones al paciente" rows={2} />
                  </div>
                </SectionContainer>
              </>
            )}

            {/* ==================== TAB: ESTÉTICA ==================== */}
            {activeTab === 'estetico' && (
              <>
                <SectionContainer title="Información clínica — Estética">
                  <TextareaField label="Motivo de tratamiento" rows={3} />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextareaField label="Cirugías previas" rows={2} />
                    <RadioGroupField
                      label="Reacciones a anestesia"
                      name="reaccionesAnestesia"
                      options={OPTIONS.yesNo}
                    />
                    <TextareaField label="Enfermedades que interfieran" rows={2} />
                    <TextareaField label="Condición de piel" rows={2} />
                    <InputField type="text" label="Zona de interés" />
                    <TextareaField label="Tratamientos previos" rows={2} />
                    <TextareaField label="Expectativas" rows={2} />
                    <TextareaField label="Alergias a químicos" rows={2} />
                  </div>
                </SectionContainer>

                <SectionContainer title="Campos clínicos del médico — Estética">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextareaField label="Diagnóstico facial" rows={2} />
                    <TextareaField label="Condición de piel" rows={2} />
                    <TextareaField label="Zonas tratadas" rows={2} />
                    <TextareaField label="Producto o técnica" rows={2} />
                    <DateField label="Fecha de tratamiento" />
                    <TextareaField label="Evolución" rows={2} />
                    <TextareaField label="Complicaciones" rows={2} />
                    <TextareaField label="Recomendaciones post" rows={2} />
                  </div>
                </SectionContainer>
              </>
            )}

            {/* ==================== ANTECEDENTES ==================== */}
            <SectionContainer title="Antecedentes">
              <div className="grid grid-cols-1 gap-6">
                <CheckboxGroupField label="Heredofamiliares" options={FAMILY_HISTORY_OPTIONS} />
                <CheckboxGroupField
                  label="Personales patológicos"
                  options={PERSONAL_PATH_OPTIONS}
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextareaField label="Hospitalizaciones" rows={2} />
                  <TextareaField label="Cirugías" rows={2} />
                  <TextareaField label="Alteraciones hormonales" rows={2} />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextareaField label="Tipo de alimentación" rows={2} />
                  <InputField type="number" label="Comidas al día" placeholder="3" />
                  <TextareaField label="Intolerancias" rows={2} />
                  <TextareaField label="Alimentos que no consume" rows={2} />
                  <SelectField label="Lavado de manos" options={OPTIONS.handWashing} />
                  <RadioGroupField
                    label="Uso de cepillo"
                    name="usoCepilloNP"
                    options={OPTIONS.yesNo}
                  />
                  <RadioGroupField
                    label="Uso de enjuague"
                    name="usoEnjuagueNP"
                    options={OPTIONS.yesNo}
                  />
                  <RadioGroupField label="Uso de hilo" name="usoHiloNP" options={OPTIONS.yesNo} />
                </div>

                <CheckboxGroupField label="Inmunizaciones" options={IMMUNIZATIONS_OPTIONS} />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SelectField label="Alcohol" options={OPTIONS.alcohol} />
                  <SelectField label="Tabaco" options={OPTIONS.tobacco} />
                  <TextareaField label="Drogas" rows={2} />
                  <TextareaField label="Deportes" rows={2} />
                </div>
              </div>
            </SectionContainer>

            {/* ==================== EXPLORACIÓN FÍSICA ==================== */}
            <SectionContainer title="Exploración física">
              <div className="grid grid-cols-1 gap-4">
                <TextareaField label="Cabeza" rows={2} />
                <TextareaField label="Cuello" rows={2} />
                <TextareaField label="Tórax" rows={2} />
                <TextareaField label="Abdomen" rows={2} />
                <TextareaField label="Extremidades" rows={2} />
              </div>
            </SectionContainer>

            {/* ==================== CAMPOS CLÍNICOS ==================== */}
            <SectionContainer title="Campos clínicos del médico — Datos y seguimiento">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DateField label="Fecha de registro" />
                <InputField type="text" label="Médico responsable" placeholder="Nombre" />
                <TextareaField label="Diagnóstico preliminar" rows={2} />
                <TextareaField label="Tratamiento sugerido" rows={2} />
                <TextareaField label="Notas" rows={2} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextareaField label="Diagnóstico definitivo" rows={2} />
                <TextareaField label="Tratamiento prescrito" rows={2} />
                <TextareaField label="Medicamentos indicados" rows={2} />
                <TextareaField label="Observaciones de evolución" rows={2} />
                <TextareaField label="Recomendaciones finales" rows={2} />
                <DateField label="Fecha de revisión siguiente" />
                <InputField type="text" label="Firma del médico" placeholder="Nombre y firma" />
              </div>
            </SectionContainer>

            {/* ==================== OBSERVACIONES ==================== */}
            <SectionContainer title="Observaciones y complementos">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextareaField label="Pasatiempos" rows={2} />
                <SelectField label="¿Cómo se enteró?" options={OPTIONS.howDidYouHear} />
                <InputField type="text" label="Adulto responsable" />
                <InputField type="text" label="Recomendado por" />
                <TextareaField label="Observaciones personales" rows={2} />
                <TextareaField label="Comentario libre" rows={2} />
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
