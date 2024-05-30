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

export const captureAndDownloadNecklace = async (elementId, buttonId, filename) => {
    const button = document.getElementById(buttonId);
    button.style.display = 'none'; // Verberg de knop voordat je een screenshot maakt

    try {
        const dataUrl = await captureNecklaceCreation(elementId);
        if (dataUrl) {
            downloadImage(dataUrl, filename);
            console.log("Screenshot gemaakt en gedownload.");
        }
    } catch (error) {
        console.error('Error bij het maken van de screenshot:', error);
    } finally {
        button.style.display = 'block'; // Toon de knop weer na het maken van de screenshot
    }
};
