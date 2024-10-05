const flipCanvas = (
  canvas: HTMLCanvasElement,
  direction: 'vertical' | 'horizontal'
) => {
  const context = canvas.getContext('2d');
  if (!context || !canvas) return;
  context.resetTransform();
  context.imageSmoothingEnabled = false;
  const img = new Image();
  img.src = canvas.toDataURL();

  img.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();

    if (direction === 'horizontal') {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    } else {
      context.translate(0, canvas.height);
      context.scale(1, -1);
    }

    context.drawImage(img, 0, 0, canvas.width, canvas.height);

    context.restore();
  };
};

export default flipCanvas;
