from flask import Flask, send_file, request
import sys
import flask
from flask_cors import CORS
import io


sys.path.append(".")
from model import *

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "<h1>Hello</h1>"

@app.route('/predict/',methods=['GET','POST'])
def predict():
	file = request.files['image']
	img = get(file)
	file_object = io.BytesIO()
	img.save(file_object, "JPEG")
	
	file_object.seek(0)
	return send_file(file_object, mimetype='image/JPEG')
	

if __name__ == '__main__':
    app.run(debug=True, port=8000)