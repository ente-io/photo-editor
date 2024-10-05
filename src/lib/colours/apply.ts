import { FilterValues } from '../interfaces/filters';

const applyFilters = async (
  canvases: (HTMLCanvasElement | null)[],
  previewCanvas: HTMLCanvasElement | null,
  originalFileURL: string,
  values: FilterValues
) => {
  for (const canvas of canvases) {
    if (!canvas || !previewCanvas) continue;

    const context = canvas.getContext('2d');
    if (!context) continue;

    const blurSizeRatio =
      Math.min(canvas.width, canvas.height) /
      Math.min(previewCanvas.width, previewCanvas.height);
    const blurRadius = blurSizeRatio * values.blur;
    const filterString = `brightness(${values.brightness}%) contrast(${
      values.contrast
    }%) blur(${blurRadius}px) saturate(${values.saturation}%) invert(${
      values.invert ? 1 : 0
    })`;

    context.imageSmoothingEnabled = false;
    context.filter = filterString;

    const image = new Image();
    image.src = originalFileURL;

    await new Promise<boolean>((resolve, reject) => {
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.save();
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        context.restore();
        resolve(true);
      };
      image.onerror = reject;
    });
  }
};

export default applyFilters;
