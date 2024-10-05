import * as React from 'react';
import { MutableRefObject } from 'react';

const PhotoEditorOriginalCanvas = React.forwardRef<HTMLCanvasElement | null>(
  (ref: MutableRefObject<HTMLCanvasElement | null>) => {
    return (
      <canvas
        ref={ref}
        style={{
          display: 'none'
        }}
      />
    );
  }
);

export default PhotoEditorOriginalCanvas;
