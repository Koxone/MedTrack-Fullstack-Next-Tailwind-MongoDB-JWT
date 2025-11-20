'use client';

import { Plus, AlertCircle, Check, X, Image as ImageIcon, Trash2 } from 'lucide-react';
import MealsSection from './MealsSection';
import { useState } from 'react';

export default function DietForm() {
  const [allowedFoods, setAllowedFoods] = useState('');
  const [forbiddenFoods, setForbiddenFoods] = useState('');
  const [allowedLiquids, setAllowedLiquids] = useState('');
  const [forbiddenLiquids, setForbiddenLiquids] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [images, setImages] = useState([]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleAddImage = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages([...images, event.target?.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-full bg-linear-to-br from-gray-50 to-white">
      <form className="mx-auto max-w-5xl space-y-8 p-4 md:p-0">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
            Crear Plan Nutricional
          </h1>
          <p className="text-gray-600">
            Completa los detalles del nuevo plan dietético para tus pacientes
          </p>
        </div>

        {/* Basic info section */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-blue-600"></div>
            Información Básica
          </h2>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Plan name - Required */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nombre del Plan
                  <span className="ml-1 text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Plan Mediterráneo"
                />
                <p className="mt-1 text-xs text-gray-500">Nombre identificativo del plan</p>
              </div>

              {/* Duration - Optional */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Duración
                  <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Ej: 30 días, 4 semanas"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Duración recomendada del plan</p>
              </div>
            </div>

            {/* Category - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Categoría
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ej: Pérdida de peso, Mantenimiento, Ganancia muscular"
              />
              <p className="mt-1 text-xs text-gray-500">Tipo o categoría del plan</p>
            </div>
          </div>
        </section>

        {/* Description section */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-green-600"></div>
            Detalles del Plan
          </h2>

          <div className="space-y-6">
            {/* Description - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Descripción General
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="4"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Describe el objetivo, beneficios y características principales del plan nutricional..."
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">
                Proporciona una descripción clara del plan
              </p>
            </div>

            {/* Benefits - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Beneficios
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Beneficios esperados de seguir este plan (ej: aumento de energía, mejora de digestión)..."
              ></textarea>
            </div>

            {/* Instructions - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Instrucciones
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Cómo seguir el plan, horarios de comidas, preparación de alimentos..."
              ></textarea>
            </div>
          </div>
        </section>

        {/* Allowed & Forbidden Foods */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-orange-600"></div>
            Alimentos
          </h2>

          <div className="space-y-6">
            {/* Allowed Foods - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Alimentos Permitidos
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                value={allowedFoods}
                onChange={(e) => setAllowedFoods(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ingresa cada alimento en una nueva línea&#10;Ej:&#10;Pollo&#10;Arroz integral&#10;Brócoli"
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">Ingresa cada alimento en una línea nueva</p>

              {/* Allowed Foods Note - Optional */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nota sobre alimentos permitidos
                  <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Orgánicos de preferencia, sin conservantes"
                />
              </div>
            </div>

            {/* Forbidden Foods - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Alimentos Prohibidos
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                value={forbiddenFoods}
                onChange={(e) => setForbiddenFoods(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ingresa cada alimento en una nueva línea&#10;Ej:&#10;Alimentos fritos&#10;Azúcares refinados&#10;Bebidas alcohólicas"
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">Ingresa cada alimento en una línea nueva</p>

              {/* Forbidden Foods Note - Optional */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nota sobre alimentos prohibidos
                  <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Pueden causar inflamación, aumentan glucosa en sangre"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Beverages */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-cyan-600"></div>
            Bebidas
          </h2>

          <div className="space-y-6">
            {/* Allowed Liquids - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Líquidos Permitidos
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                value={allowedLiquids}
                onChange={(e) => setAllowedLiquids(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ingresa cada bebida en una nueva línea&#10;Ej:&#10;Agua&#10;Té verde&#10;Café sin azúcar"
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">Ingresa cada bebida en una línea nueva</p>

              {/* Allowed Liquids Note - Optional */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nota sobre líquidos permitidos
                  <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Mínimo 2 litros de agua al día"
                />
              </div>
            </div>

            {/* Forbidden Liquids - Optional */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Líquidos Prohibidos
                <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
              </label>
              <textarea
                rows="3"
                value={forbiddenLiquids}
                onChange={(e) => setForbiddenLiquids(e.target.value)}
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Ingresa cada bebida en una nueva línea&#10;Ej:&#10;Refrescos&#10;Jugos industriales&#10;Alcohol"
              ></textarea>
              <p className="mt-2 text-xs text-gray-500">Ingresa cada bebida en una línea nueva</p>

              {/* Forbidden Liquids Note - Optional */}
              <div className="mt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Nota sobre líquidos prohibidos
                  <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Ej: Contienen azúcares añadidos y conservantes"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Ingredients - Optional */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-yellow-600"></div>
            Ingredientes
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </h2>

          <div>
            <label className="mb-4 block text-sm font-semibold text-gray-700">
              Lista de Ingredientes
            </label>

            <div className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex gap-3">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(index, e.target.value)}
                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder={`Ej: ${index === 0 ? '2 pechugas de pollo' : index === 1 ? '1 taza de arroz integral' : 'Ingrediente'}`}
                  />
                  {ingredients.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(index)}
                      className="flex items-center justify-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600 transition-colors hover:bg-red-100"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleAddIngredient}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400"
            >
              <Plus className="h-4 w-4" />
              Agregar Ingrediente
            </button>

            <p className="mt-3 text-xs text-gray-500">
              Haz clic en el botón para agregar más ingredientes
            </p>
          </div>
        </section>

        {/* Medical Notes */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-purple-600"></div>
            Notas
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </h2>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Recomendaciones Especiales
            </label>
            <textarea
              rows="5"
              className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 transition-all focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Restricciones dietéticas, alergias, contraindicaciones, consejos especiales para el paciente, notas médicas relevantes..."
            ></textarea>
            <p className="mt-2 text-xs text-gray-500">Las notas serán visibles para el paciente</p>
          </div>
        </section>

        {/* Images - Optional */}
        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <div className="h-6 w-1 rounded-full bg-pink-600"></div>
            Imágenes
            <span className="ml-1 text-xs text-gray-400">(Opcional)</span>
          </h2>

          <div className="space-y-4">
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-6 text-center transition-colors hover:border-gray-400">
              <input
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <ImageIcon className="h-8 w-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Haz clic para subir imágenes
                </span>
                <span className="text-xs text-gray-500">PNG, JPG o GIF (máx. 5MB)</span>
              </label>
            </div>

            {/* Images preview */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {images.map((image, index) => (
                  <div key={index} className="group relative">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-24 rounded-lg border border-gray-200 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-4 pb-8 sm:flex-row">
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
          >
            <Check className="h-5 w-5" />
            Crear Plan Dietético
          </button>
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
