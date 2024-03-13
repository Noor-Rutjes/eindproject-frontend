/**
 * Crop and resize an image.
 *
 * @param {string} imageUrl - The URL of the image to crop and resize.
 * @param {number} cropX - The X-coordinate of the top-left corner of the cropping area.
 * @param {number} cropY - The Y-coordinate of the top-left corner of the cropping area.
 * @param {number} cropWidth - The width of the cropping area.
 * @param {number} cropHeight - The height of the cropping area.
 * @param {number} targetWidth - The width to which the image should be resized.
 * @param {number} targetHeight - The height to which the image should be resized.
 * @returns {Promise<string>} - A Promise that resolves to the data URL of the cropped and resized image.
 */
function cropAndResizeImage(imageUrl, cropX, cropY, cropWidth, cropHeight, targetWidth, targetHeight) {
    // Create a canvas and get its 2D rendering context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Create an image element and set its crossOrigin attribute to allow cross-origin images
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    // Return a Promise for the cropped and resized image
    return new Promise((resolve, reject) => {
        // Event handler for when the image has loaded successfully
        img.onload = function () {
            // Set the size of the canvas to match the crop area
            canvas.width = cropWidth;
            canvas.height = cropHeight;

            // Draw the image onto the canvas, cropping it as specified
            ctx.drawImage(img, -cropX, -cropY);

            // Get the data URL of the cropped image
            const croppedImageUrl = canvas.toDataURL('image/png');

            // Create another image element for the cropped image
            const croppedImg = new Image();

            // Event handler for when the cropped image has loaded successfully
            croppedImg.onload = function () {
                // Create a new canvas for the resized image
                const resizedCanvas = document.createElement('canvas');
                const resizedCtx = resizedCanvas.getContext('2d');

                // Set the size of the canvas to match the target dimensions
                resizedCanvas.width = targetWidth;
                resizedCanvas.height = targetHeight;

                // Draw the cropped image onto the resized canvas, resizing it as specified
                resizedCtx.drawImage(croppedImg, 0, 0, targetWidth, targetHeight);

                // Resolve the Promise with the data URL of the resized image
                resolve(resizedCanvas.toDataURL('image/png'));
            };

            // Set the src attribute of the cropped image to trigger loading
            croppedImg.src = croppedImageUrl;
        };

        // Event handler for when there's an error loading the image
        img.onerror = function (error) {
            // Reject the Promise with the error
            reject(error);
        };
    });
}

export default cropAndResizeImage;
