import React, { useState } from 'react';
import { Upload, Film, X } from 'lucide-react';

export function MovieUpload() {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type.startsWith('video/')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter(
        file => file.type.startsWith('video/')
      );
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 hover:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center">
          <Upload className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-lg mb-2">Glissez et déposez vos fichiers vidéo ici</p>
          <p className="text-sm text-gray-400 mb-4">Formats supportés: MP4, MKV, AVI, MOV</p>
          <label className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            Sélectionner des fichiers
            <input
              type="file"
              className="hidden"
              accept="video/*"
              multiple
              onChange={handleFileInput}
            />
          </label>
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Film className="w-6 h-6" />
            Fichiers à télécharger
          </h3>
          <div className="space-y-3">
            {files.map((file, index) => (
              <div 
                key={index}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Film className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFile(index)}
                  className="p-1 hover:bg-gray-600 rounded-full"
                >
                  <X className="w-5 h-5 text-red-400" />
                </button>
              </div>
            ))}
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Télécharger tous les fichiers
          </button>
        </div>
      )}
    </div>
  );
}