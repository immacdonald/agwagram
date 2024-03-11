declare global {
	interface BaseAnalysis {
		successful_generation: boolean;
	}

	interface SuccessfulAnalysis extends BaseAnalysis {
		query_count: number;
		total_tweets: number;
		account_blocs: AccountBloc[];
		group_top_bloc_words: GroupTop[];
		group_top_actions: GroupTop[];
		group_top_syntactic: GroupTop[];
		group_top_semantic: GroupTop[];
		group_top_sentiment: GroupTop[];
		group_top_time: GroupTop[];
		pairwise_sim: any[];
	}

	interface FailedAnalysis extends BaseAnalysis {
		errors: any;
		query: any;
	}

	interface Analysis extends SuccessfulAnalysis, FailedAnalysis {}

	interface AccountBloc {
		user_exists: boolean;
		account_name: string;
		account_username: string;
		tweet_count: number;
		first_tweet_date: string;
		last_tweet_date: string;
		elapsed_time: number;
		bloc_action: string;
		bloc_syntactic: string;
		bloc_semantic_entity: string;
		bloc_semantic_sentiment: string;
		bloc_change: string;
		change_report: ChangeReport;
		top_bloc_words: Top[];
		top_actions: Top[];
		top_syntactic: Top[];
		top_semantic: Top[];
		top_sentiment: Top[];
		top_time: Top[];
		top_change: any[];
		linked_data: LinkedDatum[];
	}

	interface ChangeReport {
		action: Action | null;
		content_syntactic: Action | null;
	}

	interface Action {
		change_events: ChangeEvent[];
		change_profile: ChangeProfile;
	}

	interface ChangeEvent {
		sim: number;
		change_profile: AverageChange;
		first_segment: LinkedDatum;
		second_segment: LinkedDatum;
	}

	interface AverageChange {
		pause: string;
		word: string;
		activity: string;
	}

	interface LinkedDatum {
		action: string;
		content_syntactic: string;
		content_semantic_entity: string;
		content_semantic_sentiment: string;
		change: string;
		local_dates?: string[];
		created_at?: string;
	}

	interface ChangeProfile {
		change_rate: string;
		average_change: AverageChange;
	}

	interface Top {
		term: string;
		term_freq: string;
		term_rate: string;
		rank: number;
	}

	interface GroupTop {
		term: string;
		term_freq: string;
		term_rate: string;
		doc_freq: number;
		doc_rate: number;
		rank: number;
	}
}

export {};
