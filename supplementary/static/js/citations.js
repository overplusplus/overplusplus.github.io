// Simple BibTeX parser and citation handler
let citations = {};
let usedCitations = new Set();

// Simple BibTeX parser - extracts key fields from BibTeX entries
function parseBibTeX(bibtexText) {
    const entries = {};
    
    // Match each @type{key, ...fields...}
    const entryRegex = /@\w+\{([^,]+),([^@]*?)^\}/gms;
    const matches = [...bibtexText.matchAll(entryRegex)];
    
    matches.forEach(match => {
        const key = match[1].trim();
        const fieldsText = match[2];
        
        const entry = { key: key };
        
        // Extract each field = {value}
        const fieldRegex = /(\w+)\s*=\s*\{([^}]*)\}/g;
        let fieldMatch;
        
        while ((fieldMatch = fieldRegex.exec(fieldsText)) !== null) {
            const fieldName = fieldMatch[1].toLowerCase();
            const fieldValue = fieldMatch[2].trim();
            entry[fieldName] = fieldValue;
        }
        
        // Extract first author's last name
        if (entry.author) {
            const authors = entry.author.split(' and ');
            const firstAuthor = authors[0].trim();
            // Handle "Last, First" or "First Last" format
            if (firstAuthor.includes(',')) {
                entry.firstAuthor = firstAuthor.split(',')[0].trim();
            } else {
                const nameParts = firstAuthor.split(' ');
                entry.firstAuthor = nameParts[nameParts.length - 1];
            }
        } else {
            entry.firstAuthor = 'Unknown';
        }
        
        // Determine venue
        entry.venue = entry.journal || entry.booktitle || entry.venue || '';
        
        entries[key] = entry;
    });
    
    return entries;
}

// // Load citations from refs.bib
// function loadCitations() {
//     return fetch('refs.bib')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to load refs.bib');
//             }
//             return response.text();
//         })
//         .then(bibtexText => {
//             citations = parseBibTeX(bibtexText);
//             // console.log('Loaded citations:', Object.keys(citations));
//             return citations;
//         })
//         .catch(error => {
//             console.error('Error loading citations:', error);
//             // Fallback to empty
//             citations = {};
//             return citations;
//         });
// }

// Option 2: Inline BibTeX directly
function loadCitations() {
    const bibtexText = `
@inproceedings{gillman2025force,
  title        = {Force Prompting: Video Generation Models Can Learn and Generalize Physics-Based Control Signals},
  author       = {Gillman, Nate and Herrmann, Charles and Freeman, Michael
                  and Aggarwal, Daksh and Luo, Evan and Sun, Deqing and Sun, Chen},
  booktitle    = {Advances in Neural Information Processing Systems},
  year         = {2025},
  note         = {Poster \#116909, NeurIPS 2025. Also available as arXiv preprint arXiv:2505.19386},
  url          = {https://arxiv.org/abs/2505.19386},
  pdf          = {https://cs.brown.edu/people/ngillman/pubs/force-prompting.pdf}
}

@inproceedings{sadat2024eliminating,
  title={Eliminating oversaturation and artifacts of high guidance scales in diffusion models},
  author={Sadat, Seyedmorteza and Hilliges, Otmar and Weber, Romann M},
  booktitle={The Thirteenth International Conference on Learning Representations},
  year={2024}
}

@inproceedings{bar2024lumiere,
  title={Lumiere: A space-time diffusion model for video generation},
  author={Bar-Tal, Omer and Chefer, Hila and Tov, Omer and Herrmann, Charles and Paiss, Roni and Zada, Shiran and Ephrat, Ariel and Hur, Junhwa and Liu, Guanghui and Raj, Amit and others},
  booktitle={SIGGRAPH Asia 2024 Conference Papers},
  pages={1--11},
  year={2024}
}

@misc{foundryNukeFilm,
	author = {},
	title = {Nuke | VFX and Film Editing Software},
	howpublished = {https://www.foundry.com/products/nuke-family/nuke},
	year = {},
	note = {[Accessed 27-02-2026]},
}
`;

    // parse your BibTeX with your existing parser
    citations = parseBibTeX(bibtexText);
    return Promise.resolve(citations);  // Return a resolved Promise
}

function replaceCitations() {
    // Find all text nodes containing \cite{}
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodesToProcess = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue && /\\cite\{([^}]+)\}/.test(node.nodeValue)) {
            nodesToProcess.push(node);
        }
    }
    
    nodesToProcess.forEach(textNode => {
        const parent = textNode.parentNode;
        const text = textNode.nodeValue;
        const parts = text.split(/(\\cite\{[^}]+\})/g);
        
        const fragment = document.createDocumentFragment();
        parts.forEach(part => {
            const match = part.match(/\\cite\{([^}]+)\}/);
            if (match) {
                const key = match[1];
                const citation = citations[key];
                
                if (citation) {
                    usedCitations.add(key);
                    const span = document.createElement('span');
                    span.className = 'citation';
                    span.style.color = '#4488ff';
                    span.style.cursor = 'pointer';
                    span.textContent = `[${citation.firstAuthor} et al., ${citation.year}]`;
                    span.onclick = function() {
                        document.getElementById('my-bib').scrollIntoView({ behavior: 'smooth' });
                    };
                    fragment.appendChild(span);
                } else {
                    fragment.appendChild(document.createTextNode(`[${key}?]`));
                }
            } else if (part) {
                fragment.appendChild(document.createTextNode(part));
            }
        });
        
        parent.replaceChild(fragment, textNode);
    });
}

function renderBibliography() {
    const bibDiv = document.getElementById('my-bib');
    if (!bibDiv) return;
    
    if (usedCitations.size === 0) {
        bibDiv.style.display = 'none';
        const header = bibDiv.previousElementSibling;
        if (header && header.textContent.trim() === 'References') {
            header.style.display = 'none';
        }
        return;
    }
    
    let html = '<ol style="text-align: left;">';
    for (const key in citations) {
        if (!usedCitations.has(key)) continue;
        const cite = citations[key];
        html += `<li style="margin-bottom: 10px;">
            ${cite.author} (${cite.year}). 
            <i>${cite.title}</i>. 
            ${cite.venue}.
        </li>`;
    }
    html += '</ol>';
    bibDiv.innerHTML = html;
}

// Initialize - load citations then process
function initCitations() {
    loadCitations().then(() => {
        replaceCitations();
        renderBibliography();
    });
}

// Run after DOM loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCitations);
} else {
    initCitations();
}
