const exportCanvasToBlob = (
  canvas: HTMLCanvasElement,
  mime: string
): Promise<Blob | null> => {
  const context = canvas.getContext('2d');
  if (!context) return Promise.resolve(null);

  return new Promise((resolve) => {
    canvas.toBlob(resolve, mime);
  });
};

export default exportCanvasToBlob;
