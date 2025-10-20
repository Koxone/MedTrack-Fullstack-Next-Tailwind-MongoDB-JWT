"use client";

import { useRouter } from "next/navigation";
import { Heart, Weight, Sparkles, ArrowLeft, Check } from "lucide-react";
import { useState, useEffect } from "react";

export default function MedicalHistory() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("peso"); // "peso" o "estetico"
  const [formData, setFormData] = useState({
    // Datos comunes
    edad: "",
    genero: "",
    altura: "",
    pesoActual: "",
    
    // Control de Peso
    pesoObjetivo: "",
    actividadFisica: "",
    horasSueno: "",
    consumoAgua: "",
    enfermedadesCronicas: "",
    medicamentosActuales: "",
    alergias: "",
    habitosAlimenticios: "",
    antecedentesFamiliares: "",
    motivoConsulta: "",
    
    // Estético
    tratamientoInteres: "",
    zonaTratamiento: "",
    tratamientosPrevios: "",
    expectativas: "",
    condicionesPiel: "",
    embarazoLactancia: "",
    cirugiasEsteticasPrevias: "",
    alergiasMedicamentos: "",
    motivoEstetico: "",
  });

  useEffect(() => {
    // Verificar que vengan del paso 1
    const signupData = localStorage.getItem("signupData");
    if (!signupData) {
      router.push("/signup");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Obtener datos del paso 1
    const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");
    
    // Combinar todos los datos
    const completeData = {
      ...signupData,
      ...formData,
      tipoConsulta: activeTab,
      fechaRegistro: new Date().toISOString(),
    };
    
    // Aquí normalmente se enviaría al backend
    console.log("Datos completos del registro:", completeData);
    
    // Limpiar localStorage
    localStorage.removeItem("signupData");
    
    // Mostrar mensaje de éxito
    alert("¡Registro completado exitosamente! Bienvenido a MedTrack");
    
    // Redirigir al dashboard del paciente
    router.push("/patient/dashboard");
  };

  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4 py-6 md:py-10">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 md:w-10 md:h-10 text-blue-500" />
            <span className="text-2xl md:text-3xl font-bold text-gray-900">MedTrack</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Historial Clínico</h1>
          <p className="text-sm md:text-base text-gray-600">Paso 2 de 2: Completa tu información médica</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("peso")}
              className={`flex items-center justify-center gap-2 py-4 px-4 font-medium transition ${
                activeTab === "peso"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Weight className="w-5 h-5" />
              <span className="text-sm md:text-base">Control de Peso</span>
            </button>
            <button
              onClick={() => setActiveTab("estetico")}
              className={`flex items-center justify-center gap-2 py-4 px-4 font-medium transition ${
                activeTab === "estetico"
                  ? "bg-purple-500 text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span className="text-sm md:text-base">Tratamiento Estético</span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            {/* Datos Comunes */}
            <div className="mb-8">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Datos Generales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Edad</label>
                  <input
                    type="number"
                    required
                    value={formData.edad}
                    onChange={(e) => updateField("edad", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Género</label>
                  <select
                    required
                    value={formData.genero}
                    onChange={(e) => updateField("genero", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Altura (cm)</label>
                  <input
                    type="number"
                    required
                    value={formData.altura}
                    onChange={(e) => updateField("altura", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="170"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Peso Actual (kg)</label>
                  <input
                    type="number"
                    required
                    value={formData.pesoActual}
                    onChange={(e) => updateField("pesoActual", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="75"
                  />
                </div>
              </div>
            </div>

            {/* Formulario de Control de Peso */}
            {activeTab === "peso" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Información para Control de Peso</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Peso Objetivo (kg)</label>
                    <input
                      type="number"
                      required
                      value={formData.pesoObjetivo}
                      onChange={(e) => updateField("pesoObjetivo", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Actividad Física</label>
                    <select
                      required
                      value={formData.actividadFisica}
                      onChange={(e) => updateField("actividadFisica", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar</option>
                      <option value="sedentario">Sedentario</option>
                      <option value="ligero">Ligero (1-2 días/semana)</option>
                      <option value="moderado">Moderado (3-5 días/semana)</option>
                      <option value="intenso">Intenso (6-7 días/semana)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Horas de Sueño</label>
                    <input
                      type="number"
                      required
                      value={formData.horasSueno}
                      onChange={(e) => updateField("horasSueno", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Consumo de Agua (litros/día)</label>
                    <input
                      type="number"
                      step="0.1"
                      required
                      value={formData.consumoAgua}
                      onChange={(e) => updateField("consumoAgua", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enfermedades Crónicas</label>
                  <textarea
                    rows="2"
                    value={formData.enfermedadesCronicas}
                    onChange={(e) => updateField("enfermedadesCronicas", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Diabetes, hipertensión, tiroides, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Medicamentos Actuales</label>
                  <textarea
                    rows="2"
                    value={formData.medicamentosActuales}
                    onChange={(e) => updateField("medicamentosActuales", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Lista de medicamentos que tomas actualmente (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias Alimentarias</label>
                  <textarea
                    rows="2"
                    value={formData.alergias}
                    onChange={(e) => updateField("alergias", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Alergias o intolerancias alimentarias (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hábitos Alimenticios</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.habitosAlimenticios}
                    onChange={(e) => updateField("habitosAlimenticios", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe tu alimentación típica diaria"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Antecedentes Familiares</label>
                  <textarea
                    rows="2"
                    value={formData.antecedentesFamiliares}
                    onChange={(e) => updateField("antecedentesFamiliares", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enfermedades relevantes en la familia (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de Consulta</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.motivoConsulta}
                    onChange={(e) => updateField("motivoConsulta", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="¿Qué te motivó a buscar ayuda para el control de peso?"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Formulario Estético */}
            {activeTab === "estetico" && (
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">Información para Tratamiento Estético</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tratamiento de Interés</label>
                    <select
                      required
                      value={formData.tratamientoInteres}
                      onChange={(e) => updateField("tratamientoInteres", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Seleccionar</option>
                      <option value="botox">Botox</option>
                      <option value="rellenos">Rellenos Dérmicos</option>
                      <option value="peeling">Peeling Químico</option>
                      <option value="laser">Láser Facial</option>
                      <option value="hilos">Hilos Tensores</option>
                      <option value="plasma">Plasma Rico en Plaquetas</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Zona a Tratar</label>
                    <select
                      required
                      value={formData.zonaTratamiento}
                      onChange={(e) => updateField("zonaTratamiento", e.target.value)}
                      className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Seleccionar</option>
                      <option value="frente">Frente</option>
                      <option value="entrecejo">Entrecejo</option>
                      <option value="patas-gallo">Patas de Gallo</option>
                      <option value="labios">Labios</option>
                      <option value="pomulos">Pómulos</option>
                      <option value="mandibula">Mandíbula</option>
                      <option value="cuello">Cuello</option>
                      <option value="rostro-completo">Rostro Completo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tratamientos Estéticos Previos</label>
                  <textarea
                    rows="3"
                    value={formData.tratamientosPrevios}
                    onChange={(e) => updateField("tratamientosPrevios", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Describe tratamientos estéticos anteriores y resultados (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expectativas del Tratamiento</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.expectativas}
                    onChange={(e) => updateField("expectativas", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="¿Qué esperas lograr con este tratamiento?"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Condiciones de la Piel</label>
                  <textarea
                    rows="2"
                    value={formData.condicionesPiel}
                    onChange={(e) => updateField("condicionesPiel", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Acné, rosácea, manchas, cicatrices, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">¿Embarazo o Lactancia?</label>
                  <select
                    required
                    value={formData.embarazoLactancia}
                    onChange={(e) => updateField("embarazoLactancia", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">Seleccionar</option>
                    <option value="no">No</option>
                    <option value="embarazo">Embarazo</option>
                    <option value="lactancia">Lactancia</option>
                    <option value="planificando">Planificando embarazo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cirugías Estéticas Previas</label>
                  <textarea
                    rows="2"
                    value={formData.cirugiasEsteticasPrevias}
                    onChange={(e) => updateField("cirugiasEsteticasPrevias", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Rinoplastia, blefaroplastia, etc. (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alergias a Medicamentos o Productos</label>
                  <textarea
                    rows="2"
                    value={formData.alergiasMedicamentos}
                    onChange={(e) => updateField("alergiasMedicamentos", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="Alergias conocidas a medicamentos, anestesia, productos cosméticos (opcional)"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Motivo de Consulta</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.motivoEstetico}
                    onChange={(e) => updateField("motivoEstetico", e.target.value)}
                    className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    placeholder="¿Qué te motivó a buscar un tratamiento estético?"
                  ></textarea>
                </div>
              </div>
            )}

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <button
                type="button"
                onClick={() => router.push("/signup")}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium active:scale-95"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver
              </button>
              <button
                type="submit"
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg transition font-medium shadow-md active:scale-95 ${
                  activeTab === "peso"
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-purple-500 hover:bg-purple-600"
                }`}
              >
                <Check className="w-5 h-5" />
                Completar Registro
              </button>
            </div>
          </form>
        </div>

        {/* Indicador de progreso */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
          <div className="w-8 h-2 bg-blue-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

