from bloc.generator import add_bloc_sequences
from bloc.subcommands import run_subcommands
from bloc.util import dumpJsonToFile
from bloc.util import get_bloc_params
from bloc.util import get_default_symbols
from bloc.util import getDictFromJsonGZ

bloc_payload = []
all_bloc_symbols = get_default_symbols()
gen_bloc_params, gen_bloc_args = get_bloc_params([], '', sort_action_words=True, keep_bloc_segments=True, tweet_order='noop')#tweet_order since tweets are assumed sorted in chronological order 

for user_tweets in [getDictFromJsonGZ('../docs/data/sample_jesus.json.gz'), getDictFromJsonGZ('../docs/data/sample_storygraphbot.json.gz')]:
    u_bloc = add_bloc_sequences(user_tweets, all_bloc_symbols=all_bloc_symbols, **gen_bloc_params)
    bloc_payload.append(u_bloc)


pairwise_sim_report = run_subcommands(gen_bloc_args, 'sim', bloc_payload)
top_k_bloc_words = run_subcommands(gen_bloc_args, 'top_ngrams', bloc_payload)

#Change currently should be run separately per alphabet since the change parameters (change_mean and change_stddev) are empirically derived per alphabet
gen_bloc_args.bloc_alphabets = ['action']
action_change_report = run_subcommands(gen_bloc_args, 'change', bloc_payload)


gen_bloc_args.change_mean = 0.45
gen_bloc_args.change_stddev = 0.38
gen_bloc_args.bloc_alphabets = ['content_syntactic']
content_change_report = run_subcommands(gen_bloc_args, 'change', bloc_payload)
change_report = {'action': action_change_report, 'content_syntactic': content_change_report}

dumpJsonToFile('pairwise_sim_report.json', pairwise_sim_report)
dumpJsonToFile('top_k_bloc_words.json', top_k_bloc_words)
dumpJsonToFile('change_report.json', change_report)