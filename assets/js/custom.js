// --- MathJax configuration ---
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  },
  startup: {
    typeset: false
  }
};

(function () {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.id = "MathJax-script";
  script.defer = true;
  document.head.appendChild(script);
})();

document.addEventListener("DOMContentLoaded", () => {
  if (window.MathJax) {
    MathJax.typesetPromise();
  }
});