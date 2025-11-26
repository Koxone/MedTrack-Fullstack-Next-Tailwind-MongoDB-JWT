'use client';

import { Image as ImageIcon, Info, Loader } from 'lucide-react';
import { useState } from 'react';

export default function ImageGalleryUpload({
  imageFiles,
  onAddImage,
  onAddImageButton,
  onRemoveImage,
  uploadingImages,
}) {
  const [previewUrls, setPreviewUrls] = useState({});

  const handleFileChange = (index, file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrls((prev) => ({
          ...prev,
          [index]: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrls((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[index];
        return newPreviews;
      });
    }

    onAddImage(index, file);
  };

  const handleRemoveImage = (index) => {
    setPreviewUrls((prev) => {
      const newPreviews = { ...prev };
      delete newPreviews[index];
      return newPreviews;
    });

    onRemoveImage(index);
  };

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <ImageIcon className="h-4 w-4 text-pink-500" />
          Galería de Imágenes
        </label>

        {/* Images List */}
        <div className="space-y-3">
          {imageFiles.map((file, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                    disabled={uploadingImages[index]}
                    className="bg-beehealth-body-main w-full rounded-xl border-2 border-gray-200 px-4 py-3.5 text-sm text-gray-900 shadow-sm transition-all duration-300 file:mr-3 file:rounded-lg file:border-0 file:bg-pink-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-pink-600 placeholder:text-gray-400 hover:file:bg-pink-200 focus:border-pink-500 focus:shadow-md focus:shadow-pink-500/20 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  disabled={uploadingImages[index]}
                  className="rounded-xl border-2 border-red-300 bg-red-50 px-4 py-3.5 font-semibold text-red-600 shadow-sm transition-all duration-300 hover:border-red-400 hover:bg-red-100 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Eliminar
                </button>
              </div>

              {/* File Info */}
              {file && (
                <div className="flex items-start gap-3 rounded-lg bg-pink-50 px-3 py-2">
                  <div className="flex-1">
                    <p className="text-xs font-medium text-pink-700">{file.name}</p>
                    <p className="text-xs text-pink-600">{(file.size / 1024).toFixed(2)} KB</p>
                    {uploadingImages[index] && (
                      <p className="mt-1 flex items-center gap-2 text-xs text-pink-600">
                        <Loader className="h-3 w-3 animate-spin" />
                        Subiendo...
                      </p>
                    )}
                  </div>
                  {index === 0 && file && (
                    <span className="rounded-full bg-pink-200 px-2 py-1 text-xs font-semibold whitespace-nowrap text-pink-700">
                      Portada
                    </span>
                  )}
                </div>
              )}

              {/* Preview */}
              {previewUrls[index] && (
                <div className="relative overflow-hidden rounded-xl border-2 border-pink-200 bg-gray-100">
                  <img
                    src={previewUrls[index]}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-xl"
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Add Button */}
        <button
          type="button"
          onClick={onAddImageButton}
          className="w-full rounded-xl border-2 border-dashed border-pink-300 bg-pink-50 px-4 py-3.5 font-semibold text-pink-600 shadow-sm transition-all duration-300 hover:border-pink-400 hover:bg-pink-100 active:scale-95"
        >
          + Agregar otra imagen
        </button>

        {/* Info */}
        <div className="flex items-start gap-2 rounded-lg bg-pink-50 px-3 py-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-pink-600" />
          <p className="text-xs text-pink-700">
            La primera imagen será la portada principal. Las imágenes se convertirán a WebP
            automáticamente.
          </p>
        </div>
      </div>
    </div>
  );
}
