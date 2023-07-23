from django import template
from ..code import symbols

register = template.Library()


@register.filter
def get_description(symbol):
    return ', '.join(symbols.get_multi_symbol_meanings(symbol, ''))


@register.filter
def get_type(symbol):
    return symbols.get_symbol_type(symbol)


@register.filter
def index(indexable, i):
    return indexable[i]
