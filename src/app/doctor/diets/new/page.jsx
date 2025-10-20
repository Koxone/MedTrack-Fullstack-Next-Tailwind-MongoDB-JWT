"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import { useState } from "react";

export default function DoctorDietNew() {
  const router = useRouter();
  const [meals, setMeals] = useState([
    { nombre: "Desayuno", hora: "08:00", items: [""] },
    { nombre: "Almuerzo", hora: "13:00", items: [""] },
    { nombre: "Cena", hora: "19:00", items: [""] },
  ]);

  const addItem = (mealIndex) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.push("");
    setMeals(newMeals);
  };

  const removeItem = (mealIndex, itemIndex) => {
    const newMeals = [...meals];
    newMeals[mealIndex].items.splice(itemIndex, 1);
    setMeals(newMeals);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver a Dietas
      </button>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Crear Nueva Dieta</h1>

        <form className="space-y-4 md:space-y-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre del Plan</label>
              <input
                type="text"
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Plan Mediterráneo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duración (días)</label>
              <input
                type="number"
                className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="30"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
            <textarea
              rows="3"
              className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Describe el objetivo y características del plan nutricional..."
            ></textarea>
          </div>

          {/* Comidas del día */}
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">Plan Diario de Comidas</h2>
            <div className="space-y-4 md:space-y-6">
              {meals.map((meal, mealIndex) => (
                <div key={mealIndex} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <input
                        type="text"
                        value={meal.nombre}
                        onChange={(e) => {
                          const newMeals = [...meals];
                          newMeals[mealIndex].nombre = e.target.value;
                          setMeals(newMeals);
                        }}
                        className="font-semibold text-gray-900 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                      />
                      <input
                        type="time"
                        value={meal.hora}
                        onChange={(e) => {
                          const newMeals = [...meals];
                          newMeals[mealIndex].hora = e.target.value;
                          setMeals(newMeals);
                        }}
                        className="text-sm text-gray-600 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => addItem(mealIndex)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      + Agregar alimento
                    </button>
                  </div>
                  <div className="space-y-2">
                    {meal.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Ej: 1 taza de avena con frutas"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                        {meal.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeItem(mealIndex, itemIndex)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notas adicionales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notas e Instrucciones Especiales</label>
            <textarea
              rows="4"
              className="w-full px-4 py-2 active:scale-95 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Recomendaciones, restricciones, consejos adicionales..."
            ></textarea>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.push("/doctor/diets")}
              className="flex-1 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
            >
              Crear Dieta
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

