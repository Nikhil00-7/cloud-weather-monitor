import time

cache = {}

def get_cache(key):
    data = cache.get(key, None)
    if data:
        value, expiry = data
        if time.time() < expiry:
            return value
    return None

def set_cache(key, value, ttl=600): 
    cache[key] = (value, time.time() + ttl)
