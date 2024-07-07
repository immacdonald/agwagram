const API_BASE: string = window.location.origin == 'http://localhost:8000' ? 'http://localhost:8080' : window.location.origin;

const global = {
    version: '1.17.0',
    apiURL: `${API_BASE}/api/v1`,
    exampleFiles: [
        { file: 'bot_storygraphbot.jsonl.gz', title: 'Bot: @StoryGraphBot', type: 'JSONL' },
        { file: 'bot_threadreaderapp.jsonl.gz', title: 'Bot: @ThreadReaderApp', type: 'JSONL' },
        { file: 'celebrity_BarackObama.jsonl.gz', title: 'Celebrity: @BarackObama', type: 'JSONL' },
        { file: 'celebrity_elonmusk.jsonl.gz', title: 'Celebrity: @ElonMusk', type: 'JSONL' },
        { file: 'celebrity_realDonaldTrump.jsonl.gz', title: 'Celebrity: @RealDonaldTrump', type: 'JSONL' },
        { file: 'news_cnn.jsonl.gz', title: 'News Org: @CNN', type: 'JSONL' },
        { file: 'news_cnn_foxnews.jsonl.gz', title: 'News Org: @CNN, FoxNews', type: 'JSONL' },
        { file: 'news_foxnews.jsonl.gz', title: 'News Org: @FoxNews', type: 'JSONL' },
        { file: 'political_influencer_mmpadellan.jsonl.gz', title: 'Political Influencer: @mmpadellan', type: 'JSONL' },
        { file: 'political_influencer_stillgray.jsonl.gz', title: 'Political Influencer: @stillgray', type: 'JSONL' },
        { file: 'russian_troll_Jenn_Abrams_tweets.jsonl.gz', title: 'Russian Troll: @Jenn_Abrams', type: 'JSONL' },
        { file: 'russian_troll_TEN_GOP_tweets.jsonl.gz', title: 'Russian Troll: @TEN_GOP', type: 'JSONL' }
    ],
    exampleFilesInitial: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
};

export { global };
