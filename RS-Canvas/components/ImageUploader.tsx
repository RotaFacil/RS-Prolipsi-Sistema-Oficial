import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  title: string;
  onFileUpload: (file: File | null) => void;
  currentImage: string | null;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-slate-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
);


const ImageUploader: React.FC<ImageUploaderProps> = ({ title, onFileUpload, currentImage }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };
  
  const handleRemoveImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFileUpload(null);
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-1">{title}</label>
      {currentImage ? (
          <div className="relative group">
              <img src={`data:image/png;base64,${currentImage}`} alt="Uploaded preview" className="w-full rounded-md border border-slate-700"/>
              <button onClick={handleRemoveImage} className="absolute top-2 right-2 bg-red-600/80 hover:bg-red-500/80 text-white rounded-full p-1.5 transition-opacity opacity-0 group-hover:opacity-100">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </button>
          </div>
      ) : (
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex justify-center items-center w-full h-28 border-2 border-dashed rounded-md cursor-pointer transition-colors ${
          isDragging ? 'border-yellow-500 bg-slate-800/50' : 'border-slate-700 hover:border-slate-600'
        }`}
      >
        <div className="flex flex-col items-center">
          <UploadIcon />
          <p className="text-xs text-slate-500">
            <span className="font-semibold text-yellow-500">Clique para enviar</span> ou arraste e solte
          </p>
        </div>
        <input type="file" onChange={handleChange} className="hidden" accept="image/*" />
      </label>
      )}
    </div>
  );
};

export default ImageUploader;