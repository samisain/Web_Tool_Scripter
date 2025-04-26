const htmlBox = document.getElementById('htmlCode');
const cssBox = document.getElementById('cssCode');
const jsBox = document.getElementById('jsCode');
const iframe = document.getElementById('preview');
const projectName = document.getElementById('projectName');
const themeToggle = document.getElementById('themeToggle');

function updatePreview() {
  const html = htmlBox.value;
  const css = `<style>${cssBox.value}</style>`;
  const js = `<script>${jsBox.value}<\/script>`;
  const fullContent = html + css + js;
  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(fullContent);
  doc.close();
}

htmlBox.addEventListener('input', updatePreview);
cssBox.addEventListener('input', updatePreview);
jsBox.addEventListener('input', updatePreview);

// Download specific file function
function downloadFiles() {
  const fileType = document.getElementById('fileType').value;

  if (fileType === 'html') {
    download('text/html', htmlBox.value, 'index.html');
  } else if (fileType === 'css') {
    download('text/css', cssBox.value, 'style.css');
  } else if (fileType === 'js') {
    download('text/javascript', jsBox.value, 'script.js');
  } else if (fileType === 'all') {
    download('text/html', htmlBox.value, 'index.html');
    download('text/css', cssBox.value, 'style.css');
    download('text/javascript', jsBox.value, 'script.js');
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

function saveFile(content, filename) {
  const blob = new Blob([content], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

// Clear functionality
document.getElementById('clearCode').addEventListener('click', () => {
  htmlBox.value = '';
  cssBox.value = '';
  jsBox.value = '';
  updatePreview();
});

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  if (document.body.classList.contains('dark')) {
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }
});
