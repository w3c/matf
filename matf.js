import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import markdownit from 'markdown-it';
import ejs from 'ejs';
import open from 'open';
import { WcagPlugin } from './wcag.js';

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

// Execute: init plugins, read files, render HTML
const execute = async () => {
  console.log(`Initializing WCAG plugins...`);
  const wcagPlugin = await WcagPlugin.init('wcag', 'https://www.w3.org/TR/WCAG22/');
  const wcag2ictPlugin = await WcagPlugin.init('wcag2ict', 'https://www.w3.org/TR/wcag2ict-22/');

  console.log(`Initializing markdownit...`);
  const md = markdownit({ 
    html: true 
  })
  .use(wcagPlugin)
  .use(wcag2ictPlugin);

  console.log(`Reading markdown files...`);
  const map = await readFiles('wcag', '.md');
  const keys = Array.from(map.keys()).sort(semver.compare);

  console.log(`Rendering HTML for ${keys.length} files...`)
  const files = [];
  for (const key of keys) {
    console.log(`Rendering HTML for ${key}...`)
    const html = md.render(map.get(key));
    files.push({
      key,
      html,
    });
  }
  console.log(`Successfully rendered ${files.length} files to HTML...`);

  const templateFile = path.join(root, 'index.ejs');
  console.log(`Rendering template ${templateFile}...`);
  const template = await fs.readFile(templateFile, 'utf8');
  const html = ejs.render(template, { files });

  const indexFile = path.join(root, 'index.html');
  console.log(`Writing output to ${indexFile}`);
  await fs.writeFile(indexFile, html, 'utf8');

  console.log(`Opening ${indexFile} in browser...`)
  await open(indexFile, { wait: false });
};

// Run the script and ensure completion
execute()
  .then(() => {
    console.log('Script completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error(`Script encountered error: ${error}`);
    process.exit(1);
  });