document.addEventListener('DOMContentLoaded', function () { //ensures code will only run when full HTML document has been loaded and parsed.
    const fileInput = document.getElementById('fileInput'); // reads file input
    const output = document.getElementById('output');  // gets HTML elements like div, p, to display 
    const uploadButton = document.getElementById('uploadButton'); // stores when upload button is pressed 

    uploadButton.addEventListener('click', function () { // when the upload button is clicked
        const file = fileInput.files[0]; // takes in the file 
        if (file) { // if file has been uploaded and u press the button then
            const formData = new FormData();
            formData.append('file', file);

            fetch('/upload', {
                method: 'POST',
                body: formData,
            })
            .then(response => response.json())
            .then(response => {
                displayDataFrame(response.data, response.column_info);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
            });
        } else { // if file has been uploaded and u press the button then
            alert('Please upload a file.'); // asks you to upload the file 
        }
    });

    function displayDataFrame(data, column_info) {
        const limitedData = data.map(row => {
            const limitedRow = {};
            Object.keys(row).slice(0, 10).forEach(key => {
                limitedRow[key] = row[key];
            });
            return limitedRow;
        });

        const limitedColumnInfo = Object.keys(column_info).slice(0, 10).reduce((obj, key) => {
            obj[key] = column_info[key];
            return obj;
        }, {});

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');

        // Create table headers
        const headers = Object.keys(limitedData[0]);
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);

        // Create table rows
        limitedData.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        output.innerHTML = '';
        output.appendChild(table);

        // Create list of column info
        const columnInfoList = document.createElement('ul');
        columnInfoList.style.listStyleType = 'none';
        columnInfoList.style.padding = '0';
        columnInfoList.style.marginTop = '20px';
        Object.keys(limitedColumnInfo).forEach(key => {
            const li = document.createElement('li');
            li.textContent = `${key}: ${limitedColumnInfo[key]}`;
            columnInfoList.appendChild(li);
        });
        output.appendChild(columnInfoList);
    }
});
