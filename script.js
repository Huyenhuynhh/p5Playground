document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror instance
    var editor = CodeMirror(document.getElementById('code-editor'), {
        mode: "javascript",
        theme: "default",
        lineNumbers: true,
        readOnly: false
    });

    // Variable to store the current editor content before execution
    //var currentCodeBackup = editor.getValue(); // Initialize with the initial content of the editor

    var runButton = document.getElementById('runButton');
    var editButton = document.getElementById('editButton');
    var resetButton = document.getElementById('resetButton');

    // Function to run code from the editor
    function runCode() {
        //currentCodeBackup = editor.getValue();
        
        let code = editor.getValue();
        let displayContainer = document.getElementById('display-container');
        displayContainer.innerHTML = '';

        let iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '400px';
        displayContainer.appendChild(iframe);

        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script></head><body><script>' + code + '<\/script></body></html>');
        iframeDoc.close();

        editor.setOption("readOnly", true);

        // disable the run button and changes its color
        runButton.disabled = true;
        runButton.style.backgroundColor = '#cccccc';
        runButton.style.cursor = 'not-allowed';
    }

    function enableEditing() {
        // make sure the editor is editable
        editor.setOption("readOnly", false);

        // enable the run button so user can execute code again
        runButton.disabled = false;
        runButton.style.backgroundColor = '';
        runButton.style.cursor = '';
    }

    function showCopySuccessMessage() {
        const message = document.createElement('div');
        message.textContent = 'Code copied successfully!';
        message.style.position = 'fixed';
        message.style.bottom = '20px';
        message.style.right = '20px';
        message.style.padding = '10px';
        message.style.backgroundColor = '#FDEDAD';
        message.style.color = 'black';
        message.style.borderRadius = '5px';
        message.style.zIndex = '1000';
        message.style.transition = 'opacity 0.5s';
        
        document.body.appendChild(message);

        // remove message after 2 secs
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => document.body.removeChild(message), 500); 
        }, 2000);
    }

    function copyCode() {
        const code = editor.getValue();
        navigator.clipboard.writeText(code).then(function() {
            console.log('Copying to clipboard was successful!');
            showCopySuccessMessage();
        }, function(err) {
            console.error('Could not copy text: ', err);
        })
    }

    // Attach event listeners
    runButton.addEventListener('click', runCode);
    editButton.addEventListener('click', enableEditing);
    resetButton.addEventListener('click', function() {
        enableEditing();
    });

    // Assuming the reset functionality is as before, resetting execution environment
    document.getElementById('resetButton').addEventListener('click', runCode);
    document.getElementById('copyButton').addEventListener('click', copyCode);
});
