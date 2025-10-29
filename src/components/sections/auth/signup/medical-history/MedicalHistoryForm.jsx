'use client';

// Static imports
import { Heart, Sparkles, ArrowLeft, Check, ClipboardPlus } from 'lucide-react';
import { useState } from 'react';
import TabsHeader from './components/TabsHeader';
import ActionButtons from './components/ActionButtons';

// Form Fields
import InputField from './formFields/InputField';
import SelectField from './formFields/SelectField';
import SectionContainer from './components/SectionContainer';
import TextareaField from './formFields/TextareaField';
import DateField from './formFields/DateField';
import CheckboxGroupField from './formFields/CheckboxGroupField';
import RadioGroupField from './formFields/RadioGroupField';

/* State helpers */
// Note: Minimal local state only for computed read-only fields
function computeAge(dateStr) {
  // Simple age calc
  if (!dateStr) return '';
  const today = new Date();
  const dob = new Date(dateStr);
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age >= 0 ? String(age) : '';
}

function computeIMC(weightKg, heightCm) {
  // BMI = kg / m^2
  const w = parseFloat(weightKg);
  const h = parseFloat(heightCm) / 100;
  if (!w || !h) return '';
  const bmi = w / (h * h);
  return isFinite(bmi) ? String(Number(bmi.toFixed(1))) : '';
}

export default function MedicalHistoryForm() {
  // Tabs state
  const [activeTab, setActiveTab] = useState('peso');

  // Local fields used for readonly
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [alturaCm, setAlturaCm] = useState('');
  const [pesoActualKg, setPesoActualKg] = useState('');

  // Derived
  const edad = computeAge(fechaNacimiento);
  const imc = computeIMC(pesoActualKg, alturaCm);

  // Render
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
          {/* Tabs */}
          <TabsHeader activeTab={activeTab} setActiveTab={setActiveTab} />

          {/* Form */}
          <form className="p-4 md:p-8">
            {/* Información básica */}
            <SectionContainer title="Información básica">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Date */}
                <DateField label="Fecha" required />

                {/* Full name */}
                <InputField
                  type="text"
                  label="Nombre completo"
                  placeholder="Nombre y apellidos"
                  required
                />

                {/* Birth date */}
                <DateField
                  label="Fecha de nacimiento"
                  value={fechaNacimiento}
                  onChange={(v) => setFechaNacimiento(v?.target?.value || v)}
                />

                {/* Birth place */}
                <InputField
                  type="text"
                  label="Lugar de nacimiento"
                  placeholder="Ciudad, Estado, País"
                />

                {/* Age readonly */}
                <InputField type="number" label="Edad" placeholder="Auto" value={edad} readOnly />

                {/* Gender */}
                <SelectField
                  label="Género"
                  required
                  options={[
                    { value: 'masculino', label: 'Masculino' },
                    { value: 'femenino', label: 'Femenino' },
                    { value: 'otro', label: 'Otro' },
                  ]}
                />

                {/* Height */}
                <InputField
                  type="number"
                  label="Altura (cm)"
                  placeholder="170"
                  value={alturaCm}
                  onChange={(e) => setAlturaCm(e?.target?.value)}
                />

                {/* Current weight */}
                <InputField
                  type="number"
                  label="Peso actual (kg)"
                  placeholder="75"
                  value={pesoActualKg}
                  onChange={(e) => setPesoActualKg(e?.target?.value)}
                />

                {/* Talla */}
                <InputField type="number" label="Talla (cm)" placeholder="120" />

                {/* Job */}
                <InputField type="text" label="Ocupación" placeholder="Profesión u oficio" />

                {/* Civil status */}
                <SelectField
                  label="Estado civil"
                  options={[
                    { value: 'soltero', label: 'Soltero' },
                    { value: 'casado', label: 'Casado' },
                    { value: 'union-libre', label: 'Unión libre' },
                    { value: 'divorciado', label: 'Divorciado' },
                    { value: 'viudo', label: 'Viudo' },
                  ]}
                />

                {/* RFC */}
                <InputField type="text" label="RFC" placeholder="XXXX000000XXX" />

                {/* Email */}
                <InputField type="email" label="Correo" placeholder="nombre@dominio.com" />

                {/* Address */}
                <TextareaField
                  label="Domicilio"
                  placeholder="Calle, número, colonia, ciudad, estado, CP"
                  rows={2}
                />

                {/* Phones */}
                <InputField type="text" label="Teléfono celular" placeholder="+52..." />
                <InputField type="text" label="Teléfono fijo" placeholder="55..." />

                {/* Emergency contact */}
                <InputField
                  type="text"
                  label="Contacto de emergencia"
                  placeholder="Nombre completo"
                />
                <InputField type="text" label="Teléfono de emergencia" placeholder="55..." />
              </div>
            </SectionContainer>

            {/* Información general */}
            <SectionContainer title="Información general">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Reason */}
                <TextareaField label="Motivo de consulta" rows={3} />

                {/* Allergies */}
                <TextareaField label="Alergias conocidas" rows={3} />

                {/* Meds */}
                <TextareaField label="Medicamentos actuales" rows={3} />

                {/* Radios health */}
                <RadioGroupField
                  label="Buen estado de salud"
                  name="buenEstadoSalud"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Bajo tratamiento"
                  name="bajoTratamiento"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Tomando medicamentos"
                  name="tomandoMedicamentos"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Alérgico a medicamentos"
                  name="alergicoMedicamentos"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Operado u hospitalizado"
                  name="operadoHospitalizado"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Hemorragias"
                  name="hemorragias"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Problemas de cicatrización"
                  name="problemasCicatrizacion"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />

                {/* Other diseases */}
                <TextareaField label="Otras enfermedades" rows={2} />
              </div>

              {/* Disease checklist */}
              <div className="mt-6 grid grid-cols-1 gap-4">
                <CheckboxGroupField
                  label="Enfermedades"
                  options={[
                    { value: 'diabetes', label: 'Diabetes' },
                    { value: 'hipertension', label: 'Hipertensión' },
                    { value: 'hepatitis', label: 'Hepatitis' },
                    { value: 'vih', label: 'VIH' },
                    { value: 'cancer', label: 'Cáncer' },
                    { value: 'asma', label: 'Asma' },
                    { value: 'epilepsia', label: 'Epilepsia' },
                    { value: 'gastritis', label: 'Gastritis' },
                    { value: 'ansiedadDepresion', label: 'Ansiedad o depresión' },
                  ]}
                />
                <TextareaField label="Enfermedades: otras" rows={2} />
              </div>

              {/* Habits and reproductive */}
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                <SelectField
                  label="Consumo de alcohol"
                  options={[
                    { value: 'nunca', label: 'Nunca' },
                    { value: 'ocasional', label: 'Ocasional' },
                    { value: 'frecuente', label: 'Frecuente' },
                  ]}
                />
                <SelectField
                  label="Consumo de tabaco"
                  options={[
                    { value: 'no-fuma', label: 'No fuma' },
                    { value: '1-5', label: '1–5 cigarrillos/día' },
                    { value: '10+', label: '+10/día' },
                  ]}
                />
                <TextareaField label="Consumo de drogas" rows={2} />
                <RadioGroupField
                  label="Embarazo"
                  name="embarazo"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <RadioGroupField
                  label="Lactancia"
                  name="lactancia"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <SelectField
                  label="Anticonceptivos"
                  options={[
                    { value: 'ninguno', label: 'Ninguno' },
                    { value: 'orales', label: 'Orales' },
                    { value: 'inyectables', label: 'Inyectables' },
                    { value: 'dispositivo', label: 'Dispositivo' },
                    { value: 'otro', label: 'Otro' },
                  ]}
                />
                <RadioGroupField
                  label="Medicamentos para potencia"
                  name="medicamentosPotencia"
                  options={[
                    { value: 'si', label: 'Sí' },
                    { value: 'no', label: 'No' },
                  ]}
                />
                <InputField type="number" label="Hijos" placeholder="0" />
              </div>
            </SectionContainer>

            {/* Tab: Control de peso */}
            {activeTab === 'peso' && (
              <>
                <SectionContainer title="Información clínica — Control de peso">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputField type="number" label="Peso objetivo (kg)" placeholder="65" />
                    <SelectField
                      label="Actividad física"
                      options={[
                        { value: 'sedentario', label: 'Sedentario' },
                        { value: 'moderado', label: 'Moderado' },
                        { value: 'intenso', label: 'Intenso' },
                      ]}
                    />
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

            {/* Tab: Odontología */}
            {activeTab === 'odontologia' && (
              <>
                <SectionContainer title="Información clínica — Odontología">
                  <TextareaField label="Motivo de consulta" rows={3} />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <RadioGroupField
                      label="¿Es tu primera visita?"
                      name="primeraVisita"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <TextareaField label="Visita anterior agradable" rows={2} />
                    <RadioGroupField
                      label="Flúor"
                      name="fluor"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <RadioGroupField
                      label="Extracción de dientes"
                      name="extraccionDientes"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <RadioGroupField
                      label="Sangrado post extracción"
                      name="sangradoPostExtraccion"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <TextareaField label="Tratamientos previos" rows={2} />
                    <InputField type="number" label="Pérdida de dientes" placeholder="0" />
                    <RadioGroupField
                      label="Sangrado de encías"
                      name="sangradoEncias"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <SelectField
                      label="Cepillado diario"
                      options={[
                        { value: '1', label: '1 vez/día' },
                        { value: '2', label: '2 veces/día' },
                        { value: '3', label: '3 veces/día' },
                      ]}
                    />
                    <RadioGroupField
                      label="Enjuague bucal"
                      name="enjuagueBucal"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <RadioGroupField
                      label="Hilo dental"
                      name="hiloDental"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <RadioGroupField
                      label="Usa cepillo"
                      name="usaCepillo"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <RadioGroupField
                      label="Dolor dental"
                      name="dolorDental"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
                    />
                    <SelectField
                      label="Tipo de dolor"
                      options={[
                        { value: 'frio', label: 'Frío' },
                        { value: 'calor', label: 'Calor' },
                        { value: 'presion', label: 'Presión' },
                        { value: 'morder', label: 'Al morder' },
                      ]}
                    />
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

            {/* Tab: Estética */}
            {activeTab === 'estetico' && (
              <>
                <SectionContainer title="Información clínica — Estética">
                  <TextareaField label="Motivo de tratamiento" rows={3} />
                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                    <TextareaField label="Cirugías previas" rows={2} />
                    <RadioGroupField
                      label="Reacciones a anestesia"
                      name="reaccionesAnestesia"
                      options={[
                        { value: 'si', label: 'Sí' },
                        { value: 'no', label: 'No' },
                      ]}
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

            {/* Antecedentes */}
            <SectionContainer title="Antecedentes">
              <div className="grid grid-cols-1 gap-6">
                {/* Heredofamiliares */}
                <CheckboxGroupField
                  label="Heredofamiliares"
                  options={[
                    { value: 'diabetes', label: 'Diabetes' },
                    { value: 'epilepsia', label: 'Epilepsia' },
                    { value: 'hepatitis', label: 'Hepatitis' },
                    { value: 'hipertension', label: 'Hipertensión' },
                    { value: 'malformaciones', label: 'Malformaciones' },
                    { value: 'artritis', label: 'Artritis' },
                  ]}
                />

                {/* Personales patológicos booleanos */}
                <CheckboxGroupField
                  label="Personales patológicos"
                  options={[
                    { value: 'cardiopatias', label: 'Cardiopatías' },
                    { value: 'enfermedadesMentales', label: 'Enfermedades mentales' },
                    { value: 'neoplasias', label: 'Neoplasias' },
                    { value: 'enfermedadesRenales', label: 'Enfermedades renales' },
                    { value: 'varicela', label: 'Varicela' },
                    { value: 'sarampion', label: 'Sarampión' },
                    { value: 'neuralgia', label: 'Neuralgia' },
                    { value: 'viasBiliares', label: 'Vías biliares' },
                    { value: 'asma', label: 'Asma' },
                    { value: 'enfermedadesRespiratorias', label: 'Enfermedades respiratorias' },
                    { value: 'hepatitis', label: 'Hepatitis' },
                    { value: 'digestivo', label: 'Digestivo' },
                    { value: 'hipotiroidismo', label: 'Hipotiroidismo' },
                    { value: 'migraña', label: 'Migraña' },
                    { value: 'epilepsia', label: 'Epilepsia' },
                    { value: 'ansiedadDepresion', label: 'Ansiedad o depresión' },
                    { value: 'hipertension', label: 'Hipertensión' },
                    { value: 'diabetes', label: 'Diabetes' },
                    { value: 'cancer', label: 'Cáncer' },
                    { value: 'vih', label: 'VIH' },
                    { value: 'ets', label: 'ETS' },
                    { value: 'piel', label: 'Piel' },
                    { value: 'fracturas', label: 'Fracturas' },
                  ]}
                />

                {/* Personales patológicos textos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextareaField label="Hospitalizaciones" rows={2} />
                  <TextareaField label="Cirugías" rows={2} />
                  <TextareaField label="Alteraciones hormonales" rows={2} />
                </div>

                {/* No patológicos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <TextareaField label="Tipo de alimentación" rows={2} />
                  <InputField type="number" label="Comidas al día" placeholder="3" />
                  <TextareaField label="Intolerancias" rows={2} />
                  <TextareaField label="Alimentos que no consume" rows={2} />
                  <SelectField
                    label="Lavado de manos"
                    options={[
                      { value: 'antes', label: 'Antes de comer' },
                      { value: 'siempre', label: 'Siempre' },
                      { value: 'rara', label: 'Rara vez' },
                    ]}
                  />
                  <RadioGroupField
                    label="Uso de cepillo"
                    name="usoCepilloNP"
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' },
                    ]}
                  />
                  <RadioGroupField
                    label="Uso de enjuague"
                    name="usoEnjuagueNP"
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' },
                    ]}
                  />
                  <RadioGroupField
                    label="Uso de hilo"
                    name="usoHiloNP"
                    options={[
                      { value: 'si', label: 'Sí' },
                      { value: 'no', label: 'No' },
                    ]}
                  />
                </div>

                {/* Inmunizaciones */}
                <CheckboxGroupField
                  label="Inmunizaciones"
                  options={[
                    { value: 'poliomielitis', label: 'Poliomielitis' },
                    { value: 'tuberculosis', label: 'Tuberculosis' },
                    { value: 'dtp', label: 'DTP' },
                    { value: 'tripleViral', label: 'Triple viral' },
                    { value: 'sarampion', label: 'Sarampión' },
                    { value: 'hepatitisB', label: 'Hepatitis B' },
                  ]}
                />

                {/* Hábitos */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <SelectField
                    label="Alcohol"
                    options={[
                      { value: 'nunca', label: 'Nunca' },
                      { value: 'ocasional', label: 'Ocasional' },
                      { value: 'frecuente', label: 'Frecuente' },
                    ]}
                  />
                  <SelectField
                    label="Tabaco"
                    options={[
                      { value: 'no-fuma', label: 'No fuma' },
                      { value: '1-5', label: '1–5 cigarrillos/día' },
                      { value: '10+', label: '+10/día' },
                    ]}
                  />
                  <TextareaField label="Drogas" rows={2} />
                  <TextareaField label="Deportes" rows={2} />
                </div>
              </div>
            </SectionContainer>

            {/* Exploración física */}
            <SectionContainer title="Exploración física">
              <div className="grid grid-cols-1 gap-4">
                <TextareaField label="Cabeza" rows={2} />
                <TextareaField label="Cuello" rows={2} />
                <TextareaField label="Tórax" rows={2} />
                <TextareaField label="Abdomen" rows={2} />
                <TextareaField label="Extremidades" rows={2} />
              </div>
            </SectionContainer>

            {/* Campos clínicos del médico — Datos clínicos y seguimiento */}
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

            {/* Observaciones y complementos */}
            <SectionContainer title="Observaciones y complementos">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextareaField label="Pasatiempos" rows={2} />
                <SelectField
                  label="¿Cómo se enteró?"
                  options={[
                    { value: 'recomendacion', label: 'Recomendación' },
                    { value: 'internet', label: 'Internet' },
                    { value: 'redes', label: 'Redes' },
                    { value: 'otro', label: 'Otro' },
                  ]}
                />
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
