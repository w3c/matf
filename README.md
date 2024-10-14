# Mobile Accessibility Task Force (MATF)

This repository is used to work on guidance for mobile accessibility.

- The newest draft can be found at: [w3c.github.io/matf](https://w3c.github.io/matf/)
- Discussions are tracked in [MATF issues](https://github.com/w3c/matf/issues)
- Read more about the MATF on the [W3C website](https://www.w3.org/WAI/about/groups/task-forces/matf/)

## Setup

Upon push to the `main` branch, the [`index.html`](index.html) file gets generated based on the `.md` files in the [`wcag`](/wcag) folder. Next, the `index.html` file gets commited, and then deployed to Github Pages.

![Generate, Update, Deploy workflow](https://github.com/w3c/matf/actions/workflows/deploy.yml/badge.svg)

For local development:

- Open this repository in a terminal
- Run `npm install` to install dependencies
- Run `node matf.js` to generate `index.html`
- Open `index.html` in your browser of choice
