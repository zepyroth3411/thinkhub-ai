
from flask import Flask, render_template, request, jsonify
from model import CIFAR10_Classifier
from config_utils import get_default_config
from web_utils import get_samples_base64, predict_image_by_index, get_class_names
from chatbot.routes import chatbot_bp
from chatbot.chatbot_engine import get_recent_history
import os
import json

from post_training_results import (
    save_training_curves,
    save_confusion_matrix,
    save_correct_examples
)

app = Flask(__name__)
app.register_blueprint(chatbot_bp)

model = None

# Mapload to real name index on x_test
map_path = os.path.join("static", "correct_examples_map.json")
filename_to_index = {}

if os.path.exists(map_path):
    with open(map_path, "r") as f:
        filename_to_index = json.load(f)
else:
    print(f"Warning: {map_path} file not found")

@app.route("/")
def index():
    return render_template("interface.html", history=get_recent_history(), response="")

@app.route("/train", methods=["POST"])
def train():
    global model
    config = {
        'num_conv_layers': int(request.form['num_conv_layers']),
        'base_filters': int(request.form['base_filters']),
        'kernel_size': int(request.form['kernel_size']),
        'num_dense_layers': int(request.form['num_dense_layers']),
        'dense_units': int(request.form['dense_units']),
        'dropout': float(request.form['dropout']),
        'activation': request.form['activation'],
        'optimizer': request.form['optimizer'],
        'loss': request.form['loss'],
        'learning_rate': float(request.form['learning_rate']),
        'batch_size': int(request.form['batch_size']),
        'epochs': int(request.form['epochs'])
    }

    # Training
    model = CIFAR10_Classifier(config)
    model.build_model()
    model.train()
    loss, acc = model.evaluate()

    # Save results
    save_training_curves(model.history)
    save_confusion_matrix(model)
    save_correct_examples(model)

    return render_template("results.html", accuracy=acc, loss=loss, class_names=get_class_names())

@app.route("/samples")
def samples():
    return {"images": get_samples_base64()}

@app.route("/predict", methods=["POST"])
def predict():
    global model
    if model is None:
        return {"error": "This model has not been trained yet."}, 400

    data = request.get_json()
    filename = data.get("filename")

    if not filename:
        return {"error": "Filename not provided."}, 400

    map_path = os.path.join("static", "correct_examples_map.json")
    if not os.path.exists(map_path):
        return {"error": "Mapping file not found."}, 500

    with open(map_path, "r") as f:
        filename_to_index = json.load(f)

    index = filename_to_index.get(filename)
    if index is None:
        return {"error": f"Index not found for filename: {filename}"}, 404

    return predict_image_by_index(model, index)

if __name__ == "__main__":
    app.run(debug=True)