export const getStaticFile = async (file: string) => {
	const response = await fetch(`/static/${file}`);
	const data = await response.blob();
	// Convert Blob to File object
	const fileObj = new File([data], file, { type: 'application/json' });
	return fileObj;
};
