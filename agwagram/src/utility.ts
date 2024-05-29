export const GRAPH_COLORS = ['#143aa2', '#a31444', '#a37a14', '#11a2a3'];

export const graphColor = (index: number): string => {
	return GRAPH_COLORS[index % GRAPH_COLORS.length];
};
