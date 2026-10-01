/* Pyodide In-Browser Python Playground Handler */
let pyodideInstance = null;
let pyodideLoading = false;

export function initPlayground() {
  const pyCells = document.querySelectorAll('.py-cell');
  if (pyCells.length === 0) return;

  pyCells.forEach(cell => {
    const editor = cell.querySelector('.py-editor');
    const runBtn = cell.querySelector('.py-run-btn');
    const output = cell.querySelector('.py-output');

    if (!editor || !runBtn || !output) return;

    runBtn.addEventListener('click', async () => {
      output.textContent = '⌛ Initializing Python runtime (Pyodide WebAssembly)...';
      runBtn.disabled = true;

      try {
        if (!pyodideInstance) {
          if (!pyodideLoading) {
            pyodideLoading = true;
            if (typeof loadPyodide === 'undefined') {
              await new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js';
                script.onload = resolve;
                script.onerror = reject;
                document.head.appendChild(script);
              });
            }
            pyodideInstance = await loadPyodide();
            await pyodideInstance.loadPackage(['numpy', 'pandas', 'matplotlib', 'scikit-learn']);
            pyodideLoading = false;
          }
        }

        output.textContent = '⚙️ Executing Python code...';

        // Capture stdout
        pyodideInstance.runPython(`
          import sys
          import io
          sys.stdout = io.StringIO()
        `);

        const code = editor.value;
        const result = await pyodideInstance.runPythonAsync(code);
        const stdout = pyodideInstance.runPython('sys.stdout.getvalue()');

        output.textContent = (stdout || '') + (result !== undefined ? `\n[Result]: ${result}` : '');
      } catch (err) {
        output.textContent = `❌ Execution Error:\n${err.message}`;
      } finally {
        runBtn.disabled = false;
      }
    });
  });
}
