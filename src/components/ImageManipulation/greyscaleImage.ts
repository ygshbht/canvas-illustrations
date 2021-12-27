export default function greyscaleImage(
  ctx: CanvasRenderingContext2D | null,
  imgWidth: number,
  imgHeight: number
) {
  const scannedImage = ctx?.getImageData(0, 0, imgWidth, imgHeight);
  if (!scannedImage) return;
  const { data: scannedData } = scannedImage;
  for (let i = 0; i < scannedData.length; i += 4) {
    const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
    const avg = total / 3;
    scannedData[i] = avg;
    scannedData[i + 1] = avg;
    scannedData[i + 2] = avg;
  }
  scannedImage.data.set(scannedData);
  ctx?.putImageData(scannedImage, 0, 0);
}
