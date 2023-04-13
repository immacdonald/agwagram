from django import template
from ..code import bloc_symbols

register = template.Library()

@register.filter
def get_description(symbol):
    return bloc_symbols.get_all_symbols().get(symbol, '')