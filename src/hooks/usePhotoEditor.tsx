import { usePhotoEditorContext } from '../components/PhotoEditorContext';
import exportCanvasToBlob from '../lib/exportCanvas';
import loadCanvases from '../lib/loadCanvases';

const usePhotoEditor = () => {
  const {
    outputMime,
    fileURL,
    parentElementRef,
    originalSizeCanvasRef,
    previewCanvasRef
  } = usePhotoEditorContext();

  const exportPhoto = async (): Promise<Blob | null> => {
    if (!originalSizeCanvasRef.current) return null;
    return await exportCanvasToBlob(originalSizeCanvasRef.current, outputMime);
  };

  const reset = () => {
    if (!previewCanvasRef.current) return;
    if (!originalSizeCanvasRef.current) return;
    if (!parentElementRef.current) return;
    loadCanvases(
      previewCanvasRef.current,
      originalSizeCanvasRef.current,
      parentElementRef.current,
      fileURL
    );
  };

  return {
    previewCanvasRef,
    originalSizeCanvasRef,
    exportPhoto,
    reset
  };
};

export default usePhotoEditor;
