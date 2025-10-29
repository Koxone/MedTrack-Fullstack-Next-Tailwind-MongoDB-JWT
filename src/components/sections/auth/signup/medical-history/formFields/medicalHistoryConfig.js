// /mnt/data/medicalHistoryConfig.js
/* ==================== Opciones base ==================== */
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

/* ==================== Catálogos ==================== */
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

/* ==================== Campos: Información básica ==================== */
// Block comments only
export const BASIC_INFO_FIELDS = [
  { type: 'date', label: 'Fecha' },
  {
    type: 'input',
    inputType: 'text',
    label: 'Nombre completo',
    placeholder: 'Nombre y apellidos',
    required: true,
  },
  { type: 'date', label: 'Fecha de nacimiento', valueKey: 'fechaNacimiento' },
  {
    type: 'input',
    inputType: 'text',
    label: 'Lugar de nacimiento',
    placeholder: 'Ciudad, Estado, País',
  },
  {
    type: 'input',
    inputType: 'number',
    label: 'Edad',
    placeholder: 'Auto',
    valueKey: 'edad',
    readOnly: true,
  },
  { type: 'select', label: 'Género', options: OPTIONS.gender, required: true },
  {
    type: 'input',
    inputType: 'number',
    label: 'Altura (cm)',
    placeholder: '170',
    valueKey: 'alturaCm',
  },
  {
    type: 'input',
    inputType: 'number',
    label: 'Peso actual (kg)',
    placeholder: '75',
    valueKey: 'pesoActualKg',
  },
  { type: 'input', inputType: 'number', label: 'Talla (cm)', placeholder: '120' },
  { type: 'input', inputType: 'text', label: 'Ocupación', placeholder: 'Profesión u oficio' },
  { type: 'select', label: 'Estado civil', options: OPTIONS.civilStatus },
  { type: 'input', inputType: 'text', label: 'RFC', placeholder: 'XXXX000000XXX' },
  { type: 'input', inputType: 'email', label: 'Correo', placeholder: 'nombre@dominio.com' },
  { type: 'textarea', label: 'Domicilio', rows: 2, gridSpan: 'full' },
  { type: 'input', inputType: 'text', label: 'Teléfono celular', placeholder: '+52...' },
  { type: 'input', inputType: 'text', label: 'Teléfono fijo', placeholder: '55...' },
  {
    type: 'input',
    inputType: 'text',
    label: 'Contacto de emergencia',
    placeholder: 'Nombre completo',
  },
  { type: 'input', inputType: 'text', label: 'Teléfono de emergencia', placeholder: '55...' },
];

/* ==================== Campos: Información general ==================== */
export const GENERAL_INFO_GROUPS = {
  top: [
    { type: 'textarea', label: 'Motivo de consulta', rows: 3, gridSpan: 'full' },
    { type: 'textarea', label: 'Alergias conocidas', rows: 3, gridSpan: 'full' },
    { type: 'textarea', label: 'Medicamentos actuales', rows: 3, gridSpan: 'full' },
    { type: 'radio', label: 'Buen estado de salud', name: 'buenEstadoSalud' },
    { type: 'radio', label: 'Bajo tratamiento', name: 'bajoTratamiento' },
    { type: 'radio', label: 'Tomando medicamentos', name: 'tomandoMedicamentos' },
    { type: 'radio', label: 'Alérgico a medicamentos', name: 'alergicoMedicamentos' },
    { type: 'radio', label: 'Operado u hospitalizado', name: 'operadoHospitalizado' },
    { type: 'radio', label: 'Hemorragias', name: 'hemorragias' },
    { type: 'radio', label: 'Problemas de cicatrización', name: 'problemasCicatrizacion' },
    { type: 'textarea', label: 'Otras enfermedades', rows: 2, gridSpan: 'full' },
  ],
  bottom: [
    { type: 'select', label: 'Consumo de alcohol', options: OPTIONS.alcohol },
    { type: 'select', label: 'Consumo de tabaco', options: OPTIONS.tobacco },
    { type: 'textarea', label: 'Consumo de drogas', rows: 2 },
    { type: 'radio', label: 'Embarazo', name: 'embarazo' },
    { type: 'radio', label: 'Lactancia', name: 'lactancia' },
    { type: 'select', label: 'Anticonceptivos', options: OPTIONS.anticonceptivos },
    { type: 'radio', label: 'Medicamentos para potencia', name: 'medicamentosPotencia' },
    { type: 'input', inputType: 'number', label: 'Hijos', placeholder: '0' },
  ],
};

/* ==================== Tabs ==================== */
export const TABS_CONFIG = {
  peso: {
    sections: [
      {
        title: 'Información clínica — Control de peso',
        grid: true,
        fields: [
          { type: 'input', inputType: 'number', label: 'Peso objetivo (kg)', placeholder: '65' },
          { type: 'select', label: 'Actividad física', options: OPTIONS.physicalActivity },
          { type: 'input', inputType: 'number', label: 'Horas de sueño', placeholder: '7' },
          {
            type: 'input',
            inputType: 'number',
            label: 'Consumo de agua (L/día)',
            placeholder: '2',
          },
          { type: 'textarea', label: 'Enfermedades crónicas', rows: 2, gridSpan: 'full' },
          { type: 'textarea', label: 'Medicamentos actuales', rows: 2, gridSpan: 'full' },
          { type: 'textarea', label: 'Alergias alimentarias', rows: 2, gridSpan: 'full' },
          { type: 'textarea', label: 'Tipo de alimentación', rows: 2, gridSpan: 'full' },
          { type: 'textarea', label: 'Cirugías previas', rows: 2, gridSpan: 'full' },
          { type: 'textarea', label: 'Motivo de consulta en peso', rows: 3, gridSpan: 'full' },
        ],
      },
      {
        title: 'Signos vitales',
        grid: true,
        fields: [
          { type: 'input', inputType: 'text', label: 'Tensión arterial', placeholder: '120/80' },
          { type: 'input', inputType: 'number', label: 'Frecuencia cardiaca', placeholder: '72' },
          {
            type: 'input',
            inputType: 'number',
            label: 'Frecuencia respiratoria',
            placeholder: '16',
          },
          { type: 'input', inputType: 'number', label: 'Temperatura', placeholder: '36.7' },
          { type: 'input', inputType: 'number', label: 'Saturación de oxígeno', placeholder: '98' },
          {
            type: 'input',
            inputType: 'number',
            label: 'IMC',
            placeholder: 'Auto',
            valueKey: 'imc',
            readOnly: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Peso',
            placeholder: '75',
            valueKey: 'pesoActualKg',
            readOnly: true,
          },
          {
            type: 'input',
            inputType: 'number',
            label: 'Talla',
            placeholder: '170',
            valueKey: 'alturaCm',
            readOnly: true,
          },
        ],
      },
    ],
  },
  odontologia: {
    sections: [
      {
        title: 'Información clínica — Odontología',
        grid: true,
        fields: [
          { type: 'textarea', label: 'Motivo de consulta', rows: 3, gridSpan: 'full' },
          { type: 'radio', label: '¿Es tu primera visita?', name: 'primeraVisita' },
          { type: 'textarea', label: 'Visita anterior agradable', rows: 2 },
          { type: 'radio', label: 'Flúor', name: 'fluor' },
          { type: 'radio', label: 'Extracción de dientes', name: 'extraccionDientes' },
          { type: 'radio', label: 'Sangrado post extracción', name: 'sangradoPostExtraccion' },
          { type: 'textarea', label: 'Tratamientos previos', rows: 2 },
          { type: 'input', inputType: 'number', label: 'Pérdida de dientes', placeholder: '0' },
          { type: 'radio', label: 'Sangrado de encías', name: 'sangradoEncias' },
          { type: 'select', label: 'Cepillado diario', options: OPTIONS.brushing },
          { type: 'radio', label: 'Enjuague bucal', name: 'enjuagueBucal' },
          { type: 'radio', label: 'Hilo dental', name: 'hiloDental' },
          { type: 'radio', label: 'Usa cepillo', name: 'usaCepillo' },
          { type: 'radio', label: 'Dolor dental', name: 'dolorDental' },
          { type: 'select', label: 'Tipo de dolor', options: OPTIONS.painType },
        ],
      },
      {
        title: 'Campos clínicos del médico — Odontología',
        grid: false,
        fields: [
          { type: 'textarea', label: 'Cavidad bucal', rows: 2 },
          { type: 'textarea', label: 'Cuello y estructuras', rows: 2 },
          { type: 'textarea', label: 'Diagnóstico dental', rows: 2 },
          { type: 'textarea', label: 'Plan de tratamiento dental', rows: 2 },
          { type: 'textarea', label: 'Materiales usados', rows: 2 },
          { type: 'textarea', label: 'Recomendaciones al paciente', rows: 2 },
        ],
      },
    ],
  },
  estetico: {
    sections: [
      {
        title: 'Información clínica — Estética',
        grid: true,
        fields: [
          { type: 'textarea', label: 'Motivo de tratamiento', rows: 3, gridSpan: 'full' },
          { type: 'textarea', label: 'Cirugías previas', rows: 2 },
          { type: 'radio', label: 'Reacciones a anestesia', name: 'reaccionesAnestesia' },
          { type: 'textarea', label: 'Enfermedades que interfieran', rows: 2 },
          { type: 'textarea', label: 'Condición de piel', rows: 2 },
          { type: 'input', inputType: 'text', label: 'Zona de interés' },
          { type: 'textarea', label: 'Tratamientos previos', rows: 2 },
          { type: 'textarea', label: 'Expectativas', rows: 2 },
          { type: 'textarea', label: 'Alergias a químicos', rows: 2 },
        ],
      },
      {
        title: 'Campos clínicos del médico — Estética',
        grid: true,
        fields: [
          { type: 'textarea', label: 'Diagnóstico facial', rows: 2 },
          { type: 'textarea', label: 'Condición de piel', rows: 2 },
          { type: 'textarea', label: 'Zonas tratadas', rows: 2 },
          { type: 'textarea', label: 'Producto o técnica', rows: 2 },
          { type: 'date', label: 'Fecha de tratamiento' },
          { type: 'textarea', label: 'Evolución', rows: 2 },
          { type: 'textarea', label: 'Complicaciones', rows: 2 },
          { type: 'textarea', label: 'Recomendaciones post', rows: 2 },
        ],
      },
    ],
  },
};

/* ==================== Antecedentes ==================== */
export const BACKGROUND_GROUPS = {
  top: [
    { type: 'textarea', label: 'Hospitalizaciones', rows: 2 },
    { type: 'textarea', label: 'Cirugías', rows: 2 },
    { type: 'textarea', label: 'Alteraciones hormonales', rows: 2 },
  ],
  bottom: [
    { type: 'textarea', label: 'Tipo de alimentación', rows: 2 },
    { type: 'input', inputType: 'number', label: 'Comidas al día', placeholder: '3' },
    { type: 'textarea', label: 'Intolerancias', rows: 2 },
    { type: 'textarea', label: 'Alimentos que no consume', rows: 2 },
    { type: 'select', label: 'Lavado de manos', options: OPTIONS.handWashing },
    { type: 'radio', label: 'Uso de cepillo', name: 'usoCepilloNP' },
    { type: 'radio', label: 'Uso de enjuague', name: 'usoEnjuagueNP' },
    { type: 'radio', label: 'Uso de hilo', name: 'usoHiloNP' },
  ],
  habits: [
    { type: 'select', label: 'Alcohol', options: OPTIONS.alcohol },
    { type: 'select', label: 'Tabaco', options: OPTIONS.tobacco },
    { type: 'textarea', label: 'Drogas', rows: 2 },
    { type: 'textarea', label: 'Deportes', rows: 2 },
  ],
};

/* ==================== Exploración física ==================== */
export const PHYSICAL_EXAM_FIELDS = [
  { type: 'textarea', label: 'Cabeza', rows: 2 },
  { type: 'textarea', label: 'Cuello', rows: 2 },
  { type: 'textarea', label: 'Tórax', rows: 2 },
  { type: 'textarea', label: 'Abdomen', rows: 2 },
  { type: 'textarea', label: 'Extremidades', rows: 2 },
];

/* ==================== Campos clínicos y seguimiento ==================== */
export const CLINICAL_SECTIONS = [
  {
    title: 'Campos clínicos del médico — Datos y seguimiento',
    fields: [
      { type: 'date', label: 'Fecha de registro' },
      { type: 'input', inputType: 'text', label: 'Médico responsable', placeholder: 'Nombre' },
      { type: 'textarea', label: 'Diagnóstico preliminar', rows: 2 },
      { type: 'textarea', label: 'Tratamiento sugerido', rows: 2 },
      { type: 'textarea', label: 'Notas', rows: 2 },
      { type: 'textarea', label: 'Diagnóstico definitivo', rows: 2 },
      { type: 'textarea', label: 'Tratamiento prescrito', rows: 2 },
      { type: 'textarea', label: 'Medicamentos indicados', rows: 2 },
      { type: 'textarea', label: 'Observaciones de evolución', rows: 2 },
      { type: 'textarea', label: 'Recomendaciones finales', rows: 2 },
      { type: 'date', label: 'Fecha de revisión siguiente' },
      {
        type: 'input',
        inputType: 'text',
        label: 'Firma del médico',
        placeholder: 'Nombre y firma',
      },
    ],
  },
];

/* ==================== Observaciones ==================== */
export const OBSERVATIONS_FIELDS = [
  { type: 'textarea', label: 'Pasatiempos', rows: 2 },
  { type: 'select', label: '¿Cómo se enteró?', options: OPTIONS.howDidYouHear },
  { type: 'input', inputType: 'text', label: 'Adulto responsable' },
  { type: 'input', inputType: 'text', label: 'Recomendado por' },
  { type: 'textarea', label: 'Observaciones personales', rows: 2 },
  { type: 'textarea', label: 'Comentario libre', rows: 2 },
];
