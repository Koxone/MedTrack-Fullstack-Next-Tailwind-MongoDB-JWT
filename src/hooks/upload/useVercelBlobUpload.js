import { useState } from 'react';

export function useVercelBlobUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * uploadFile
   * @param {File} file - file object from input
   * @param {'avatars' | 'diets'} folder - folder name for the blob
   * @returns {Promise<string>} - URL of the uploaded blob
   */
  const uploadFile = async (file, folder) => {
    if (!file) return null;
    setLoading(true);
    setError(null);

    try {
      // Ensure filename is unique by prefixing folder and timestamp
      const timestamp = Date.now();
      const safeFilename = `${folder}/${timestamp}-${file.name}`;

      const res = await fetch(`/api/upload?filename=${safeFilename}`, {
        method: 'POST',
        body: file,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Upload failed');
        setLoading(false);
        return null;
      }

      setLoading(false);
      return data.url; 
    } catch (err) {
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { uploadFile, loading, error };
}
