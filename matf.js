import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import markdownit from 'markdown-it';
import ejs from 'ejs';

// Plugin for [wcag] and [wcag2ict] element
function wcagPlugin(tag, url) {
  return function(md) {
    md.inline.ruler.before('emphasis', tag, (state, silent) => {
      const startPos = state.pos;
      const maxPos = state.posMax;

      // Look for the custom inline tag format [tag:id]
      const regex = new RegExp(`\\[${tag}:([a-zA-Z0-9-_\\.]+)\\]`);
      const match = state.src.slice(startPos, maxPos).match(regex);

      if (!match) return false; // No match found

      const id = match[1]; // Extract the id
      const link = `${url}#${id}`;

      if (silent) return true; // Validate without modifying state

      // Push a token for the element
      const token = state.push(`${tag}_details`, '', 0);
      token.tag = tag;
      token.id = id;
      token.link = link;

      // Advance parser position by the length of the match
      state.pos += match[0].length;

      return true;
    });

    // Renderer for the element
    md.renderer.rules[`${tag}_details`] = (tokens, id) => {
      const token = tokens[id];
      return `
        <details>
          <summary>${token.tag}: ${token.id}</summary>
          <blockquote cite="${token.link}">
            <p>Placeholder for quoted content</p>
            <footer>
              <cite>
                —
                <a href="${token.link}" target="_blank">${token.link}</a>            
              </cite>
            </footer>
          </blockquote>
        </details>
      `;
    };
  };
}

// Initialize markdown-it with custom wcag plugin
const md = markdownit({
  html: true,
})
.use(wcagPlugin('wcag', 'https://www.w3.org/TR/WCAG22/'))
.use(wcagPlugin('wcag2ict', 'https://www.w3.org/TR/wcag2ict-22/'));

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

// Execute
readFiles('wcag', '.md')
  .then(async (map) => {
    console.log('File map:', map);

    const keys = Array.from(map.keys()).sort(semver.compare);
    console.log('Sorted keys', keys);

    const files = [];
    for (const key of keys) {
      const html = md.render(map.get(key));
      files.push({
        key,
        html,
      });
    }
    console.log(`Successfully rendered ${files.length} files to HTML`);

    const templateFile = path.join(root, 'index.ejs');
    console.log(`Reading template from ${templateFile}`);
    const template = await fs.readFile(templateFile, 'utf8');

    console.log(`Rendering template...`);
    const html = ejs.render(template, { files });

    const indexFile = path.join(root, 'index.html');
    console.log(`Writing output to ${indexFile}`);
    await fs.writeFile(indexFile, html, 'utf8');
  })
  .catch((error) => {
    console.error(`Error: ${error}`);
  });
