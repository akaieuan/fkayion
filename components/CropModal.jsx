import React, { useState, useCallback, useEffect, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

// Icons for the modal
const Icons = {
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  Crop: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Reset: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
};

// Aspect ratio presets
const ASPECT_PRESETS = [
  { label: 'Free', value: undefined },
  { label: '1:1', value: 1 },
  { label: '16:9', value: 16 / 9 },
  { label: '9:16', value: 9 / 16 },
  { label: '4:3', value: 4 / 3 },
];

export default function CropModal({ 
  file, 
  mediaType = 'image',
  previewUrl, 
  initialCrop = null,
  onSave, 
  onCancel 
}) {
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState(null);
  const [aspect, setAspect] = useState();
  const [imgSize, setImgSize] = useState({ width: 0, height: 0, naturalWidth: 0, naturalHeight: 0 });
  
  // For video: extract first frame
  const [videoFrame, setVideoFrame] = useState(null);
  
  useEffect(() => {
    if (mediaType === 'video' && previewUrl) {
      const video = document.createElement('video');
      video.src = previewUrl;
      video.muted = true;
      video.currentTime = 0.1;
      
      video.onloadeddata = () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        setVideoFrame(canvas.toDataURL('image/jpeg', 0.9));
      };
    }
  }, [mediaType, previewUrl]);

  const imageSrc = mediaType === 'video' ? videoFrame : previewUrl;

  const onImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    setImgSize({ width, height, naturalWidth, naturalHeight });
  };

  // Calculate actual pixel crop from display crop
  const getPixelCrop = () => {
    if (!completedCrop || !imgSize.naturalWidth) return null;
    
    const scaleX = imgSize.naturalWidth / imgSize.width;
    const scaleY = imgSize.naturalHeight / imgSize.height;
    
    return {
      x: Math.round(completedCrop.x * scaleX),
      y: Math.round(completedCrop.y * scaleY),
      width: Math.round(completedCrop.width * scaleX),
      height: Math.round(completedCrop.height * scaleY),
    };
  };

  const handleSave = () => {
    const pixelCrop = getPixelCrop();
    if (pixelCrop && pixelCrop.width > 0 && pixelCrop.height > 0) {
      onSave(pixelCrop);
    } else {
      onSave(null);
    }
  };

  const handleReset = () => {
    setCrop(undefined);
    setCompletedCrop(null);
    setAspect(undefined);
  };

  const pixelCrop = getPixelCrop();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80" onClick={onCancel} />
      
      {/* Modal */}
      <div className="relative w-full max-w-3xl bg-[#121212] border border-[#282828] rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#282828]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1db954]/20 flex items-center justify-center text-[#1db954]">
              <Icons.Crop />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Crop {mediaType}</h2>
              <p className="text-sm text-[#808080]">{file?.name}</p>
            </div>
          </div>
          <button onClick={onCancel} className="p-2 text-[#808080] hover:text-white rounded-lg">
            <Icons.X />
          </button>
        </div>

        {/* Crop Area */}
        <div className="p-4 bg-black flex justify-center">
          {imageSrc ? (
            <ReactCrop
              crop={crop}
              onChange={(c) => setCrop(c)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                src={imageSrc}
                alt="Crop"
                onLoad={onImageLoad}
                style={{ maxHeight: '400px', maxWidth: '100%' }}
              />
            </ReactCrop>
          ) : (
            <div className="h-64 flex items-center justify-center text-[#808080]">
              Loading...
            </div>
          )}
        </div>

        {/* Aspect Buttons */}
        <div className="p-4 border-t border-[#282828] flex flex-wrap gap-2">
          {ASPECT_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => { setAspect(preset.value); setCrop(undefined); }}
              className={`px-3 py-1.5 rounded text-sm font-medium ${
                aspect === preset.value
                  ? 'bg-[#1db954] text-black'
                  : 'bg-[#282828] text-[#808080] hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
          
          <div className="ml-auto text-sm text-[#606060]">
            {pixelCrop ? `${pixelCrop.width} × ${pixelCrop.height}px` : 'Click and drag to crop'}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#282828] flex justify-between">
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-[#808080] hover:text-white"
          >
            <Icons.Reset /> Reset
          </button>
          
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="px-5 py-2 bg-[#282828] text-white rounded-full"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!pixelCrop}
              className="px-5 py-2 bg-[#1db954] text-black font-bold rounded-full disabled:bg-[#282828] disabled:text-[#606060]"
            >
              Apply Crop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
