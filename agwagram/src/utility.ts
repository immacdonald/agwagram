export const getStaticFile = async (file: string) => {
	const response = await fetch(`/static/${file}`);
	const data = await response.blob();
	// Convert Blob to File object
	const fileObj = new File([data], file, { type: 'application/json' });
	return fileObj;
};

export const formatDate = (input: Date | string, time: boolean = false): string => {
	const date = new Date(input);

	if (isNaN(date.getTime())) {
		throw new Error('Invalid date input');
	}

	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		...(time && { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
	});
};

export const GRAPH_COLORS = ['#143aa2', '#a31444', '#a37a14', '#11a2a3'];

export const graphColor = (index: number): string => {
	return GRAPH_COLORS[index % GRAPH_COLORS.length];
};
