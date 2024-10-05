import React, { useContext } from 'react';
import { MutableRefObject, createContext, useMemo, useRef } from 'react';

interface PhotoEditorContextValues {
  fileURL: string;
  outputMime: string;
  parentElementRef: MutableRefObject<HTMLElement | null>;
}

interface InternalPhotoEditorContextValues extends PhotoEditorContextValues {
  originalSizeCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
  previewCanvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

const PhotoEditorContextInternal = createContext(
  {} as InternalPhotoEditorContextValues
);

export const PhotoEditorProvider = ({
  children,
  value
}: {
  children: React.ReactNode;
  value: PhotoEditorContextValues;
}) => {
  const originalSizeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const contextValue = useMemo(
    () => ({
      ...value,
      originalSizeCanvasRef,
      previewCanvasRef
    }),
    [value]
  );

  return (
    <PhotoEditorContextInternal.Provider value={contextValue}>
      {children}
    </PhotoEditorContextInternal.Provider>
  );
};

export const usePhotoEditorContext = () =>
  useContext(PhotoEditorContextInternal);
