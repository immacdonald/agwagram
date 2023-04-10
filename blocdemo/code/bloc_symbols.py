master_symbol_dict = {
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
    's': 'Source change',
    # Action
    'P': "Reply a friend (can't be checked until friendship relationship assigned)",
    'p': 'Reply a non-friend',
    'R': "Retweet a friend (can't be checked until friendship relationship assigned)",
    'r': 'Retweet a non-friend',
    'T': 'Tweet',
    'π': 'Reply self',
    'ρ': 'Retweet self',
    # Content-Semantic
    """'x': 'Product (e.g., Mountain Dew, Mozilla Firefox)',
    '⊛': 'Other (e.g., Diabetes, Super Bowl 50)',
    '⋈': 'Organization (e.g., Chicago White Sox, IBM)',
    '⌖': 'Place (e.g., Detroit, Cali, or "San Francisco, California")',
    '⚇': 'Person (e.g., Barack Obama, Daniel, or George W. Bush)',"""

    'x': 'Product',
    '⊛': 'Other',
    '⋈': 'Organization',
    '⌖': 'Place',
    '⚇': 'Person',
    # Content-Semantic-Sentiment
    '-': 'Neutral',
    '⋃': 'Positive',
    '⋂': 'Negative',
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
    # Time
    '□': '< 1 Minute',
    '⚀': '< 1 Hour',
    '⚁': '< 1 Day',
    '⚂': '< 1 Week',
    '⚃': '< 1 Month',
    '⚄': '< 1 Year',
    '⚅': '> 1 Year'
}

def get_symbol_meaning(symbol):
    return master_symbol_dict.get(symbol, 'Error')

def get_all_symbols():
    return master_symbol_dict