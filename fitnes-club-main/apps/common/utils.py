import string
import random

def generate_random_code():
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))