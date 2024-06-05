from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)
df = None  # Global variable to store the DataFrame

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    global df  # Reference the global DataFrame variable
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    df = pd.read_csv(file)
    rows, cols = df.shape
    
    return jsonify({'rows': rows, 'cols': cols})

if __name__ == '__main__':
    app.run(debug=True)
