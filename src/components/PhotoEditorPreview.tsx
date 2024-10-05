import * as React from 'react';
import { usePhotoEditorContext } from './PhotoEditorContext';
import loadCanvases from '../lib/loadCanvases';
import { useEffect } from 'react';

interface IProps {
  show: boolean;
}

const PhotoEditorPreview = (props: IProps) => {
  const { fileURL, parentElementRef, previewCanvasRef, originalSizeCanvasRef } =
    usePhotoEditorContext();

  useEffect(() => {
    if (!previewCanvasRef.current)
      return console.error('previewCanvasRef.current is null');
    if (!originalSizeCanvasRef.current)
      return console.error('originalSizeCanvasRef.current is null');
    if (!parentElementRef.current)
      return console.error('parentElementRef.current is null');
    loadCanvases(
      previewCanvasRef.current,
      originalSizeCanvasRef.current,
      parentElementRef.current,
      fileURL
    );
  }, [fileURL, previewCanvasRef, originalSizeCanvasRef, parentElementRef]);

  return (
    <React.Fragment>
      <canvas
        ref={previewCanvasRef}
        style={{
          objectFit: 'contain',
          display: !props.show ? 'none' : 'block',
          position: 'absolute'
        }}
      />
      <canvas
        ref={originalSizeCanvasRef}
        style={{
          display: 'none'
        }}
      />
    </React.Fragment>
  );
};

export default PhotoEditorPreview;
