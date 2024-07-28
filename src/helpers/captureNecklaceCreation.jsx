import html2canvas from 'html2canvas';

// Capture a screenshot of the specified element
export const captureNecklaceCreation = async (elementRef) => {
    try {
        const canvas = await html2canvas(elementRef.current, {
            useCORS: true,
            logging: false,
            allowTaint: false,
            backgroundColor: null
        });
        return canvas.toDataURL(); // Return the screenshot as a data URL
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        throw error;
    }
};

// Download the image from the data URL with the given filename
export const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click(); // Trigger the download
};

// Capture a screenshot and download it with the specified filename
export const captureAndDownloadNecklace = async (elementRef, filename) => {
    try {
        const dataUrl = await captureNecklaceCreation(elementRef);
        if (dataUrl) {
            downloadImage(dataUrl, filename);
        }
    } catch (error) {
        console.error('Error capturing screenshot:', error);
    }
};
