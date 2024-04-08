change_symbol_dict = {
    # Change
    'a': 'Profile appearance change',
    'D': 'Delete tweet',
    'd': 'Description change',
    'F': 'Follow someone',
    'f': 'Unfollow someone',
    'g': 'Profile location change',
    'G': 'Geographical location change (see coordinates and place)',
    'L': 'Liked tweet',
    'l': 'Unliked tweet',
    'n': 'Name change',
    'N': 'Handle change',
    'u': 'URL change',
    'W': 'Gained followers',
    'w': 'Lost followers',
    'λ': 'Language change',
    's': 'Source change'
}

action_symbol_dict = {
    # Action
    'P': "Reply a friend (can't be checked until friendship relationship assigned)",
    'p': 'Reply a non-friend',
    'R': "Retweet a friend (can't be checked until friendship relationship assigned)",
    'r': 'Retweet a non-friend',
    'T': 'Tweet',
    'π': 'Reply self',
    'ρ': 'Retweet self'
}

semantic_symbol_dict = {
    # Content-Semantic
    'x': 'Product',
    '⊛': 'Other',
    '⋈': 'Organization',
    '⌖': 'Place',
    '⚇': 'Person'
}

sentiment_symbol_dict = {
    # Content-Semantic-Sentiment
    '-': 'Neutral',
    '⋃': 'Positive',
    '⋂': 'Negative',
}

syntactic_symbol_dict = {
    # Content-Syntactic
    't': 'Text',
    'E': 'Media',
    'H': 'Hashtag',
    'M': "Mention of friend (can't be checked until friendship relationship assigned)",
    'm': 'Mention of non-friend',
    'q': 'Quote URL',
    '¤': 'Cashtag',
    'U': 'URL',
    'φ': 'Quote self',
}

time_symbol_dict = {
    # Time
    '□': '< 1 Minute',
    '⚀': '< 1 Hour',
    '⚁': '< 1 Day',
    '⚂': '< 1 Week',
    '⚃': '< 1 Month',
    '⚄': '< 1 Year',
    '⚅': '> 1 Year'
}

master_symbol_dict = {
    **change_symbol_dict,
    **action_symbol_dict,
    **semantic_symbol_dict,
    **sentiment_symbol_dict,
    **syntactic_symbol_dict,
    **time_symbol_dict
}


def get_symbol_type(symbol):
    # For multi-symbol words only use the first
    if len(symbol) > 1:
        symbol = symbol[0]

    if symbol in change_symbol_dict:
        return 'Change'
    if symbol in action_symbol_dict:
        return 'Action'
    if symbol in semantic_symbol_dict:
        return 'Semantic'
    if symbol in sentiment_symbol_dict:
        return 'Sentiment'
    if symbol in syntactic_symbol_dict:
        return 'Syntactic'
    if symbol in time_symbol_dict:
        return 'Time'
    return 'Error'


def get_symbol_meaning(symbol, default='Error'):
    return master_symbol_dict.get(symbol, default)


def get_multi_symbol_meanings(symbols, default='Error'):
    meaning = []
    for char in symbols:
        meaning.append(get_symbol_meaning(char, default))
    return meaning


def get_all_symbols() -> dict[str, str]:
    return master_symbol_dict

def get_time_symbols() -> dict[str, str]:
    return time_symbol_dict