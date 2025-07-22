import os
import json

HISTORY_PATH = os.path.join(os.path.dirname(__file__), 'chat_history.json')
MAX_HISTORY = 10

def load_history():
    if os.path.exists(HISTORY_PATH):
        with open(HISTORY_PATH, encoding='utf-8') as f:
            try:
                return json.load(f)
            except Exception:
                return []
    return []

def save_history(history):
    with open(HISTORY_PATH, 'w', encoding='utf-8') as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

def add_to_history(user_msg, bot_msg):
    history = load_history()
    history.append({'user': user_msg, 'bot': bot_msg})
    history = history[-MAX_HISTORY:]
    save_history(history)

def get_recent_history():
    return load_history()[-MAX_HISTORY:]
