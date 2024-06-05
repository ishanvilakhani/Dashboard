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
                    output.innerHTML = `
                        <h3>DataFrame:</h3>
                        <pre>${JSON.stringify(df.to_json(), null, 2)}</pre>
                    `;
                },
                error: function (error) {
                    console.error('Error parsing file:', error);
                }
            });
        } else {
            alert('Please upload a file.');
        }
    };
});
