import html2canvas from 'html2canvas';

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

export const downloadImage = (dataUrl, filename) => {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
};

export const captureAndDownloadNecklace = async (elementRef, buttonRef, filename) => {
    const button = buttonRef.current;
    button.style.visibility = 'hidden';

    try {
        const dataUrl = await captureNecklaceCreation(elementRef);
        if (dataUrl) {
            downloadImage(dataUrl, filename);
        }
    } catch (error) {
        console.error('Error bij het maken van de screenshot:', error);
    } finally {
        button.style.visibility = 'visible';
    }
};
