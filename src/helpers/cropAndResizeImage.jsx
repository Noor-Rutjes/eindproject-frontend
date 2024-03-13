
function cropAndResizeImage(imageUrl, cropX, cropY, cropWidth, cropHeight, targetWidth, targetHeight) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.crossOrigin = 'anonymous'; // Allow cross-origin images
    img.src = imageUrl;

    return new Promise((resolve, reject) => {
        img.onload = function () {
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            ctx.drawImage(img, -cropX, -cropY);

            const croppedImageUrl = canvas.toDataURL('image/png');

            const croppedImg = new Image();
            croppedImg.onload = function () {
                const resizedCanvas = document.createElement('canvas');
                const resizedCtx = resizedCanvas.getContext('2d');
                resizedCanvas.width = targetWidth;
                resizedCanvas.height = targetHeight;
                resizedCtx.drawImage(croppedImg, 0, 0, targetWidth, targetHeight);

                resolve(resizedCanvas.toDataURL('image/png'));
            };
            croppedImg.src = croppedImageUrl;
        };

        img.onerror = function (error) {
            reject(error);
        };
    });
}

export default cropAndResizeImage;