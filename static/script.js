document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert(data.error);
        } else {
            const outputDiv = document.getElementById('output');
            outputDiv.innerHTML = `<p>Rows: ${data.rows}</p><p>Columns: ${data.cols}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
