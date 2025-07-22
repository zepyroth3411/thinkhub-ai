
import json
#Default config for model

Activation = ["relu", "tanh", "sigmoid", "leaky_relu"]
Optimizers = ["adam", "sgd", "rmsprop"]
Lost_Functions = ["categorical_crossentropy", "sparse_categorical_crossentropy"]

Default_Config = {
    'num_conv_layers': 2,
    'base_filters': 32,
    'kernel_size': 3,
    'num_dense_layers': 1,  
    'dense_units': 128,
    'dropout': 0.5,
    'activation': 'relu',
    'optimizer': 'adam',
    'loss': 'categorical_crossentropy',
    'learning_r ate': 0.001,
    'batch_size': 32,
    'epochs': 10
}

def save_config(config, route="config.json"):
    with open(route, "w") as f:
        json.dump(config, f, indent=4)
        print(f"Configuration saved in  {route}")

def load_config(route="config.json"):
    try:
        with open(route, "r") as f:
            config = json.load(f)
        print(f"Config succesfully loaded from {route}")
        return config
    except FileNotFoundError:
        print(f"File not found in {route}")
        return None

def get_default_config():
    return Default_Config.copy()

def get_choices():
    return {
        "activations": Activation,
        "optimizers": Optimizers,
        "loss_functions": Lost_Functions
    }
