const loadCanvases = async (
  previewCanvas: HTMLCanvasElement,
  originalSizeCanvas: HTMLCanvasElement,
  parentElement: HTMLElement | null = null,
  fileURL: string
) => {
  const ctx = previewCanvas.getContext('2d');
  if (!ctx) return;
  ctx.imageSmoothingEnabled = false;

  const img = new Image();
  img.src = fileURL;

  await new Promise((resolve, reject) => {
    img.onload = () => {
      try {
        let scale = 1;

        if (parentElement) {
          scale = Math.min(
            parentElement.clientWidth / img.width,
            parentElement.clientHeight / img.height
          );
        }
        // const scale = Math.min(
        //     parentElement.clientWidth / img.width,
        //     parentElement.clientHeight / img.height
        // );
        const width = img.width * scale;
        const height = img.height * scale;
        previewCanvas.width = width;
        previewCanvas.height = height;

        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
        }

        originalSizeCanvas.width = img.width;
        originalSizeCanvas.height = img.height;

        const oSCtx = originalSizeCanvas.getContext('2d');

        if (oSCtx) {
          oSCtx.drawImage(img, 0, 0, img.width, img.height);
        }

        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    };
    img.onerror = (e) => {
      console.log(e);
      reject(e);
    };
  });
};

export default loadCanvases;
