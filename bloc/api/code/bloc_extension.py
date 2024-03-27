from datetime import datetime
from . import symbols


def link_data(tweets):
    linked_data = []
    for tweet in tweets:
        #print(tweet)
        date_obj = datetime.strptime(tweet['created_at'], '%a %b %d %H:%M:%S %z %Y')

        # Format datetime object as desired
        formatted_date = date_obj.strftime('%B %d, %Y @ %I:%M%p').replace(' 0', ' ')

        cleaned_action = tweet['bloc']['bloc_sequences_short']['action']
        #for char in symbols.time_symbol_dict:
        #    cleaned_action = cleaned_action.replace(char, '')

        cleaned_semantic_sentiment = tweet['bloc']['bloc_sequences_short']['content_semantic_sentiment']
        #for char in symbols.time_symbol_dict:
        #    cleaned_semantic_sentiment = cleaned_semantic_sentiment.replace(char, '')

        data = {
            "created_at": formatted_date,
            "id": tweet['id'],
            "text": tweet['full_text'],
            "action": cleaned_action,
            "content_syntactic": tweet['bloc']['bloc_sequences_short']['content_syntactic'][1:-1],
            "content_semantic_entity": tweet['bloc']['bloc_sequences_short']['content_semantic_entity'][1:-1],
            "content_semantic_sentiment": cleaned_semantic_sentiment,
            "change": tweet['bloc']['bloc_sequences_short']['change'],
        }
        linked_data.append(data)

    return linked_data