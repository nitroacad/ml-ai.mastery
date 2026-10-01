# ML-AI Mastery Implementation Plan

## Architectural Overview
ML-AI Mastery is a zero-build, pure HTML5/CSS3/Vanilla JS (ES2022+) developer-education platform for AI/ML engineering.

## File Map
```
ml-ai.mastery/
├── index.html                  # Landing page, interactive lifecycle, dashboard
├── roadmap.html                # Interactive learning paths
├── contact.html                # THE ONLY FORM (contact + newsletter)
├── glossary.html               # 150+ searchable AI/ML terms
├── cheatsheets.html            # Printable cheat sheets (NumPy, pandas, PyTorch, etc.)
├── projects.html               # Capstone project specifications
├── resources.html              # Curated papers, books, datasets, tools
├── 404.html                    # Custom 404 with search
├── search-index.json           # Hand-maintained Fuse.js search index
├── sitemap.xml                 # Full sitemap
├── robots.txt                  # Robots directive
├── manifest.webmanifest        # PWA manifest
├── .nojekyll                   # GitHub Pages static override
├── .gitignore                  # Git ignore rules
├── LICENSE                     # MIT License
├── README.md                   # Professional documentation
├── docs/
│   └── PLAN.md                 # Project execution plan
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages static CI/CD pipeline
├── assets/
│   ├── css/
│   │   ├── tokens.css          # Color palette, dark/light themes, typography, spacing
│   │   ├── base.css            # CSS reset, typography base, layout resets
│   │   ├── layout.css          # Header, collapsible sidebar, main grid, right TOC
│   │   ├── components.css      # Callouts, cards, code blocks, tabs, quizzes, modals
│   │   └── print.css           # Clean print styling
│   ├── js/
│   │   ├── main.js             # Core initializer
│   │   ├── theme.js            # Light/dark toggle + localStorage sync
│   │   ├── nav.js              # Sidebar drawer, active states, scrollspy TOC
│   │   ├── search.js           # Cmd+K Fuse.js command palette modal
│   │   ├── progress.js         # localStorage lesson tracking & streak counter
│   │   ├── code.js             # Code copy button, tab switching, line highlighting
│   │   ├── playground.js       # Pyodide runnable cells (NumPy, pandas, matplotlib)
│   │   ├── quiz.js             # Declarative HTML quiz engine
│   │   ├── charts.js           # Chart.js helper functions
│   │   └── form.js             # Single Formspree AJAX form handler
│   └── img/                    # SVG logos, favicons, OG image
└── learn/
    ├── 01-foundations/
    ├── 02-math-for-ml/
    ├── 03-python-for-ml/
    ├── 04-data-engineering/
    ├── 05-classical-ml/
    ├── 06-model-evaluation/
    ├── 07-feature-engineering/
    ├── 08-deep-learning-fundamentals/
    ├── 09-computer-vision/
    ├── 10-nlp-and-sequence-models/
    ├── 11-transformers-and-llms/
    ├── 12-prompt-engineering/
    ├── 13-rag/
    ├── 14-ai-agents/
    ├── 15-fine-tuning/
    ├── 16-llm-evaluation-and-safety/
    ├── 17-generative-ai/
    ├── 18-reinforcement-learning/
    ├── 19-time-series-and-recommendations/
    ├── 20-mlops/
    ├── 21-serving-and-deployment/
    ├── 22-monitoring-and-maintenance/
    ├── 23-cloud-hardware-scaling/
    ├── 24-responsible-ai-and-security/
    └── 25-capstones/
```

## Approved CDN Libraries (Pinned exact versions with SRI)
- Google Fonts: Inter, JetBrains Mono, Space Grotesk
- Lucide Icons (v0.344.0)
- Prism.js (v1.29.0) + Autoloader + Line numbers + Copy button
- KaTeX (v0.16.9) + Auto-render
- Mermaid.js (v10.8.0)
- Chart.js (v4.4.1)
- Fuse.js (v7.0.0)
- Pyodide (v0.25.0)
- TensorFlow.js (v4.17.0)
- canvas-confetti (v1.9.2)

## Quality & Verification Checklist
1. All links are relative to support GitHub Pages subpaths.
2. Single `<form>` across entire site on `contact.html`.
3. Valid semantic HTML5 and WCAG 2.2 AA accessibility.
4. CSP metadata permitting approved CDNs and Formspree.
5. GitHub Actions workflow validating structure, internal links, and single form enforcement.
