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
            let table = `
                <table>
                    <tr>
                        <th>Title</th>
                        <th>NaN Counts</th>
                        <th>Zero Counts</th>
                    </tr>
            `;
            data.columns.forEach(col => {
                table += `
                    <tr>
                        <td>${col}</td>
                        <td>${data.nan_counts[col]}</td>
                        <td>${data.zero_counts[col]}</td>
                    </tr>
                `;
            });
            table += '</table>';
            outputDiv.innerHTML = table;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
