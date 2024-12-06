import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import markdownit from 'markdown-it';
import ejs from 'ejs';
import open from 'open';

import { GithubPlugin } from './plugins/github.js';
import { NotePlugin } from './plugins/note.js';
import { WcagPlugin } from './plugins/wcag.js';

const root = process.cwd();

// Read files with given extension from given folder
const readFiles = async (folder, extension) => {
  const directory = path.join(root, folder);
  const files = await fs.readdir(directory);

  return new Map(
    await Promise.all(
      files.map(async (file) => {
        if (path.extname(file) === extension) {
          return [
            path.basename(file, extension),
            await fs.readFile(path.join(directory, file), 'utf8'),
          ];
        }
        return undefined; // Skip files with a different extension
      }).filter(Boolean) // Remove undefined values
    )
  );
};

// Render markdown files in the given folder
const renderFiles = async (folder, md) => {
  console.log(`Rendering markdown files in '${folder}'...`);

  const files = await readFiles(folder, '.md');
  console.log(`Rendering HTML for ${files.size} files...`);

  const result = {};
  for (const [key, content] of files.entries()) {
    console.log(`Rendering HTML for ${key}...`);
    result[key] = md.render(content);
  }

  console.log(`Successfully rendered ${Object.keys(result).length} files to HTML`);
  return result;
};

// Render `guidance` folder contents as HTML
const renderGuidance = async (md) => {
  const files = await renderFiles('guidance', md);

  // Create array sorted by semantic version (e.g. 1.4.10 after 1.4.9)
  return Object.keys(files)
    .sort(semver.compare)
    .map((key) => files[key]);
}

// Render `sections` folder contents as HTML
const renderSections = async (md) => {
  return await renderFiles('sections', md);
}

// Execute: init plugins, read files, render HTML
const execute = async () => {
  console.log(`Initializing custom plugins...`);
  const githubPlugin = await GithubPlugin.init('https://github.com/w3c/matf');
  const notePlugin = await NotePlugin.init();
  const wcagPlugin = await WcagPlugin.init('wcag', 'https://www.w3.org/TR/WCAG22/');
  const wcag2ictPlugin = await WcagPlugin.init('wcag2ict', 'https://www.w3.org/TR/wcag2ict-22/');

  console.log(`Initializing markdownit...`);
  const md = markdownit({ 
    html: true 
  })
  .use(githubPlugin)
  .use(notePlugin)
  .use(wcagPlugin)
  .use(wcag2ictPlugin);

  // Read files from `guidance` and `sections` folder
  const guidance = await renderGuidance(md);
  const sections = await renderSections(md);

  // Render `index.ejs` template
  const templateFile = path.join(root, 'index.ejs');
  console.log(`Rendering template ${templateFile}...`);
  const template = await fs.readFile(templateFile, 'utf8');
  const html = ejs.render(template, { guidance, sections });

  // Overwrite `index.html` file
  const indexFile = path.join(root, 'index.html');
  console.log(`Writing output to ${indexFile}`);
  await fs.writeFile(indexFile, html, 'utf8');

  // Open `index.html` in browser
  console.log(`Opening ${indexFile} in browser...`)
  await open(indexFile, { wait: false });
};

// Run the script and ensure completion
execute()
  .then(() => {
    console.log('Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Script encountered error: ${error}`);
    process.exit(1);
  });