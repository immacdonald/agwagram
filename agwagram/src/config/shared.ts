const API_BASE: string = window.location.origin == 'http://localhost:8000' ? 'http://localhost:8080' : window.location.origin;

export default {
	version: '1.13.0',
	apiURL: `${API_BASE}/api/v1`,
	exampleFiles: [
        { file: 'sample_storygraphbot.jsonl', title: '@StoryGraphBot', type: 'JSONL' },
        { file: 'sample_jesus.jsonl', title: '@Jesus', type: 'JSONL' },
        { file: 'sample_combined.json', title: 'Combined', type: 'JSON' },
        { file: 'celebrity_BarackObama.jsonl.gz', title: 'celebrity: @BarackObama', type: 'JSONL' }
	]
};
/*
exampleFiles: [
    { file: 'bot_storygraphbot.jsonl.gz', title: 'bot: @StoryGraphBot', type: 'JSONL' },
    { file: 'bot_threadreaderapp.jsonl.gz', title: 'bot: @ThreadReaderApp', type: 'JSONL' },
    { file: 'celebrity_BarackObama.jsonl.gz', title: 'celebrity: @BarackObama', type: 'JSONL' },
    { file: 'celebrity_elonmusk.jsonl.gz', title: 'celebrity: @ElonMusk', type: 'JSONL' },
    { file: 'celebrity_realDonaldTrump.jsonl.gz', title: 'celebrity: @RealDonaldTrump', type: 'JSONL' },
    { file: 'news_cnn.jsonl.gz', title: 'news org: @CNN', type: 'JSONL' },
    { file: 'news_cnn_foxnews.jsonl.gz', title: 'news org: @CNN, FoxNews', type: 'JSONL' },
    { file: 'news_foxnews.jsonl.gz', title: 'news org: @FoxNews', type: 'JSONL' },
    { file: 'political_influencer_mmpadellan.jsonl.gz', title: 'political influencer: @mmpadellan', type: 'JSONL' },
    { file: 'political_influencer_stillgray.jsonl.gz', title: 'political influencer: @stillgray', type: 'JSONL' },
    { file: 'russian_troll_Jenn_Abrams_tweets.jsonl.gz', title: 'russian troll: @Jenn_Abrams', type: 'JSONL' },
    { file: 'russian_troll_TEN_GOP_tweets.jsonl.gz', title: 'russian troll: @TEN_GOP', type: 'JSONL' }
]
*/