// Function to execute user code and manage frame counting
function executeUserCodeWithFrameCount(userCode) {
    // locate the display container and clear any existing iframe
    let displayContainer = document.getElementById('display-container');
    let existingIframe = displayContainer.querySelector('iframe');
    if (existingIframe) {
        displayContainer.removeChild(existingIframe); // Remove the existing iframe to reset it
    }

    // create a new iframe for fresh execution
    let iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 700px; border: 1px solid #121212;';
    displayContainer.appendChild(iframe);

    // access the new iframe's document
    let iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // open and write to the iframe's document
    iframeDoc.open();
    iframeDoc.write(`
        <html>
            <head>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js"></script>
            </head>
            <body>
                <script>${userCode}</script>
                <script>
                    // Inject frame counting setup directly without waiting for load event
                    const originalDraw = window.draw || function() {};
                    window.draw = function() {
                        originalDraw();
                        // Update frame count in parent document directly
                        parent.updateFrameCount(frameCount);
                    };

                    // Immediate function to make sure setupFrameCounting is called right away
                    (function setupFrameCounting() {
                    })();
                </script>
            </body>
        </html>
    `);
    iframeDoc.close(); // close document and apply changes
}
