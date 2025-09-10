import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import markdownit from 'markdown-it';
import ejs from 'ejs';
import open from 'open';

import { ExamplePlugin } from './plugins/example.js';
import { GitHubPlugin } from './plugins/github.js';
import { NotePlugin } from './plugins/note.js';
import { WcagPlugin } from './plugins/wcag.js';

const root = process.cwd();

// Initialize `markdownit` with custom plugins
const initMarkdown = async () => {
  console.log(`Initializing markdownit and custom plugins...`);

  return markdownit({ html: true })
    .use(await ExamplePlugin.init())
    .use(await GitHubPlugin.init('https://github.com/w3c/matf'))
    .use(await NotePlugin.init())
    .use(await WcagPlugin.init('wcag', 'https://www.w3.org/TR/WCAG22/'))
    .use(await WcagPlugin.init('wcag2ict', 'https://www.w3.org/TR/wcag2ict-22/'));
};

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

// Render files in `comments` and `sections` folders
const renderFolders = async (md) => {
  // Render comments, sorted by semantic version (e.g. 1.4.10 after 1.4.9)
  const files = await renderFiles('comments', md);
  const comments = Object.keys(files).sort(semver.compare).map((key) => files[key]);

  // Render sections
  const sections = await renderFiles('sections', md);

  return { comments, sections };
};

// Render `index.ejs` template with data
const renderTemplate = async (comments, sections) => {
  const templateFile = path.join(root, 'index.ejs');
  console.log(`Rendering template ${templateFile}...`);
  const template = await fs.readFile(templateFile, 'utf8');
  return ejs.render(template, { comments, sections });
};

// Write content to the given file
const writeFile = async (name, content) => {
  const file = path.join(root, name);
  console.log(`Writing ${content.length} characters to ${file}`);
  await fs.writeFile(file, content, 'utf8');
  return file;
};

// Execute function
const execute = async () => {
  try {
    // 1. Init markdown renderer
    const md = await initMarkdown();
    // 2. Render comments and sections folders
    const { comments, sections } = await renderFolders(md);
    // 3. Render HTML from template
    const html = await renderTemplate(comments, sections);
    // 4. Write index.html file
    const indexFile = await writeFile('index.html', html);
    // 5. Open file in browser
    await open(indexFile, { wait: false });
    
    console.log('Script completed successfully!');
  } catch (error) {
    console.error(`Script encountered error: ${error}`);
    throw error;
  }
};
execute();
