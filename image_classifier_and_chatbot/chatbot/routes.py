from flask import Blueprint, request, jsonify
from .chatbot_engine import generate_response
from .utils import add_to_history, get_recent_history

chatbot_bp = Blueprint('chatbot', __name__)

@chatbot_bp.route('/chatbot', methods=['POST'])
def chatbot_api():
    data = request.get_json()
    question = data.get('question', '')
    if not question.strip():
        return jsonify({'response': "Please enter a question.", 'history': get_recent_history()})

    answer = generate_response(question)
    add_to_history(question, answer)
    return jsonify({
        'response': answer,
        'history': get_recent_history()
    })
