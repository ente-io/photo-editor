import React, { useRef, useState, useEffect } from 'react';
import {
  PhotoEditorPreview,
  usePhotoColourAdjuster,
  usePhotoTransformer,
  PhotoEditorProvider,
  usePhotoEditor,
  usePhotoEditorContext
} from '@ente-io/photo-editor-sdk';

const MyEditorComponent: React.FC = () => {
  const transformer = usePhotoTransformer();
  const photoEditor = usePhotoEditor();
  const { previewCanvasRef } = usePhotoEditorContext();
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);

  const [photoColourAdjusterValues, setPhotoColourAdjusterValues] = useState({
    brightness: 100,
    contrast: 100,
    blur: 0,
    saturation: 100,
    invert: false
  });

  const [isFreeHandCropActive, setIsFreeHandCropActive] = useState(false);
  const [cropStart, setCropStart] = useState<{ x: number; y: number } | null>(
    null
  );
  const [cropEnd, setCropEnd] = useState<{ x: number; y: number } | null>(null);

  usePhotoColourAdjuster({
    values: photoColourAdjusterValues
  });

  useEffect(() => {
    const canvas = previewCanvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;

    // Set overlay canvas dimensions to match the preview canvas
    overlayCanvas.width = canvas.width;
    overlayCanvas.height = canvas.height;

    const handleMouseDown = (e: MouseEvent) => {
      if (!isFreeHandCropActive) return;
      const rect = canvas.getBoundingClientRect();
      const start = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
      setCropStart(start);
      setCropEnd(start);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isFreeHandCropActive || !cropStart) return;
      const rect = canvas.getBoundingClientRect();
      setCropEnd({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isFreeHandCropActive || !cropStart || !cropEnd) return;

      const cropArea = {
        x: Math.min(cropStart.x, cropEnd.x),
        y: Math.min(cropStart.y, cropEnd.y),
        width: Math.abs(cropEnd.x - cropStart.x),
        height: Math.abs(cropEnd.y - cropStart.y)
      };

      transformer.cropPhoto(cropArea);
      setIsFreeHandCropActive(false);
      setCropStart(null);
      setCropEnd(null);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isFreeHandCropActive, cropStart, cropEnd, transformer, previewCanvasRef]);

  // Draw the crop rectangle on the overlay canvas
  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
    if (!overlayCanvas || !cropStart || !cropEnd) return;

    const ctx = overlayCanvas.getContext('2d');
    if (!ctx) return;

    // Clear previous drawings
    ctx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);

    // Draw the crop rectangle
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.rect(
      Math.min(cropStart.x, cropEnd.x),
      Math.min(cropStart.y, cropEnd.y),
      Math.abs(cropEnd.x - cropStart.x),
      Math.abs(cropEnd.y - cropStart.y)
    );
    ctx.stroke();
  }, [cropStart, cropEnd]);

  return (
    <>
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <PhotoEditorPreview show={true} />
        <canvas
          ref={overlayCanvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            pointerEvents: 'none'
          }}
        />
      </div>
      <div>
        <button onClick={() => transformer.rotatePhoto(90)}>Rotate 90°</button>
        <button onClick={() => transformer.flipPhoto('horizontal')}>
          Flip Horizontal
        </button>
        <button onClick={() => transformer.flipPhoto('vertical')}>
          Flip Vertical
        </button>
        <button onClick={() => setIsFreeHandCropActive(!isFreeHandCropActive)}>
          {isFreeHandCropActive ? 'Cancel Free-Hand Crop' : 'Free-Hand Crop'}
        </button>
        <button onClick={() => photoEditor.reset()}>Reset</button>
      </div>
      <div>
        <label>
          Brightness:
          <input
            type='range'
            min='0'
            max='200'
            value={photoColourAdjusterValues.brightness}
            onChange={(e) =>
              setPhotoColourAdjusterValues((prev) => ({
                ...prev,
                brightness: Number(e.target.value)
              }))
            }
          />
        </label>
        <label>
          Contrast:
          <input
            type='range'
            min='0'
            max='200'
            value={photoColourAdjusterValues.contrast}
            onChange={(e) =>
              setPhotoColourAdjusterValues((prev) => ({
                ...prev,
                contrast: Number(e.target.value)
              }))
            }
          />
        </label>
        <label>
          Saturation:
          <input
            type='range'
            min='0'
            max='200'
            value={photoColourAdjusterValues.saturation}
            onChange={(e) =>
              setPhotoColourAdjusterValues((prev) => ({
                ...prev,
                saturation: Number(e.target.value)
              }))
            }
          />
        </label>
        <label>
          Blur:
          <input
            type='range'
            min='0'
            max='10'
            value={photoColourAdjusterValues.blur}
            onChange={(e) =>
              setPhotoColourAdjusterValues((prev) => ({
                ...prev,
                blur: Number(e.target.value)
              }))
            }
          />
        </label>
        <label>
          Invert:
          <input
            type='checkbox'
            checked={photoColourAdjusterValues.invert}
            onChange={(e) =>
              setPhotoColourAdjusterValues((prev) => ({
                ...prev,
                invert: e.target.checked
              }))
            }
          />
        </label>
      </div>
    </>
  );
};

function App() {
  const parentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='App'
      ref={parentRef}
      style={{
        width: '100%',
        height: '100vh'
      }}
    >
      <PhotoEditorProvider
        value={{
          parentElementRef: parentRef,
          fileURL: '/cat.jpg',
          outputMime: 'image/jpeg'
        }}
      >
        <MyEditorComponent />
      </PhotoEditorProvider>
    </div>
  );
}

export default App;
