document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror instance
    var editor = CodeMirror(document.getElementById('code-editor'), {
        mode: "javascript",
        theme: 'default',
        lineNumbers: true,
        readOnly: false
    });

    var runButton = document.getElementById('runButton');
    var editButton = document.getElementById('editButton');
    var resetButton = document.getElementById('resetButton');

    // Function to run code from the editor
    function runCode() {
        let code = editor.getValue();
        let displayContainer = document.getElementById('display-container');
        displayContainer.innerHTML = '';

        let iframe = document.createElement('iframe');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        displayContainer.appendChild(iframe);

        iframe.onload = function() {
            iframe.contentWindow.document.body.style.margin = "0";
            iframe.contentWindow.document.body.style.padding = "0";
        };

        let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        iframeDoc.open();
        iframeDoc.write('<html><head><script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script></head><body><script>' + code + '<\/script></body></html>');
        iframeDoc.close();

        editor.setOption("readOnly", "nocursor");

        // disable the run button and changes its color
        editor.setOption("readOnly", "nocursor");
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
        runButton.classList.remove('button-disabled');
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

    function resetAndRunCode() {
        let displayContainer = document.getElementById('display-container');
        displayContainer.innerHTML = '';

        // re-run the code, re-creating the iframe and re-initalizong p5 environment
        runCode();
    }

    window.updateFrameCount = function(frameCount) {
        document.getElementById('frameCounter').innerText = `Frames: ${frameCount}`;
    };

    // Attach event listeners
    runButton.addEventListener('click', function() {
        const userCode = editor.getValue();
        executeUserCodeWithFrameCount(userCode); // This function is defined in custom-script.js
    });

    // make sure editing re-enables the "Run" button directly
    editButton.addEventListener('click', function() {
        editor.setOption("readOnly", false);

        // enable the run button so user can execute code again
        runButton.disabled = false;
        runButton.style.backgroundColor = '';
        runButton.style.cursor = '';
        runButton.classList.remove('button-disabled');

        editor.focus();
    });

    //  resetButton re-executes the current code in the editor
    resetButton.addEventListener('click', function() {
        document.getElementById('frameCounter').innerText = 'Frames: 0'; // reset frame count display
        runButton.click(); 
    });


    // Assuming the reset functionality is as before, resetting execution environment
    document.getElementById('resetButton').addEventListener('click', resetAndRunCode);
    document.getElementById('runButton').addEventListener('click', runCode);
    document.getElementById('copyButton').addEventListener('click', copyCode);
});
