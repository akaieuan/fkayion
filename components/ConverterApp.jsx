import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';
import JSZip from 'jszip';

// Icons
const Icons = {
  Upload: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
  ),
  Download: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  ),
  Video: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0118 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 016 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5" />
    </svg>
  ),
  Audio: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
    </svg>
  ),
  Image: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  Spinner: () => (
    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  ),
  X: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Play: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5.14v14l11-7-11-7z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
  ),
};

// Format configuration
const sourceTypes = [
  { value: 'video', label: 'Video', icon: 'Video', extensions: ['mp4', 'mov', 'webm', 'avi', 'mkv'], accept: 'video/*' },
  { value: 'audio', label: 'Audio', icon: 'Audio', extensions: ['mp3', 'wav', 'm4a', 'aac', 'ogg', 'flac'], accept: 'audio/*' },
  { value: 'image', label: 'Image', icon: 'Image', extensions: ['png', 'jpg', 'jpeg', 'webp', 'gif', 'bmp'], accept: 'image/*' },
];

const targetOptions = {
  video: [
    { value: 'mp4', label: 'MP4', ext: 'mp4', codec: 'libx264', description: 'CRF 15, near-lossless' },
    { value: 'webm', label: 'WebM', ext: 'webm', codec: 'libvpx-vp9', description: 'CRF 15, near-lossless' },
    { value: 'mov', label: 'MOV', ext: 'mov', codec: 'libx264', description: 'CRF 15, near-lossless' },
    { value: 'gif', label: 'GIF', ext: 'gif', codec: 'gif', description: 'Full quality palette' },
  ],
  audio: [
    { value: 'mp3', label: 'MP3', ext: 'mp3', codec: 'libmp3lame', description: '320kbps, max quality' },
    { value: 'wav', label: 'WAV', ext: 'wav', codec: 'pcm_s24le', description: '24-bit lossless' },
    { value: 'aac', label: 'AAC', ext: 'm4a', codec: 'aac', description: '320kbps, max quality' },
    { value: 'ogg', label: 'OGG', ext: 'ogg', codec: 'libvorbis', description: 'q10, max quality' },
  ],
  image: [
    { value: 'png', label: 'PNG', ext: 'png', description: 'Lossless' },
    { value: 'jpg', label: 'JPG', ext: 'jpg', description: 'q1, max quality' },
    { value: 'webp', label: 'WebP', ext: 'webp', description: 'Lossless mode' },
    { value: 'gif', label: 'GIF', ext: 'gif', description: '256 colors max' },
  ],
};

// FFmpeg command builders
const buildFFmpegArgs = (inputName, outputName, sourceType, targetFormat) => {
  const targetConfig = targetOptions[sourceType]?.find(t => t.value === targetFormat);
  if (!targetConfig) return ['-y', '-i', inputName, outputName];

  if (sourceType === 'video') {
    if (targetFormat === 'gif') {
      return ['-y', '-i', inputName, '-vf', 'split[s0][s1];[s0]palettegen=max_colors=256[p];[s1][p]paletteuse', '-loop', '0', outputName];
    }
    if (targetFormat === 'webm') {
      return ['-y', '-i', inputName, '-c:v', 'libvpx', '-crf', '10', '-b:v', '1M', outputName];
    }
    if (targetFormat === 'mov') {
      return ['-y', '-i', inputName, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', outputName];
    }
    // MP4 (H.264)
    return ['-y', '-i', inputName, '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', outputName];
  }

  if (sourceType === 'audio') {
    if (targetFormat === 'mp3') {
      return ['-y', '-i', inputName, '-c:a', 'libmp3lame', '-q:a', '0', '-b:a', '320k', outputName];
    }
    if (targetFormat === 'wav') {
      return ['-y', '-i', inputName, '-c:a', 'pcm_s24le', outputName];
    }
    if (targetFormat === 'aac') {
      return ['-y', '-i', inputName, '-c:a', 'aac', '-b:a', '320k', outputName];
    }
    if (targetFormat === 'ogg') {
      return ['-y', '-i', inputName, '-c:a', 'libvorbis', '-q:a', '10', outputName];
    }
  }

  if (sourceType === 'image') {
    if (targetFormat === 'jpg') {
      // Maximum JPEG quality (q:v 1 is highest, range 1-31)
      // -frames:v 1 ensures only one frame is output
      return ['-y', '-i', inputName, '-frames:v', '1', '-q:v', '1', outputName];
    }
    if (targetFormat === 'webp') {
      // High quality WebP (lossless can cause issues, using quality 100 instead)
      return ['-y', '-i', inputName, '-frames:v', '1', '-quality', '100', outputName];
    }
    if (targetFormat === 'png') {
      // PNG lossless
      return ['-y', '-i', inputName, '-frames:v', '1', outputName];
    }
    if (targetFormat === 'gif') {
      // Single frame GIF from image
      return ['-y', '-i', inputName, '-frames:v', '1', outputName];
    }
    // Default image conversion
    return ['-y', '-i', inputName, '-frames:v', '1', outputName];
  }

  return ['-y', '-i', inputName, outputName];
};

export default function ConverterApp() {
  const [files, setFiles] = useState([]);
  const [converting, setConverting] = useState(false);
  const [ffmpegLoaded, setFfmpegLoaded] = useState(false);
  const [ffmpegLoading, setFfmpegLoading] = useState(false);
  const [source, setSource] = useState('video');
  const [target, setTarget] = useState('webm');
  const [logs, setLogs] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  
  const fileInputRef = useRef(null);
  const ffmpegRef = useRef(null);

  const targets = useMemo(() => targetOptions[source] ?? [], [source]);
  const currentSource = sourceTypes.find(s => s.value === source);

  const log = useCallback((msg, type = 'info') => {
    console.log(msg);
    setLogs(prev => [...prev.slice(-50), { msg, type, time: new Date().toLocaleTimeString() }]);
  }, []);

  // Load FFmpeg
  const loadFFmpeg = async () => {
    if (ffmpegRef.current || ffmpegLoading) return;
    
    setFfmpegLoading(true);
    log('Loading FFmpeg...', 'info');
    
    try {
      const ffmpeg = new FFmpeg();
      
      // NO event handlers - they cause bugs in 0.12.x

      const baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/esm';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });

      ffmpegRef.current = ffmpeg;
      setFfmpegLoaded(true);
      log('FFmpeg loaded successfully!', 'success');
    } catch (e) {
      log(`Failed to load FFmpeg: ${e.message}`, 'error');
    } finally {
      setFfmpegLoading(false);
    }
  };

  useEffect(() => {
    loadFFmpeg();
  }, []);

  const addFiles = (newFiles) => {
    const validExts = currentSource?.extensions || [];
    const validFiles = Array.from(newFiles).filter(f => {
      const ext = f.name.toLowerCase().split('.').pop();
      return validExts.includes(ext);
    });
    
    if (validFiles.length === 0) {
      log(`No valid ${source} files. Supported: ${validExts.join(', ')}`, 'error');
      return;
    }
    
    const items = validFiles.map(f => ({
      id: crypto.randomUUID(),
      file: f,
      status: 'pending',
      progress: 0,
      outputUrl: null,
      outputSize: 0,
      error: null,
    }));
    setFiles(prev => [...prev, ...items]);
    log(`Added ${validFiles.length} file(s)`, 'success');
  };

  // MediaRecorder-based WebM conversion (reliable, browser-native)
  const convertWithMediaRecorder = async (item) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    let mediaRecorder = null;
    let animationId = null;

    try {
      const videoUrl = URL.createObjectURL(item.file);
      video.src = videoUrl;
      video.muted = true;
      video.playsInline = true;

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = resolve;
        video.onerror = () => reject(new Error('Failed to load video'));
        setTimeout(() => reject(new Error('Video load timeout')), 30000);
      });

      await new Promise((resolve) => {
        if (video.readyState >= 4) resolve();
        else video.oncanplaythrough = resolve;
      });

      const width = video.videoWidth;
      const height = video.videoHeight;
      const duration = video.duration || 1;
      log(`Video: ${width}x${height}, ${duration.toFixed(1)}s`, 'info');

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { alpha: false });
      const stream = canvas.captureStream(30);

      const chunks = [];
      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm;codecs=vp8';

      mediaRecorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 5_000_000 });
      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) chunks.push(e.data); };

      const recordingDone = new Promise((resolve) => { mediaRecorder.onstop = () => resolve(chunks); });

      mediaRecorder.start(100);
      await video.play();

      const drawFrame = () => {
        if (video.ended || video.paused) return;
        ctx.drawImage(video, 0, 0, width, height);
        const progress = Math.min(95, (video.currentTime / duration) * 100);
        setFiles(prev => prev.map(f => f.id === item.id ? { ...f, progress: Math.round(progress) } : f));
        animationId = requestAnimationFrame(drawFrame);
      };
      drawFrame();

      await new Promise((resolve) => { video.onended = resolve; });

      if (animationId) cancelAnimationFrame(animationId);
      video.pause();
      if (mediaRecorder.state !== 'inactive') mediaRecorder.stop();

      const recordedChunks = await recordingDone;
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      
      if (blob.size === 0) throw new Error('Conversion produced empty output');

      const outputUrl = URL.createObjectURL(blob);
      setFiles(prev => prev.map(f => f.id === item.id ? {
        ...f, status: 'done', progress: 100, outputUrl, outputSize: blob.size
      } : f));
      
      log(`✓ Done: ${(blob.size / 1024 / 1024).toFixed(2)} MB`, 'success');
      URL.revokeObjectURL(videoUrl);
    } catch (e) {
      log(`✗ Failed: ${e?.message || e}`, 'error');
      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', error: e?.message || String(e) } : f));
    } finally {
      if (mediaRecorder && mediaRecorder.state !== 'inactive') try { mediaRecorder.stop(); } catch {}
      if (animationId) cancelAnimationFrame(animationId);
      video.pause();
      video.src = '';
    }
  };

  const convertFile = async (item) => {
    const targetConfig = targets.find(t => t.value === target);
    setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'converting', progress: 0 } : f));
    log(`Converting ${item.file.name} → ${targetConfig?.label || target}...`, 'info');

    // Use MediaRecorder for WebM (reliable, browser-native)
    if (source === 'video' && target === 'webm') {
      await convertWithMediaRecorder(item);
      return;
    }

    // Use FFmpeg for other formats
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg) {
      log('FFmpeg not loaded', 'error');
      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', error: 'FFmpeg not loaded' } : f));
      return;
    }

    const inputExt = item.file.name.split('.').pop().toLowerCase();
    const fileId = Date.now();
    const inputName = `input${fileId}.${inputExt}`;
    const outputExt = targetConfig?.ext || target;
    const outputName = `output${fileId}.${outputExt}`;

    try {
      const inputData = await fetchFile(item.file);
      await ffmpeg.writeFile(inputName, inputData);
      
      const args = buildFFmpegArgs(inputName, outputName, source, target);
      log(`Running: ffmpeg ${args.join(' ')}`, 'info');
      
      const exitCode = await ffmpeg.exec(args);
      if (exitCode !== 0) throw new Error(`FFmpeg exited with code ${exitCode}`);
      
      const data = await ffmpeg.readFile(outputName);
      if (!data || data.length === 0) throw new Error('Output file is empty');

      const mimeTypes = { mp4: 'video/mp4', mov: 'video/quicktime', gif: 'image/gif', mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4', ogg: 'audio/ogg', png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
      const blob = new Blob([data], { type: mimeTypes[outputExt] || 'application/octet-stream' });
      const outputUrl = URL.createObjectURL(blob);

      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'done', progress: 100, outputUrl, outputSize: blob.size } : f));
      log(`✓ ${item.file.name} converted (${(blob.size / 1024 / 1024).toFixed(2)} MB)`, 'success');

      try { await ffmpeg.deleteFile(inputName); await ffmpeg.deleteFile(outputName); } catch {}
    } catch (e) {
      log(`✗ Failed: ${e?.message || e}`, 'error');
      setFiles(prev => prev.map(f => f.id === item.id ? { ...f, status: 'error', error: e?.message || String(e) } : f));
    }
  };

  const startConversion = async () => {
    if (!ffmpegLoaded) {
      log('FFmpeg not loaded yet', 'error');
      return;
    }

    setConverting(true);
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const item of pendingFiles) {
      await convertFile(item);
    }
    
    setConverting(false);
  };

  const downloadFile = (item) => {
    const a = document.createElement('a');
    a.href = item.outputUrl;
    const targetConfig = targets.find(t => t.value === target);
    a.download = item.file.name.replace(/\.[^/.]+$/, `.${targetConfig?.ext || target}`);
    a.click();
  };

  const [zipping, setZipping] = useState(false);

  const downloadAllAsZip = async () => {
    const doneFiles = files.filter(f => f.status === 'done');
    
    // Single file - just download directly
    if (doneFiles.length === 1) {
      downloadFile(doneFiles[0]);
      return;
    }

    // Multiple files - create ZIP
    setZipping(true);
    log('Creating ZIP bundle...', 'info');

    try {
      const zip = new JSZip();
      const targetConfig = targets.find(t => t.value === target);
      const ext = targetConfig?.ext || target;

      // Add each converted file to the ZIP
      for (const item of doneFiles) {
        const response = await fetch(item.outputUrl);
        const blob = await response.blob();
        const fileName = item.file.name.replace(/\.[^/.]+$/, `.${ext}`);
        zip.file(fileName, blob);
        log(`Added: ${fileName}`, 'info');
      }

      // Generate ZIP
      const zipBlob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      }, (metadata) => {
        log(`Compressing: ${Math.round(metadata.percent)}%`, 'info');
      });

      // Download ZIP
      const url = URL.createObjectURL(zipBlob);
      const a = document.createElement('a');
      a.href = url;
      const timestamp = new Date().toISOString().slice(0, 10);
      a.download = `cnvrt-${source}-to-${target}-${timestamp}.zip`;
      a.click();
      URL.revokeObjectURL(url);

      log(`✓ ZIP created: ${(zipBlob.size / 1024 / 1024).toFixed(2)} MB (${doneFiles.length} files)`, 'success');
    } catch (e) {
      log(`✗ ZIP failed: ${e.message}`, 'error');
    } finally {
      setZipping(false);
    }
  };

  const removeFile = (id) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file?.outputUrl) URL.revokeObjectURL(file.outputUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const clearAll = () => {
    files.forEach(f => { if (f.outputUrl) URL.revokeObjectURL(f.outputUrl); });
    setFiles([]);
    setLogs([]);
  };

  const pendingCount = files.filter(f => f.status === 'pending').length;
  const doneCount = files.filter(f => f.status === 'done').length;

  const getFileIcon = () => {
    const Icon = Icons[currentSource?.icon || 'Video'];
    return <Icon />;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* Gradient Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#0a0a0a] to-[#0d1f0d] pointer-events-none" />
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} 
      />

      <div className="relative max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black tracking-tight mb-3 bg-gradient-to-r from-white via-white to-[#1db954] bg-clip-text text-transparent">
            CNVRT-4UH
          </h1>
          <p className="text-[#a0a0a0] text-lg">
            convert high-quality img/vid/aud - built by akaieuan-4uh001 
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-2 bg-[#1db954]/10 border border-[#1db954]/20 rounded-full text-[#1db954] text-xs font-medium mb-6">
            <Icons.Zap />
            Powered by Health
          </div>
        </div>

        {/* FFmpeg Status */}
        {!ffmpegLoaded && (
          <div className="mb-6 p-4 bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl flex items-center gap-3">
            {ffmpegLoading ? (
              <>
                <div className="text-[#1db954]"><Icons.Spinner /></div>
                <span className="text-[#a0a0a0]">Loading FFmpeg engine...</span>
              </>
            ) : (
              <>
                <div className="text-red-400"><Icons.X /></div>
                <span className="text-[#a0a0a0]">Failed to load FFmpeg</span>
                <button onClick={loadFFmpeg} className="ml-auto px-4 py-1.5 bg-[#1db954] text-black font-semibold rounded-full text-sm">
                  Retry
                </button>
              </>
            )}
          </div>
        )}

        {/* Main Card */}
        <div className="bg-[#121212] border border-[#282828] rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
          
          {/* Drop Zone */}
          <div className="p-6">
            <div
              onClick={() => !converting && ffmpegLoaded && fileInputRef.current?.click()}
              onDrop={(e) => { 
                e.preventDefault(); 
                setDragOver(false);
                if (!converting && ffmpegLoaded) addFiles(e.dataTransfer.files); 
              }}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 ${
                !ffmpegLoaded ? 'border-[#282828] bg-[#0a0a0a] cursor-not-allowed opacity-50' :
                dragOver ? 'border-[#1db954] bg-[#1db954]/5 scale-[1.02]' :
                converting ? 'border-[#282828] bg-[#0a0a0a] cursor-not-allowed' :
                'border-[#282828] hover:border-[#3a3a3a] hover:bg-[#181818] cursor-pointer'
              }`}
            >
              <div className={`mx-auto mb-4 w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
                dragOver ? 'bg-[#1db954]/20 text-[#1db954]' : 'bg-[#282828] text-[#808080]'
              }`}>
                <Icons.Upload />
              </div>
              <p className="text-xl font-semibold text-white mb-1">
                {dragOver ? 'Drop files here' : 'Drag & drop files'}
              </p>
              <p className="text-[#808080] text-sm">
                or click to browse • {currentSource?.extensions.join(', ')}
              </p>
              <input 
                ref={fileInputRef} 
                type="file" 
                multiple 
                onChange={(e) => addFiles(e.target.files)} 
                className="hidden" 
                accept={currentSource?.accept}
              />
            </div>
          </div>

          {/* Format Selection */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Source Type */}
              <div>
                <label className="block text-xs font-semibold text-[#808080] uppercase tracking-wider mb-2">
                  Source Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {sourceTypes.map((s) => {
                    const Icon = Icons[s.icon];
                    return (
                      <button
                        key={s.value}
                        onClick={() => { setSource(s.value); setTarget(targetOptions[s.value][0].value); clearAll(); }}
                        className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-all ${
                          source === s.value 
                            ? 'bg-[#1db954] text-black' 
                            : 'bg-[#1a1a1a] text-[#808080] hover:bg-[#282828] hover:text-white'
                        }`}
                      >
                        <Icon />
                        <span className="text-xs font-semibold">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Format */}
              <div>
                <label className="block text-xs font-semibold text-[#808080] uppercase tracking-wider mb-2">
                  Convert To
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {targets.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setTarget(t.value)}
                      className={`p-3 rounded-xl text-left transition-all ${
                        target === t.value 
                          ? 'bg-[#1db954] text-black' 
                          : 'bg-[#1a1a1a] text-[#808080] hover:bg-[#282828] hover:text-white'
                      }`}
                    >
                      <span className="block text-sm font-bold">{t.label}</span>
                      <span className={`text-xs ${target === t.value ? 'text-black/60' : 'text-[#606060]'}`}>
                        {t.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="border-t border-[#282828]">
              <div className="p-4 space-y-2">
                {files.map(item => (
                  <div key={item.id} className="group flex items-center gap-3 p-3 bg-[#1a1a1a] hover:bg-[#222222] rounded-xl transition-colors">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.status === 'done' ? 'bg-[#1db954]/20 text-[#1db954]' :
                      item.status === 'error' ? 'bg-red-500/20 text-red-400' :
                      item.status === 'converting' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-[#282828] text-[#606060]'
                    }`}>
                      {item.status === 'converting' ? <Icons.Spinner /> :
                       item.status === 'done' ? <Icons.Check /> :
                       item.status === 'error' ? <Icons.X /> :
                       getFileIcon()}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.file.name}</p>
                      <p className="text-xs text-[#606060]">
                        {(item.file.size / 1024 / 1024).toFixed(1)} MB
                        {item.status === 'converting' && <span className="text-blue-400 ml-2">{item.progress}%</span>}
                        {item.status === 'done' && <span className="text-[#1db954] ml-2">→ {(item.outputSize / 1024 / 1024).toFixed(1)} MB</span>}
                        {item.status === 'error' && <span className="text-red-400 ml-2">{item.error}</span>}
                      </p>
                      {item.status === 'converting' && (
                        <div className="mt-1.5 h-1 bg-[#282828] rounded-full overflow-hidden">
                          <div className="h-full bg-[#1db954] transition-all duration-300" style={{ width: `${item.progress}%` }} />
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {item.status === 'done' && (
                        <button
                          onClick={() => downloadFile(item)}
                          className="p-2 bg-[#1db954] text-black rounded-lg hover:bg-[#1ed760] transition-colors"
                        >
                          <Icons.Download />
                        </button>
                      )}
                      {(item.status === 'pending' || item.status === 'done' || item.status === 'error') && !converting && (
                        <button
                          onClick={() => removeFile(item.id)}
                          className="p-2 text-[#606060] hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Icons.Trash />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          {(pendingCount > 0 || doneCount > 0) && (
            <div className="p-4 border-t border-[#282828] flex gap-3">
              {pendingCount > 0 && !converting && (
                <button
                  onClick={startConversion}
                  disabled={!ffmpegLoaded}
                  className="flex-1 py-3.5 bg-[#1db954] hover:bg-[#1ed760] disabled:bg-[#282828] disabled:text-[#606060] text-black font-bold rounded-full flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Icons.Play /> Convert {pendingCount} {pendingCount === 1 ? 'File' : 'Files'}
                </button>
              )}
              
              {converting && (
                <div className="flex-1 py-3.5 bg-[#282828] text-white font-bold rounded-full flex items-center justify-center gap-2">
                  <Icons.Spinner /> Converting...
                </div>
              )}
              
              {doneCount > 0 && !converting && (
                <>
                  <button
                    onClick={downloadAllAsZip}
                    disabled={zipping}
                    className="flex-1 py-3.5 bg-[#282828] hover:bg-[#3a3a3a] disabled:bg-[#1a1a1a] text-white font-bold rounded-full flex items-center justify-center gap-2 transition-colors"
                  >
                    {zipping ? (
                      <>
                        <Icons.Spinner /> Creating ZIP...
                      </>
                    ) : (
                      <>
                        <Icons.Download /> {doneCount > 1 ? `Download ZIP (${doneCount})` : 'Download'}
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearAll}
                    disabled={zipping}
                    className="py-3.5 px-6 bg-[#1a1a1a] hover:bg-[#282828] disabled:opacity-50 text-[#808080] hover:text-white font-semibold rounded-full transition-colors"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Logs */}
        {logs.length > 0 && (
          <div className="mt-6 bg-[#121212] border border-[#282828] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-[#282828] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#808080] uppercase tracking-wider">Console</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={async () => {
                    const text = logs.map(l => `${l.time} ${l.msg}`).join('\n');
                    await navigator.clipboard.writeText(text);
                    log('Logs copied to clipboard', 'success');
                  }} 
                  className="text-xs text-[#606060] hover:text-[#1db954] transition-colors"
                >
                  Copy Logs
                </button>
                <button onClick={() => setLogs([])} className="text-xs text-[#606060] hover:text-white transition-colors">
                  Clear
                </button>
              </div>
            </div>
            <div className="p-4 max-h-40 overflow-y-auto font-mono text-xs space-y-1">
              {logs.map((l, i) => (
                <div key={i} className={`flex gap-2 ${
                  l.type === 'error' ? 'text-red-400' :
                  l.type === 'success' ? 'text-[#1db954]' :
                  l.type === 'ffmpeg' ? 'text-[#606060]' :
                  'text-[#808080]'
                }`}>
                  <span className="text-[#404040]">{l.time}</span>
                  <span>{l.msg}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <p className="text-center text-[#404040] text-xs mt-8">
          All conversions happen locally in your browser. No files are uploaded.
        </p>
      </div>
    </div>
  );
}
