import html2canvas from 'html2canvas';

// Capture the creation displayed in an element as a data URL
export const captureNecklaceCreation = async (elementRef) => {
    try {
        const canvas = await html2canvas(elementRef.current, {
            useCORS: true,
            logging: false,
            allowTaint: false,
            backgroundColor: null
        });
        return canvas.toDataURL();
    } catch (error) {
        console.error('Error capturing screenshot:', error);
        throw error;
    }
};

// Download an image from a data URL with a specified filename
export const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
};

// Capture the creation and immediately download it as an image
export const captureAndDownloadNecklace = async (elementRef, buttonRef, filename) => {
    const button = buttonRef.current;
    button.style.display = 'none'; // Hide the button before capturing the screenshot

    try {
        const dataUrl = await captureNecklaceCreation(elementRef);
        if (dataUrl) {
            downloadImage(dataUrl, filename);
        }
    } catch (error) {
        console.error('Error bij het maken van de screenshot:', error);
    } finally {
        button.style.display = 'block'; // Show the button again after capturing the screenshot
    }
};
