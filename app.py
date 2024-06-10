from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)
df = None  # global var to store df

# ------------------------------------- ACCEPTING USER INPUT -----------------------------------------------------

@app.route('/') 
def index():
    return render_template('index.html') # start running wtv code index has 

@app.route('/table')
def table():
    return render_template('table.html')

@app.route('/upload', methods=['POST']) 
def upload_file():
    global df
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})
    
# ------------------------------------- TREATING IT LIKE A DF AND USING IT  -----------------------------------------------------

    df = pd.read_csv(file)
    rows, cols = df.shape
    columns = df.columns.tolist()
    nan_counts = df.isna().sum().to_dict()
    zero_counts = (df == 0).sum().to_dict()

# ------------------------------------- RETURN JSONIFY OBJECT FOR SCRIPT.JS  -----------------------------------------------------
    return jsonify({
        'rows': rows,
        'cols': cols,
        'columns': columns,
        'nan_counts': nan_counts,
        'zero_counts': zero_counts
    })

# --------------
if __name__ == '__main__':
    app.run(debug=True) # debug mode acitivted for easier access 
