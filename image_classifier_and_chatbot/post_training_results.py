import os
import json
import numpy as np
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import confusion_matrix

# Dummy functions to avoid import errors
def get_class_names():
    return ['airplane', 'car', 'bird', 'cat', 'deer',
            'dog', 'frog', 'horse', 'boat', 'truck']

def data_load():
    # fake load to avoid import errors.
    x_test = np.random.rand(10000, 32, 32, 3)
    y_test = np.random.randint(0, 10, (10000, 1))
    y_test_cat = np.eye(10)[y_test.reshape(-1)]
    return x_test, y_test, y_test_cat

def save_training_curves(history, folder='static/plots'):
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    os.makedirs(folder, exist_ok=True)

    acc = history.history.get('accuracy', [])
    val_acc = history.history.get('val_accuracy', [])
    loss = history.history.get('loss', [])
    val_loss = history.history.get('val_loss', [])

    # save accuracy
    plt.figure()
    if acc and val_acc:
        plt.plot(acc, label='Training')
        plt.plot(val_acc, label='Validation')
        plt.title('Accuracy during training')
        plt.xlabel('Epoch')
        plt.ylabel('Accuracy')
        plt.legend()
    acc_path = os.path.join(folder, 'accuracy_curve.png')
    plt.savefig(acc_path)
    plt.close()

    # save loss
    plt.figure()
    if loss and val_loss:
        plt.plot(loss, label='Training')
        plt.plot(val_loss, label='Validation')
        plt.title('Loss during training')
        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
    loss_path = os.path.join(folder, 'loss_curve.png')
    plt.savefig(loss_path)
    plt.close()

def save_confusion_matrix(model, folder='static/plots'):
    os.makedirs(folder, exist_ok=True)
    _, y_test, _ = data_load()
    y_pred = model.model.predict(model.x_test, verbose=0)
    y_pred_labels = np.argmax(y_pred, axis=1)
    y_true = np.argmax(model.y_test, axis=1)

    cm = confusion_matrix(y_true, y_pred_labels)
    class_names = get_class_names()

    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
                xticklabels=class_names, yticklabels=class_names)
    plt.title("Confusion Matrix")
    plt.ylabel("True label")
    plt.xlabel("Predicted label")
    plt.tight_layout()
    cm_path = os.path.join(folder, "confusion_matrix.png")
    plt.savefig(cm_path)
    plt.close()

def save_correct_examples(model, folder='static/correct_examples', examples_per_class=5):
    import cv2
    os.makedirs(folder, exist_ok=True)

    x_test = model.x_test
    y_test = model.y_test

    y_pred = model.model.predict(x_test, verbose=0)
    y_pred_labels = np.argmax(y_pred, axis=1)
    y_true = np.argmax(y_test, axis=1)

    class_names = get_class_names()
    index_map = {}

    for class_id, class_name in enumerate(class_names):
        count = 0
        indices = np.where((y_true == class_id) & (y_pred_labels == class_id))[0]
        np.random.shuffle(indices)

        for i in indices:
            img = x_test[i]

            # Change to uint8 if needed 
            if img.max() <= 1.0:
                img = (img * 255).astype(np.uint8)
            else:
                img = img.astype(np.uint8)

            # Makes sure that there is only 3 channels, to avoid random noise on image generation.
            if img.shape[-1] == 4:
                img = img[..., :3]

            filename = f"{class_name.lower()}_{count}.png"
            filepath = os.path.join(folder, filename).replace("\\", "/")
            cv2.imwrite(filepath, cv2.cvtColor(img, cv2.COLOR_RGB2BGR))  # Save on proper format.

            index_map[filename] = int(i)
            count += 1
            if count >= examples_per_class:
                break

    # Save on .json
    json_path = os.path.join("static", "correct_examples_map.json")
    with open(json_path, "w") as f:
        json.dump(index_map, f)
