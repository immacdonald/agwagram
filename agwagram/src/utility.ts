import { config } from '@config';

const getStaticDataFile = async (file: string, folder: string = '/data'): Promise<File> => {
    if (config.mode == 'production' && file.endsWith('.gz')) {
        const response = await fetch(`${import.meta.env.BASE_URL}/${folder}/${file}`, {
            headers: {
                Accept: 'application/octet-stream'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch file: ${response.statusText}`);
        }

        const data = await response.arrayBuffer();
        // Convert ArrayBuffer to Blob and then to File object
        const blob = new Blob([data], { type: 'application/x-gzip' });
        const fileObj = new File([blob], file, { type: 'application/x-gzip' });
        return fileObj;
    }

    // The browser always decompresses a fetched gzip in local development, this is not preventable
    const response = await fetch(`${folder}/${file}`);
    const data = await response.blob();
    // Convert Blob to File object
    const fileObj = new File([data], file.replace('.gz', ''), { type: 'application/json' });
    return fileObj;
};

export { getStaticDataFile };
