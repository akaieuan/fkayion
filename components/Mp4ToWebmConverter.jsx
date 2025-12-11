import React, { useState, useRef } from 'react';

// Inline SVG Icons
const Icons = {
  Upload: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
  ),
  Download: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  FileVideo: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  Loader: () => (
    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  LoaderLarge: () => (
    <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Alert: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  AlertLarge: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Play: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  Stop: () => (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <rect x="6" y="6" width="12" height="12" />
    </svg>
  ),
};

export default function Mp4ToWebmConverter() {
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [logs, setLogs] = useState([]);
  const [copyStatus, setCopyStatus] = useState('');
  const fileInputRef = useRef(null);
  const abortRef = useRef(false);

  const log = (msg) => {
    console.log(msg);
    setLogs(prev => [...prev.slice(-100), msg]);
  };


  const addFiles = (newFiles) => {
    const mp4Files = Array.from(newFiles).filter(f => 
      f.type === 'video/mp4' || f.name.toLowerCase().endsWith('.mp4')
    );
    
    const items = mp4Files.map(f => ({
      id: Math.random().toString(36).slice(2),
      file: f,
      status: 'pending',
      progress: 0,
      outputUrl: null,
      outputSize: 0,
      error: null,
    }));
    setFiles(prev => [...prev, ...items]);
  };

  const updateFile = (id, updates) => {
    setFiles(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  // MediaRecorder converter (simpler, reliable, real-time)
  const convertWithMediaRecorder = async (item) => {
    log('Converting with MediaRecorder (real-time)...');
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    let mediaRecorder = null;
    let animationId = null;
    let frameCallbackId = null;

    try {
      const videoUrl = URL.createObjectURL(item.file);
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'auto';

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = () => reject(new Error('Failed to load video'));
        setTimeout(() => reject(new Error('Video load timeout')), 10000);
      });

      await new Promise((resolve) => {
        if (video.readyState >= 4) resolve();
        else video.oncanplaythrough = resolve;
      });

      const width = video.videoWidth;
      const height = video.videoHeight;
      const duration = video.duration || 1;
      log(`MediaRecorder: ${width}x${height}, ${duration.toFixed(1)}s`);
      updateFile(item.id, { progress: 20 });

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { alpha: false });
      const stream = canvas.captureStream(60);

      // Capture audio
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioContext.createMediaElementSource(video);
        const destination = audioContext.createMediaStreamDestination();
        source.connect(destination);
        source.connect(audioContext.destination);
        destination.stream.getAudioTracks().forEach(t => stream.addTrack(t));
      } catch (e) {
        log('MediaRecorder audio capture failed, continuing without audio');
      }

      const chunks = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm;codecs=vp8';

      mediaRecorder = new MediaRecorder(stream, {
        mimeType,
        videoBitsPerSecond: 4_000_000,
      });

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      const recordingDone = new Promise((resolve) => {
        mediaRecorder.onstop = () => resolve(chunks);
      });

      mediaRecorder.start(200);
      await video.play();

      const hasVideoFrameCallback = 'requestVideoFrameCallback' in video;
      const drawFrame = () => {
        if (abortRef.current || video.ended || video.paused) return;
        ctx.drawImage(video, 0, 0, width, height);
        const progress = 20 + (video.currentTime / duration) * 70;
        updateFile(item.id, { progress: Math.min(progress, 95) });
        if (hasVideoFrameCallback) {
          frameCallbackId = video.requestVideoFrameCallback(drawFrame);
        } else {
          animationId = requestAnimationFrame(drawFrame);
        }
      };
      if (hasVideoFrameCallback) frameCallbackId = video.requestVideoFrameCallback(drawFrame);
      else drawFrame();

      await new Promise((resolve) => {
        video.onended = resolve;
        const timeout = (duration + 10) * 1000;
        setTimeout(() => resolve(), timeout);
      });

      if (frameCallbackId && 'cancelVideoFrameCallback' in video) {
        video.cancelVideoFrameCallback(frameCallbackId);
      }
      if (animationId) cancelAnimationFrame(animationId);
      video.pause();
      if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();

      const recordedChunks = await recordingDone;
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      if (blob.size === 0) throw new Error('MediaRecorder produced empty output');

      const outputUrl = URL.createObjectURL(blob);
      updateFile(item.id, {
        status: 'done',
        progress: 100,
        outputUrl,
        outputSize: blob.size,
      });
      log(`MediaRecorder done: ${(blob.size / 1024 / 1024).toFixed(2)} MB`);
      URL.revokeObjectURL(videoUrl);
    } catch (e) {
      log(`MediaRecorder ERROR: ${e?.message || e}`);
      updateFile(item.id, { status: 'error', error: e?.message || String(e) });
    } finally {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        try { mediaRecorder.stop(); } catch {}
      }
      if (frameCallbackId && 'cancelVideoFrameCallback' in video) {
        try { video.cancelVideoFrameCallback(frameCallbackId); } catch {}
      }
      if (animationId) cancelAnimationFrame(animationId);
      video.pause();
      video.src = '';
    }
  };

  const convertFile = async (item) => {
    log(`Starting: ${item.file.name}`);
    updateFile(item.id, { status: 'converting', progress: 0 });
    abortRef.current = false;
    await convertWithMediaRecorder(item);
  };

  const startConversion = async () => {
    setConverting(true);
    setLogs([]);
    abortRef.current = false;

    for (const item of files.filter(f => f.status === 'pending')) {
      if (abortRef.current) {
        log('Conversion stopped by user');
        break;
      }
      await convertFile(item);
    }

    setConverting(false);
  };

  const stopConversion = () => {
    abortRef.current = true;
    log('Stopping after current file...');
  };

  const downloadFile = (item) => {
    const a = document.createElement('a');
    a.href = item.outputUrl;
    a.download = item.file.name.replace(/\.mp4$/i, '.webm');
    a.click();
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.outputUrl) URL.revokeObjectURL(file.outputUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach(f => {
      if (f.outputUrl) URL.revokeObjectURL(f.outputUrl);
    });
    setFiles([]);
    setLogs([]);
    setCopyStatus('');
  };

  const copyLogsToClipboard = async () => {
    try {
      const text = logs.join('\\n');
      await navigator.clipboard.writeText(text);
      setCopyStatus('Copied');
      setTimeout(() => setCopyStatus(''), 1500);
    } catch (e) {
      setCopyStatus('Copy failed');
      setTimeout(() => setCopyStatus(''), 1500);
    }
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const doneCount = files.filter(f => f.status === 'done').length;

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="max-w-xl mx-auto">
        <h1 className="text-xl font-bold text-white text-center mb-1">akaConverter</h1>
        <p className="text-slate-400 text-xs text-center mb-4"></p>

        <div
          onClick={() => !converting && fileInputRef.current?.click()}
          onDrop={(e) => { e.preventDefault(); if (!converting) addFiles(e.dataTransfer.files); }}
          onDragOver={(e) => e.preventDefault()}
          className={`border-2 border-dashed rounded-xl p-6 text-center mb-4 transition-colors ${
            converting ? 'border-slate-700 cursor-not-allowed' : 'border-slate-600 cursor-pointer hover:border-blue-500'
          }`}
        >
          <div className="text-slate-400 flex justify-center mb-2"><Icons.Upload /></div>
          <p className="text-slate-300 text-sm">
            {converting ? 'Converting...' : 'Drop MP4 files or click to browse'}
          </p>
          <input ref={fileInputRef} type="file" accept="video/mp4,.mp4" multiple onChange={(e) => addFiles(e.target.files)} className="hidden" />
        </div>

        {files.length > 0 && (
          <div className="bg-slate-800 rounded-xl p-3 mb-4 space-y-2">
            {files.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-2 bg-slate-700 rounded-lg">
                <div className="text-blue-400 flex-shrink-0"><Icons.FileVideo /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">{item.file.name}</p>
                  <p className="text-slate-400 text-xs">
                    {(item.file.size / 1024 / 1024).toFixed(1)} MB
                    {item.status === 'converting' && ` • ${Math.round(item.progress)}%`}
                    {item.status === 'done' && (
                      <span className="text-green-400"> → {(item.outputSize / 1024 / 1024).toFixed(1)} MB ({((item.outputSize / item.file.size) * 100).toFixed(0)}%)</span>
                    )}
                    {item.status === 'error' && <span className="text-red-400"> • {item.error}</span>}
                  </p>
                  {item.status === 'converting' && (
                    <div className="h-1 bg-slate-600 rounded mt-1">
                      <div className="h-full bg-blue-500 rounded transition-all duration-300" style={{ width: `${item.progress}%` }} />
                    </div>
                  )}
                </div>
                {item.status === 'done' && (
                  <button onClick={() => downloadFile(item)} className="p-1.5 bg-green-500/20 rounded hover:bg-green-500/30 transition-colors">
                    <div className="text-green-400"><Icons.Download /></div>
                  </button>
                )}
                {item.status === 'converting' && <div className="text-blue-400"><Icons.Loader /></div>}
                {item.status === 'error' && <div className="text-red-400"><Icons.Alert /></div>}
                {item.status === 'pending' && !converting && (
                  <button onClick={() => removeFile(item.id)} className="px-2 text-slate-400 hover:text-red-400 transition-colors">×</button>
                )}
              </div>
            ))}
          </div>
        )}

        {pendingCount > 0 && !converting && (
          <button onClick={startConversion} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 mb-3 transition-colors">
            <Icons.Play /> Convert {pendingCount} file{pendingCount > 1 ? 's' : ''}
          </button>
        )}

        {converting && (
          <button onClick={stopConversion} className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 mb-3 transition-colors">
            <Icons.Stop /> Stop after current
          </button>
        )}

        {doneCount > 0 && !converting && (
          <div className="flex gap-2 mb-3">
            <button onClick={() => files.filter(f => f.status === 'done').forEach(downloadFile)} className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 transition-colors">
              <Icons.Download /> Download {doneCount > 1 ? `All (${doneCount})` : 'WebM'}
            </button>
            <button onClick={clearAll} className="py-3 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-colors">
              Clear
            </button>
          </div>
        )}

        <div className="p-3 bg-slate-800 rounded-lg">
          <p className="text-slate-400 text-xs">
            <strong className="text-slate-300">Tip for large batches:</strong> Use the native ffmpeg script (`npm run ffmpeg:convert -- --input ./videos --output ./output-webm`) for faster, higher-quality batch processing. MediaRecorder here is a real-time, in-browser fallback.
          </p>
        </div>

        {logs.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-300 text-xs font-semibold">Logs</span>
              <div className="flex items-center gap-2">
                {copyStatus && <span className="text-slate-400 text-xs">{copyStatus}</span>}
                <button
                  onClick={copyLogsToClipboard}
                  className="text-xs px-2 py-1 bg-slate-700 hover:bg-slate-600 text-white rounded"
                >
                  Copy logs
                </button>
              </div>
            </div>
            <div className="bg-black rounded-lg p-2 text-xs font-mono max-h-48 overflow-y-auto">
              {logs.map((l, i) => (
                <div key={i} className={
                  l.includes('ERROR') ? 'text-red-400' : 
                  l.includes('Done') ? 'text-green-400' : 
                  l.includes('Command') ? 'text-yellow-400' :
                  'text-slate-400'
                }>{l}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
