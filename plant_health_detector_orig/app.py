from flask import Flask, request, jsonify
import os
import json
from bson import json_util
from download_from_s3 import get_file
from predict import predict

from db import files_collection

from bson.objectid import ObjectId

from bot import dietchatbot

app = Flask(__name__)

@app.route('/getPlantHealth', methods=['GET', 'POST'])
def get_plant_health():
    if request.method == 'POST':
        body = json.loads(request.data)
        
        content = body['content']

        s3filename = content['s3Name']
        mid = content['fileId']

        # validate file id (mongo db)
        try:
            objInstance = ObjectId(mid)
        except:
            return jsonify({"error": "invalid file id"}), 400

        # download the image file for processing
        res = get_file(s3filename)
        if not res:
            return jsonify({"error": "s3 object does not exist"})

        # predict
        predicted_label = predict(f'files/{s3filename}')

        insights = dietchatbot(predicted_label)

        # save output in db
        objInstance = ObjectId(mid)
        files_collection.update_one({"_id": objInstance}, {"$set": {"plant_label": predicted_label}})
        files_collection.update_one({"_id": objInstance}, {"$set": {"insights": insights}})

        # remove local files
        os.remove(f'files/{s3filename}')

        return jsonify({"message":"file processed successfully."})
    elif request.method == 'GET':
        return jsonify({"message":"get method not supported."})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)