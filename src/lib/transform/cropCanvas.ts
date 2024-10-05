const cropCanvas = (
  canvas: HTMLCanvasElement,
  cropArea: { x: number; y: number; width: number; height: number }
) => {
  const context = canvas.getContext('2d');

  if (!context || !canvas) return;
  context.imageSmoothingEnabled = false;

  const img = new Image();
  img.src = canvas.toDataURL();
  img.onload = () => {
    const { x, y, width, height } = cropArea;

    const newWidth = width;
    const newHeight = height;

    context.clearRect(0, 0, canvas.width, canvas.height);

    canvas.width = newWidth;
    canvas.height = newHeight;

    context.drawImage(img, x, y, width, height, 0, 0, newWidth, newHeight);
  };
};

export default cropCanvas;
