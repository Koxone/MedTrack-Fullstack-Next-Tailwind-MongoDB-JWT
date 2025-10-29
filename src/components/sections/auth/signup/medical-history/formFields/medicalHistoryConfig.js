/* ==================== OPCIONES DE SELECTS ==================== */

export const OPTIONS = {
  gender: [
    { value: 'masculino', label: 'Masculino' },
    { value: 'femenino', label: 'Femenino' },
    { value: 'otro', label: 'Otro' },
  ],
  civilStatus: [
    { value: 'soltero', label: 'Soltero' },
    { value: 'casado', label: 'Casado' },
    { value: 'union-libre', label: 'Unión libre' },
    { value: 'divorciado', label: 'Divorciado' },
    { value: 'viudo', label: 'Viudo' },
  ],
  yesNo: [
    { value: 'si', label: 'Sí' },
    { value: 'no', label: 'No' },
  ],
  alcohol: [
    { value: 'nunca', label: 'Nunca' },
    { value: 'ocasional', label: 'Ocasional' },
    { value: 'frecuente', label: 'Frecuente' },
  ],
  tobacco: [
    { value: 'no-fuma', label: 'No fuma' },
    { value: '1-5', label: '1–5 cigarrillos/día' },
    { value: '10+', label: '+10/día' },
  ],
  anticonceptivos: [
    { value: 'ninguno', label: 'Ninguno' },
    { value: 'orales', label: 'Orales' },
    { value: 'inyectables', label: 'Inyectables' },
    { value: 'dispositivo', label: 'Dispositivo' },
    { value: 'otro', label: 'Otro' },
  ],
  handWashing: [
    { value: 'antes', label: 'Antes de comer' },
    { value: 'siempre', label: 'Siempre' },
    { value: 'rara', label: 'Rara vez' },
  ],
  howDidYouHear: [
    { value: 'recomendacion', label: 'Recomendación' },
    { value: 'internet', label: 'Internet' },
    { value: 'redes', label: 'Redes' },
    { value: 'otro', label: 'Otro' },
  ],
  physicalActivity: [
    { value: 'sedentario', label: 'Sedentario' },
    { value: 'moderado', label: 'Moderado' },
    { value: 'intenso', label: 'Intenso' },
  ],
  brushing: [
    { value: '1', label: '1 vez/día' },
    { value: '2', label: '2 veces/día' },
    { value: '3', label: '3 veces/día' },
  ],
  painType: [
    { value: 'frio', label: 'Frío' },
    { value: 'calor', label: 'Calor' },
    { value: 'presion', label: 'Presión' },
    { value: 'morder', label: 'Al morder' },
  ],
};

export const DISEASES_OPTIONS = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'hipertension', label: 'Hipertensión' },
  { value: 'hepatitis', label: 'Hepatitis' },
  { value: 'vih', label: 'VIH' },
  { value: 'cancer', label: 'Cáncer' },
  { value: 'asma', label: 'Asma' },
  { value: 'epilepsia', label: 'Epilepsia' },
  { value: 'gastritis', label: 'Gastritis' },
  { value: 'ansiedadDepresion', label: 'Ansiedad o depresión' },
];

export const FAMILY_HISTORY_OPTIONS = [
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'epilepsia', label: 'Epilepsia' },
  { value: 'hepatitis', label: 'Hepatitis' },
  { value: 'hipertension', label: 'Hipertensión' },
  { value: 'malformaciones', label: 'Malformaciones' },
  { value: 'artritis', label: 'Artritis' },
];

export const PERSONAL_PATH_OPTIONS = [
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
];

export const IMMUNIZATIONS_OPTIONS = [
  { value: 'poliomielitis', label: 'Poliomielitis' },
  { value: 'tuberculosis', label: 'Tuberculosis' },
  { value: 'dtp', label: 'DTP' },
  { value: 'tripleViral', label: 'Triple viral' },
  { value: 'sarampion', label: 'Sarampión' },
  { value: 'hepatitisB', label: 'Hepatitis B' },
];
