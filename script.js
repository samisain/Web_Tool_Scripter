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

// Download functionality
function downloadFiles() {
  const name = projectName.value.trim() || 'Untitled';
  const fileType = document.getElementById('fileType').value;

  if (fileType === 'html') saveFile(htmlBox.value, name + '.html');
  if (fileType === 'css') saveFile(cssBox.value, name + '.css');
  if (fileType === 'js') saveFile(jsBox.value, name + '.js');
  if (fileType === 'all') {
    saveFile(htmlBox.value, name + '.html');
    saveFile(cssBox.value, name + '.css');
    saveFile(jsBox.value, name + '.js');
  }
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
