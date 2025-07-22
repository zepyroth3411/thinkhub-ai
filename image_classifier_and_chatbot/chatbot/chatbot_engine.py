import os
import json
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


HISTORY_FILE = os.path.join(os.path.dirname(__file__), "chatbot_history.json")
# Load Knowledge base and corpus building
def load_knowledge_base():
    kb_path = os.path.join(os.path.dirname(__file__), 'knowledge_base.json')
    with open(kb_path, encoding='utf-8') as f:
        kb = json.load(f)
    return kb

def build_corpus_and_map(kb):
    corpus = []
    meta = []  

    # Section exploration
    for section, entries in kb.items():
        for key, data in entries.items():
            phrases = []

            # Gets relevant information in each field
            for field in ["description", "tips", "comparison", "increase_effects", "decrease_effects", "problem", "solution", "question", "answer"]:
                if data.get(field):
                    phrases.append(data[field])
            # Gets sample questions
            if data.get("example_questions"):
                phrases.extend(data["example_questions"])

            for phrase in phrases:
                corpus.append(phrase)
                meta.append({
                    "section": section,
                    "key": key,
                    "data": data
                })
    return corpus, meta

# Vectorizer initialize
knowledge_base = load_knowledge_base()
corpus, meta = build_corpus_and_map(knowledge_base)
vectorizer = TfidfVectorizer().fit(corpus)
X = vectorizer.transform(corpus)

# Generate response
def generate_response(user_query, top_n=1):
    user_vec = vectorizer.transform([user_query])
    sim_scores = cosine_similarity(user_vec, X)[0]
    best_idxs = np.argsort(sim_scores)[::-1][:top_n]

    responses = []
    for idx in best_idxs:
        item = meta[idx]
        data = item['data']
        # Response building with available data
        parts = []
        if 'description' in data:
            parts.append(f"**Description:** {data['description']}")
        if 'tips' in data:
            parts.append(f"**Tips:** {data['tips']}")
        if 'increase_effects' in data:
            parts.append(f"**Increase Effects:** {data['increase_effects']}")
        if 'decrease_effects' in data:
            parts.append(f"**Decrease Effects:** {data['decrease_effects']}")
        if 'comparison' in data:
            parts.append(f"**Comparison:** {data['comparison']}")
        if 'problem' in data:
            parts.append(f"**Problem:** {data['problem']}")
        if 'solution' in data:
            parts.append(f"**Solution:** {data['solution']}")
        if 'question' in data and 'answer' in data:
            parts.append(f"**Q:** {data['question']}\n**A:** {data['answer']}")
        responses.append("\n".join(parts))
    return responses[0] if responses else "Sorry, I couldn't find an answer for that question. Try rephrasing it!"

# Shows similar answers
def get_top_n_responses(user_query, top_n=3):
    user_vec = vectorizer.transform([user_query])
    sim_scores = cosine_similarity(user_vec, X)[0]
    best_idxs = np.argsort(sim_scores)[::-1][:top_n]
    results = []
    for idx in best_idxs:
        item = meta[idx]
        score = sim_scores[idx]
        data = item['data']
        preview = data.get('description') or data.get('answer') or str(data)
        results.append({
            'section': item['section'],
            'key': item['key'],
            'score': float(score),
            'preview': preview
        })
    return results


def get_recent_history(n=10):
    """
    Returns the last n interactions (user/bot) as a list of dicts:
    [{"user": "...", "bot": "..."}, ...]
    """
    if not os.path.exists(HISTORY_FILE):
        return []
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            history = json.load(f)
        # Return only the last 
        return history[-n:]
    except Exception:
        return []