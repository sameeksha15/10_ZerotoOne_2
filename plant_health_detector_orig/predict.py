import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

model0= load_model('final_detector/tree_classify.h5')
class0_labels = np.load('final_detector/tree_classification.npy')   

def predict(image_path):
    img = image.load_img(image_path, target_size=(64, 64))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to match batch size
    img_array /= 255.0  # Normalize pixel values
    prediction = model0.predict(img_array)
    predicted_index = np.argmax(prediction)
    predicted_class = class0_labels[predicted_index]
    print("Predicted Tree:", predicted_class)

    if predicted_index == 0:
        model1 = load_model('final_detector/cashew_diseases.h5')
        labels1= np.load('final_detector/cashew_labels.npy')
        def predict_single_image(image_path):
            img = image.load_img(image_path, target_size=(64, 64))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to match batch size
            img_array /= 255.0  # Normalize pixel values
            prediction = model1.predict(img_array)
            predicted = np.argmax(prediction)
            predicted_class = labels1[predicted]
            return predicted_class
        predicted_label = predict_single_image(image_path)
        print("Predicted Status:", predicted_label)
    elif predicted_index == 1:
        model2 = load_model('final_detector/cassava_diseases.h5')
        labels2= np.load('final_detector/cassava_labels.npy')
        def predict_single_image(image_path):
            img = image.load_img(image_path, target_size=(64, 64))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to match batch size
            img_array /= 255.0  # Normalize pixel values
            prediction = model2.predict(img_array)
            predicted = np.argmax(prediction)
            predicted_class = labels2[predicted]
            return predicted_class
        predicted_label = predict_single_image(image_path)
        print("Predicted Status:", predicted_label)
    elif predicted_index == 2:
        model3 = load_model('final_detector/maize_diseases.h5')
        labels3= np.load('final_detector/maize_labels.npy')
        def predict_single_image(image_path):
            img = image.load_img(image_path, target_size=(64, 64))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to match batch size
            img_array /= 255.0  # Normalize pixel values
            prediction = model3.predict(img_array)
            predicted = np.argmax(prediction)
            predicted_class = labels3[predicted]
            return predicted_class
        predicted_label = predict_single_image(image_path)
        print("Predicted Status:", predicted_label)
    elif predicted_index == 0:
        model4 = load_model('final_detector/cashew_diseases.h5')
        labels4= np.load('final_detector/cashew_labels.npy')
        def predict_single_image(image_path):
            img = image.load_img(image_path, target_size=(64, 64))
            img_array = image.img_to_array(img)
            img_array = np.expand_dims(img_array, axis=0)  # Expand dimensions to match batch size
            img_array /= 255.0  # Normalize pixel values
            prediction = model4.predict(img_array)
            predicted = np.argmax(prediction)
            predicted_class = labels4[predicted]
            return predicted_class
        predicted_label = predict_single_image(image_path)
        print("Predicted Status:", predicted_label)
    else:
        print("Invalid predicted index.")
        predicted_label = None
    return predicted_label


