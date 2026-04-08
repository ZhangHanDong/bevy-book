// Mermaid initialization for mdbook (without preprocessor)
// Converts ```mermaid code blocks to renderable <pre class="mermaid"> elements

(() => {
    const darkThemes = ['ayu', 'navy', 'coal'];
    const lightThemes = ['light', 'rust'];

    const classList = document.getElementsByTagName('html')[0].classList;

    let lastThemeWasLight = true;
    for (const cssClass of classList) {
        if (darkThemes.includes(cssClass)) {
            lastThemeWasLight = false;
            break;
        }
    }

    const theme = lastThemeWasLight ? 'default' : 'dark';

    // Convert code blocks with language-mermaid class to pre.mermaid
    // mdbook renders ```mermaid as <pre><code class="language-mermaid">...</code></pre>
    // mermaid.js expects <pre class="mermaid">...</pre>
    document.querySelectorAll('code.language-mermaid').forEach((codeEl) => {
        const preEl = codeEl.parentElement;
        if (preEl && preEl.tagName === 'PRE') {
            preEl.className = 'mermaid';
            preEl.textContent = codeEl.textContent;
        }
    });

    mermaid.initialize({ startOnLoad: true, theme });

    // Re-render on theme change
    for (const darkTheme of darkThemes) {
        const el = document.getElementById(darkTheme);
        if (el) el.addEventListener('click', () => {
            if (lastThemeWasLight) window.location.reload();
        });
    }

    for (const lightTheme of lightThemes) {
        const el = document.getElementById(lightTheme);
        if (el) el.addEventListener('click', () => {
            if (!lastThemeWasLight) window.location.reload();
        });
    }
})();
