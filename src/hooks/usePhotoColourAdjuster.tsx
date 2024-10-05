import { useEffect } from 'react';
import applyFilters from '../lib/colours/apply';
import { usePhotoEditorContext } from '../components/PhotoEditorContext';
import { FilterValues } from '../lib/interfaces/filters';

interface IProps {
  values: FilterValues;
}

const usePhotoColourAdjuster = (props: IProps) => {
  const { fileURL, originalSizeCanvasRef, previewCanvasRef } =
    usePhotoEditorContext();

  useEffect(() => {
    const canvases = [previewCanvasRef.current, originalSizeCanvasRef.current];
    try {
      applyFilters(canvases, canvases[0], fileURL, props.values);
    } catch (e) {
      console.error(e);
    }
  }, [props.values, fileURL, originalSizeCanvasRef, previewCanvasRef]);
};

export default usePhotoColourAdjuster;
