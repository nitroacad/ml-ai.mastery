# ML-AI Mastery

[![Deploy Static Site](https://github.com/nitroacad/ml-ai.mastery/actions/workflows/deploy.yml/badge.svg)](https://github.com/nitroacad/ml-ai.mastery/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**ML-AI Mastery** is a zero-build, pure HTML5/CSS3/Vanilla JS (ES2022+) developer-education platform teaching **every aspect of AI/ML engineering**—from math and Python foundations through classical ML, deep learning, LLMs, RAG, AI agents, MLOps, deployment, and monitoring.

🌐 **Live Site:** [https://nitroacad.github.io/ml-ai.mastery/](https://nitroacad.github.io/ml-ai.mastery/)

---

## ⚡ Tech Stack & Architecture Constraints

Strictly built without front-end frameworks, build tools, or server code:
- **HTML5**: Semantic, WCAG 2.2 AA compliant.
- **CSS3**: Custom properties (`tokens.css`), Flexbox, CSS Grid, `@layer`, container queries, `prefers-color-scheme`.
- **Vanilla ES2022+ JavaScript**: Native browser ES modules. No transpilation or npm packages.
- **Formspree**: Handles the single contact & newsletter form (`contact.html`).
- **CDN Libraries**: Pinned dependencies with Subresource Integrity (SRI) hashes (Google Fonts, Lucide, Prism.js, KaTeX, Mermaid.js, Chart.js, Fuse.js, Pyodide, canvas-confetti).

---

## 📚 Curriculum Structure

The platform contains 25 comprehensive modules:

1. **Foundations & Environment** (`learn/01-foundations/`)
2. **Math for ML** (`learn/02-math-for-ml/`)
3. **Python for ML** (`learn/03-python-for-ml/`)
4. **Data Engineering for ML** (`learn/04-data-engineering/`)
5. **Classical ML** (`learn/05-classical-ml/`)
6. **Model Evaluation & Tuning** (`learn/06-model-evaluation/`)
7. **Feature Engineering & Pipelines** (`learn/07-feature-engineering/`)
8. **Deep Learning Fundamentals** (`learn/08-deep-learning-fundamentals/`)
9. **Computer Vision** (`learn/09-computer-vision/`)
10. **NLP & Sequence Models** (`learn/10-nlp-and-sequence-models/`)
11. **Transformers & LLM Internals** (`learn/11-transformers-and-llms/`)
12. **Prompt Engineering & Structured Outputs** (`learn/12-prompt-engineering/`)
13. **RAG (Retrieval-Augmented Generation)** (`learn/13-rag/`)
14. **AI Agents & Tool Use** (`learn/14-ai-agents/`)
15. **Fine-Tuning & Adaptation** (`learn/15-fine-tuning/`)
16. **LLM Evaluation & Safety** (`learn/16-llm-evaluation-and-safety/`)
17. **Generative AI Beyond Text** (`learn/17-generative-ai/`)
18. **Reinforcement Learning** (`learn/18-reinforcement-learning/`)
19. **Time Series & Recommendations** (`learn/19-time-series-and-recommendations/`)
20. **MLOps** (`learn/20-mlops/`)
21. **Serving & Deployment** (`learn/21-serving-and-deployment/`)
22. **Monitoring & Maintenance** (`learn/22-monitoring-and-maintenance/`)
23. **Cloud, Hardware & Scaling** (`learn/23-cloud-hardware-scaling/`)
24. **Responsible AI, Security & Governance** (`learn/24-responsible-ai-and-security/`)
25. **Capstones & Interview Prep** (`learn/25-capstones/`)

---

## 💻 Local Preview Instructions

No build steps, node_modules, or bundlers required. Run a local static server using Python:

```bash
# Clone repository
git clone https://github.com/nitroacad/ml-ai.mastery.git
cd ml-ai.mastery

# Start local server
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your web browser.

---

## ✉️ Formspree Setup Instructions

The site contains **exactly one form** on `contact.html`.

1. Sign up at [formspree.io](https://formspree.io) and create a new form.
2. Copy your Form ID (e.g. `xpzgkldo`).
3. Open `assets/js/form.js` and update line 2:
   ```javascript
   const FORMSPREE_ID = 'YOUR_FORM_ID';
   ```
4. In `contact.html`, update the form action URL:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

---

## 📄 License

Distributed under the [MIT License](LICENSE).
