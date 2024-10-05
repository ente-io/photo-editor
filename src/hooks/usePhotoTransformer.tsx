import cropCanvas from '../lib/transform/cropCanvas';
import rotateCanvas from '../lib/transform/rotateCanvas';
import flipCanvas from '../lib/transform/flipCanvas';
import { usePhotoEditorContext } from '../components/PhotoEditorContext';

const usePhotoTransformer = () => {
  const { originalSizeCanvasRef, previewCanvasRef } = usePhotoEditorContext();

  const cropPhoto = (cropArea: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => {
    const canvases = [originalSizeCanvasRef.current, previewCanvasRef.current];
    canvases.forEach((canvas) => {
      if (!canvas) return console.error('canvas is null');
      cropCanvas(canvas, cropArea);
    });
  };

  const rotatePhoto = (angle: number) => {
    const canvases = [originalSizeCanvasRef.current, previewCanvasRef.current];

    canvases.forEach((canvas) => {
      if (!canvas) return console.error('canvas is null');
      rotateCanvas(canvas, angle);
    });
  };

  const flipPhoto = (direction: 'vertical' | 'horizontal') => {
    const canvases = [originalSizeCanvasRef.current, previewCanvasRef.current];

    canvases.forEach((canvas) => {
      if (!canvas) return console.error('canvas is null');
      flipCanvas(canvas, direction);
    });
  };

  return {
    cropPhoto,
    rotatePhoto,
    flipPhoto
  };
};

export default usePhotoTransformer;
