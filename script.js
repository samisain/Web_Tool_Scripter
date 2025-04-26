// Live preview function
const htmlBox = document.getElementById('htmlCode');
const cssBox = document.getElementById('cssCode');
const jsBox = document.getElementById('jsCode');
const iframe = document.getElementById('preview');
const projectName = document.getElementById('projectName');

function updatePreview() {
  const html = htmlBox.value;
  const css = `<style>${cssBox.value}</style>`;
  const js = `<script>${jsBox.value}</script>`;
  const full = html + css + js;
  const previewDoc = iframe.contentDocument || iframe.contentWindow.document;
  previewDoc.open();
  previewDoc.write(full);
  previewDoc.close();
}

htmlBox.addEventListener('input', updatePreview);
cssBox.addEventListener('input', updatePreview);
jsBox.addEventListener('input', updatePreview);

// Download specific file function
function downloadFiles() {
  const name = projectName.value.trim() || 'Untitled';
  const fileType = document.getElementById('fileType').value;

  if (fileType === 'html') {
    download('text/html', htmlBox.value, name + '.html');
  } else if (fileType === 'css') {
    download('text/css', cssBox.value, name + '.css');
  } else if (fileType === 'js') {
    download('text/javascript', jsBox.value, name + '.js');
  } else if (fileType === 'all') {
    download('text/html', htmlBox.value, name + '.html');
    download('text/css', cssBox.value, name + '.css');
    download('text/javascript', jsBox.value, name + '.js');
  }
}

function download(type, content, filename) {
  const blob = new Blob([content], { type: type });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(a.href);
}

// Clear code function
function clearAllCode() {
  htmlBox.value = '';
  cssBox.value = '';
  jsBox.value = '';
  updatePreview();
}

// Dark/light theme toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.innerHTML = document.body.classList.contains('dark')
    ? '<i class="fas fa-moon"></i>'
    : '<i class="fas fa-sun"></i>';
});

// Add event to clear button (if exists)
const clearButton = document.getElementById('clearCode');
if (clearButton) {
  clearButton.addEventListener('click', clearAllCode);
}