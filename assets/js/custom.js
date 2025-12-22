// --- MathJax configuration ---
window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']]
  },
  svg: {
    fontCache: 'global'
  },
  startup: {
    ready: function () {
      MathJax.startup.defaultReady();
      // Typeset the entire document once MathJax is ready
      MathJax.typesetPromise().catch(function (err) {
        console.warn('MathJax initial typeset failed:', err);
      });
    }
  }
};

(function () {
  const script = document.createElement('script');
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js";
  script.id = "MathJax-script";
  script.async = true;
  document.head.appendChild(script);

  // Also run typeset after DOM is fully loaded (handles refresh scenarios)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.MathJax && window.MathJax.typesetPromise) {
        MathJax.typesetPromise().catch(function (err) {
          console.warn('MathJax DOMContentLoaded typeset failed:', err);
        });
      }
    });
  }

  // Handle case when script loads after page is already ready
  window.addEventListener('load', function () {
    if (window.MathJax && window.MathJax.typesetPromise) {
      MathJax.typesetPromise().catch(function (err) {
        console.warn('MathJax window load typeset failed:', err);
      });
    }
  });
})();