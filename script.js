document.addEventListener('DOMContentLoaded', function () {
    const fileInput = document.getElementById('fileInput');
    const output = document.getElementById('output');

    window.handleFile = function () {
        const file = fileInput.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                complete: function (results) {
                    const data = results.data;
                    const df = new dfd.DataFrame(data);
                    displayDataFrame(df);
                },
                error: function (error) {
                    console.error('Error parsing file:', error);
                }
            });
        } else {
            alert('Please upload a file.');
        }
    };

    function displayDataFrame(df) {
        df.head().print()
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        
        const headers = df.columns;
        const headerRow = document.createElement('tr');
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        
        
        df.values.forEach(row => {
            const tr = document.createElement('tr');
            row.forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        table.appendChild(thead);
        table.appendChild(tbody);
        output.innerHTML = ''; 
        output.appendChild(table);
    }
});
