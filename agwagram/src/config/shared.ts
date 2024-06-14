const API_BASE: string = window.location.origin == 'http://localhost:8000' ? 'http://localhost:8080' : window.location.origin;

export default {
	version: '1.13.0',
	apiURL: `${API_BASE}/api/v1`,
	exampleFiles: [
		{ file: 'sample_storygraphbot.jsonl', title: '@StoryGraphBot', type: 'JSONL' },
		{ file: 'sample_jesus.jsonl', title: '@Jesus', type: 'JSONL' },
		{ file: 'sample_combined.json', title: 'Combined', type: 'JSON' }
	]
};
