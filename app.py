from flask import Flask, request, jsonify, render_template, send_file
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import io, base64

app = Flask(__name__)
df = None  # global var to store df

# ------------------------------------- ACCEPTING USER INPUT -----------------------------------------------------

@app.route('/') 
def index():
    return render_template('index.html') # start running wtv code index has 

@app.route('/upload', methods=['POST']) 
def upload_file():
    global df
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
    df = pd.read_csv(file)
    return jsonify({'message': 'File uploaded successfully'})
    
# -------------------------------------  INITIAL ANALYSIS  -----------------------------------------------------

@app.route('/table')
def table():
    global df
    if df is None:
        return "No data available. Please upload a file first.", 400

    rows, cols = df.shape
    columns = df.columns.tolist()
    nan_counts = df.isna().sum().to_dict()
    zero_counts = (df == 0).sum().to_dict()
    
    return render_template('table.html', rows=rows, cols=cols, columns=columns, nan_counts=nan_counts, zero_counts=zero_counts)

# ------------------------------------- RETURN JSONIFY OBJECT FOR SCRIPT.JS  -----------------------------------------------------

@app.route('/visualize')
def visualize():
    global df
    if df is None:
        return "No data available. Please upload a file first.", 400

    corr = df.corr()
    plt.figure(figsize=(10, 8))
    sns.heatmap(corr, annot=True, cmap='coolwarm', linewidths=.5)
    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    image_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
    return render_template('visualize.html', image_base64=image_base64)

# --------------
if __name__ == '__main__':
    app.run(debug=True) # debug mode acitivted for easier access 
