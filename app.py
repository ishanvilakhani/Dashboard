from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, static_url_path='', static_folder='.')
CORS(app)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        df = pd.read_csv(file) # read file
        data = df.dtypes.to_dict(orient='records')   # get first 15 rows
        column_info = {col: dtype.name for col, dtype in df.dtypes.items()}  # store col name and data type as key-value pairs
        return jsonify({'data': data, 'column_info': column_info}) # send it back as a JSOn object

if __name__ == '__main__':
    app.run(debug=True)