import numpy as np
import tensorflow as tf
import matplotlib.pyplot as plt
import base64
from io import BytesIO
from tensorflow.keras import layers, models
from tensorflow.keras.optimizers import Adam, SGD, RMSprop

# CIFAR-10
cifar10 = tf.keras.datasets.cifar10
to_categorical = tf.keras.utils.to_categorical

# Global Dataset
data_loaded = False
x_test = None
y_test = None
y_test_cat = None
class_names = ['Airplane', 'Car', 'Bird', 'Cat', 'Deer',
               'Dog', 'Frog', 'Horse', 'Boat', 'Truck']


# Utilities

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
        "image_index": index
    }

def get_class_names():
    return class_names


# Optimizer builder

def build_optimizer(name, learning_rate):
    if name == "adam":
        return Adam(learning_rate=learning_rate)
    elif name == "sgd":
        return SGD(learning_rate=learning_rate)
    elif name == "rmsprop":
        return RMSprop(learning_rate=learning_rate)
    else:
        raise ValueError(f"Unknown Optimizer: {name}")

# model

class CIFAR10_Classifier:
    def __init__(self, config):
        self.config = config
        self.model = None
        self.history = None

        (x_train, y_train), (x_test, y_test) = cifar10.load_data()
        self.x_train = x_train / 255.0
        self.x_test = x_test / 255.0
        self.y_train = to_categorical(y_train, 10)
        self.y_test = to_categorical(y_test, 10)

    def build_model(self):
        model = models.Sequential()
        model.add(layers.Input(shape=(32, 32, 3)))

        for i in range(self.config['num_conv_layers']):
            filters = self.config['base_filters'] * (2 ** i)
            model.add(layers.Conv2D(
                filters,
                (self.config['kernel_size'], self.config['kernel_size']),
                activation=self.config['activation'],
                padding='same'
            ))
            model.add(layers.MaxPooling2D((2, 2)))

        model.add(layers.Flatten())

        for _ in range(self.config['num_dense_layers']):
            model.add(layers.Dense(self.config['dense_units'], activation=self.config['activation']))
            model.add(layers.Dropout(self.config['dropout']))

        model.add(layers.Dense(10, activation='softmax'))

        optimizer = build_optimizer(self.config['optimizer'], self.config['learning_rate'])
        model.compile(optimizer=optimizer, loss=self.config['loss'], metrics=['accuracy'])
        self.model = model

    def train(self):
        print("Training has been initialized", self.config)
        self.history = self.model.fit(
            self.x_train, self.y_train,
            epochs=self.config['epochs'],
            batch_size=self.config['batch_size'],
            validation_split=0.2,
            verbose=1  
        )
        print("Training has been completed:")
        print(self.history.history)


    def evaluate(self):
        loss, accuracy = self.model.evaluate(self.x_test, self.y_test, verbose=0)
        print(f"Final Evaluation\n - Loss: {loss:.4f}, Accuracy: {accuracy:.4f}")
        return loss, accuracy
