import html2canvas from 'html2canvas';

export const captureNecklaceCreation = async (elementId) => {
    const element = document.getElementById(elementId);

    try {
        const canvas = await html2canvas(element, {
            useCORS: true,
            logging: true,
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
