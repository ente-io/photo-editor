const rotateCanvas = (canvas: HTMLCanvasElement, angle: number) => {
  const context = canvas?.getContext('2d');
  if (!context || !canvas) return;
  context.imageSmoothingEnabled = false;

  const image = new Image();
  image.src = canvas.toDataURL();

  image.onload = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();

    const radians = (angle * Math.PI) / 180;
    const sin = Math.sin(radians);
    const cos = Math.cos(radians);
    const newWidth = Math.abs(image.width * cos) + Math.abs(image.height * sin);
    const newHeight =
      Math.abs(image.width * sin) + Math.abs(image.height * cos);

    canvas.width = newWidth;
    canvas.height = newHeight;

    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(radians);

    context.drawImage(
      image,
      -image.width / 2,
      -image.height / 2,
      image.width,
      image.height
    );

    context.restore();
  };
};

export default rotateCanvas;
