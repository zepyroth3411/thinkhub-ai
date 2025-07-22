import numpy as np
import tensorflow as tf 
import matplotlib.pyplot as plt
import base64
from io import BytesIO

cifar10 = tf.keras.datasets.cifar10
to_categorical = tf.keras.utils.to_categorical

# Load the CIFAR-10 dataset once
data_loaded = False
x_test = None
y_test = None
y_test_cat = None
class_names = ['Airplane', 'Car', 'Bird', 'Cat', 'Deer',
               'Dog', 'Frog', 'Horse', 'Boat', 'Truck']

def data_load():
    global x_test, y_test, y_test_cat, data_loaded
    if not data_loaded:
        (_, _), (x_test, y_test) = cifar10.load_data()
        x_test = x_test / 255.0
        y_test_cat = to_categorical(y_test, 10)
        data_loaded = True
    return x_test, y_test, y_test_cat

def get_samples_base64(samples_per_class=10):
    data_load()
    result = []
    for class_id in range(10):
        indices = np.where(y_test.flatten() == class_id)[0][:samples_per_class]
        for idx in indices:
            image = x_test[idx]
            buffered = BytesIO()
            plt.imsave(buffered, image, format="png")
            img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
            result.append({
                "img_base64": img_str,
                "true_label": class_names[class_id],
                "index": int(idx),
                "class_id": class_id
            })
    return result

def predict_image_by_index(model, index):
    data_load()
    image = np.expand_dims(x_test[index], axis=0)
    preds = model.model.predict(image, verbose=0)[0]
    pred_label = class_names[np.argmax(preds)]
    confidence = float(np.max(preds)) * 100
    true_label = class_names[int(y_test[index][0])]
    pred_probs = [float(p) for p in preds]

    return {
        "prediction": pred_label,
        "confidence": confidence,
        "true_label": true_label,
        "class_probs": pred_probs,
        "index": index
    }

# Helper function to get class names
def get_class_names():
    return class_names
