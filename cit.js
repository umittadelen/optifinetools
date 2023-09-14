const files = {}; // Object to store added files

function addFile(filename, text) {
    files[filename] = text;
}

function saveFile() {
    if (Object.keys(files).length === 1) {
        // If only one file, save it directly without creating a ZIP
        const filename = Object.keys(files)[0];
        const text = files[filename];
        const blob = new Blob([text], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    } else if (Object.keys(files).length > 1) {
        // If multiple files, create a ZIP archive
        const zip = new JSZip();
        for (const filename in files) {
            zip.file(filename, files[filename]);
        }
        zip.generateAsync({ type: "blob" })
            .then(function (content) {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(content);
                a.download = "files.zip";
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    }
}