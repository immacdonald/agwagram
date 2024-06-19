change_symbol_dict = {
    # Change
    'a': 'a: Profile appearance change',
    'D': 'D: Delete tweet',
    'd': 'd: Description change',
    'F': 'F: Follow someone',
    'f': 'f: Unfollow someone',
    'g': 'g: Profile location change',
    'G': 'G: Geographical location change (see coordinates and place)',
    'L': 'L: Liked tweet',
    'l': 'l: Unliked tweet',
    'n': 'n: Name change',
    'N': 'N: Handle change',
    'u': 'u: URL change',
    'W': 'W: Gained followers',
    'w': 'w: Lost followers',
    'λ': 'λ: Language change',
    's': 's: Source change'
}

action_symbol_dict = {
    # Action
    'P': "P: Reply a friend (can't be checked until friendship relationship assigned)",
    'p': 'p: Reply a non-friend',
    'R': "R: Retweet a friend (can't be checked until friendship relationship assigned)",
    'r': 'r: Retweet a non-friend',
    'T': 'T: Tweet',
    'π': 'π: Reply self',
    'ρ': 'ρ: Retweet self'
}

semantic_symbol_dict = {
    # Content-Semantic
    'x': 'x: Product',
    '⊛': '⊛: Other',
    '⋈': '⋈: Organization',
    '⌖': '⌖: Place',
    '⚇': '⚇: Person'
}

sentiment_symbol_dict = {
    # Content-Semantic-Sentiment
    '-': '-: Neutral',
    '⋃': '⋃: Positive',
    '⋂': '⋂: Negative',
}

syntactic_symbol_dict = {
    # Content-Syntactic
    't': 't: Text',
    'E': 'E: Media',
    'H': 'H: Hashtag',
    'M': "M: Mention of friend (can't be checked until friendship relationship assigned)",
    'm': 'm: Mention of non-friend',
    'q': 'q: Quote URL',
    '¤': '¤: Cashtag',
    'U': 'U: URL',
    'φ': 'φ: Quote self',
}

time_symbol_dict = {
    # Time
    '□': '□: < 1 Minute)',
    '⚀': '⚀: < 1 Hour)',
    '⚁': '⚁: < 1 Day)',
    '⚂': '⚂: < 1 Week)',
    '⚃': '⚃: < 1 Month)',
    '⚄': '⚄: < 1 Year)',
    '⚅': '⚅: > 1 Year)'
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