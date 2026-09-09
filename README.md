# Mobile Accessibility Task Force (MATF)

This repository is used to work on guidance for mobile accessibility.

- Our most recent [Editor's draft](https://www.w3.org/standards/types/#ED) is published at: [w3c.github.io/matf](https://w3c.github.io/matf/)
- Our most recent [Draft Group Note](https://www.w3.org/standards/types/#x2-5-1-draft-note) is published at: [w3.org/TR/wcag2mobile-22/](https://www.w3.org/TR/wcag2mobile-22/)
- The difference between the Editor's Draft and Draft Group Note can be viewed at: [WCAG2Mobile htmldiff](https://services.w3.org/htmldiff?doc1=https%3A%2F%2Fwww.w3.org%2FTR%2Fwcag2mobile-22%2F&doc2=https%3A%2F%2Fw3c.github.io%2Fmatf%2F)
- Discussions are tracked in [MATF issues](https://github.com/w3c/matf/issues)
- Planning is handled in the [MATF project](https://github.com/orgs/w3c/projects/147)
- Find more information in the [MATF wiki](https://github.com/w3c/matf/wiki)
- Read more about the MATF on the [W3C website](https://www.w3.org/WAI/about/groups/task-forces/matf/)

## Setup

- The [comments folder](/comments) contains Markdown files with our comments on each success criterion (and principle, guidelines in the future).
- The [sections folder](/sections) contains Markdown files for each section, such as abstract, introduction, etc.
- The [plugins folder](/plugins) contains Javascript files with Markdown extensions
  - [`ExamplePlugin`](/plugins/example.js): adds the `[example:<markdown>]` tag to render an `Example` containing the given `<markdown>`.
  - [`GitHubPlugin`](/plugins/github.js): adds the `[issue:<issue>]` tag to render a `Note` linking to the given GitHub `<issue>`.
  - [`NotePlugin`](/plugins/note.js): adds the `[note:<markdown>]` tag to render a `Note` containing the given `<markdown>`.
  - [`WcagPlugin`](/plugins/wcag.js): adds the `[wcag|wcag2ict:<id>]` tag to render a `<details>` component containing the WCAG or WCAG2ICT section identified by the given `<id>`.

Upon push to the `main` branch, the [`index.html`](index.html) file gets generated based on the [comments](/comments) and [sections](/sections) folders. Next, the `index.html` file gets commited, and then deployed to GitHub Pages.

![Generate, Update, Deploy workflow](https://github.com/w3c/matf/actions/workflows/deploy.yml/badge.svg)

For local development:

- Open this repository in a terminal
- Run `npm install` to install dependencies
- Run `node matf.js` to generate `index.html`
- Open `index.html` in your browser of choice
