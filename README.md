# p5.js Code Playground README

## Overview

The p5.js Code Playground is an interactive web application designed to provide users with a platform to write, run, and experiment with p5.js sketches directly in the browser.

P5Playground can be used at https://huyenhuynhh.github.io/p5Playground/


## Features

- **Code Editor**: Utilizes CodeMirror for syntax highlighting, line numbering, and a rich text editing experience.
- **Live Execution**: Allows users to run their p5.js sketches within an iframe, seeing the results instantly.
- **Frame Count Display**: Independently tracks and displays the frame count outside the sketch, ensuring users can monitor performance without cluttering the sketch output.
- **Editable Sketches**: Users can edit their sketches and re-run them, fostering an iterative development process.
- **Reset and Re-run**: Provides a reset button to clear the current sketch and start fresh, alongside the ability to re-run modified code.
- **Code Copy**: Enables users to copy their code to the clipboard for easy sharing or saving.

## Setup

To set up the p5.js Code Playground on your local environment, follow these steps:

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-repository/p5js-code-playground.git
   cd p5js-code-playground
   ```

2. **Open the Project**

   Open the `index.html` file in a web browser to start using the playground.

3. **Dependencies**

   The project utilizes the following external libraries:
   - p5.js (loaded from CDN)
   - CodeMirror (loaded from CDN)

## Usage

- **Writing Code**: Type your p5.js code directly into the CodeMirror editor.
- **Running Sketches**: Click the "Run" button to execute your sketch. The output will appear in the designated display area.
- **Editing Sketches**: Make changes to your code as needed. Click "Edit" to ensure the editor is in an editable state, then "Run" again to see your changes.
- **Resetting Sketches**: Use the "Reset" button to clear the output and start with a fresh canvas.
- **Copying Code**: Click the "Copy" button to copy your sketch code to the clipboard.
