import fs from 'fs/promises';
import path from 'path';
import semver from 'semver';
import markdownit from 'markdown-it'
import ejs from 'ejs';

const md = markdownit()
const root = process.cwd()

// Read files with given extension from given folder
const readFiles = async (folder, extension) => {
  const directory = path.join(root, folder)
  const files = await fs.readdir(directory);
  
  return new Map(
    await Promise.all(
      files.map(async file => {
        if (path.extname(file) === extension) {
          return [
            path.basename(file, extension),
            await fs.readFile(path.join(folder, file), 'utf8')
          ];
        }
      })
    )
  );
};

// Execute
readFiles('wcag', '.md').then(async map => {
  console.log("Map: ", map);

  const keys = Array.from(map.keys()).sort(semver.compare);
  console.log("Keys", keys);

  let files = [];
  for (const key of keys) {
    const html = md.render(map.get(key));

    files.push({
      key: key,
      html: html
    })
  }

  const templateFile = path.join(root, 'index.ejs');
  const template = await fs.readFile(templateFile, 'utf8');

  const html = ejs.render(template, { files: files });

  const indexFile = path.join(root, 'index.html');
  await fs.writeFile(indexFile, html, 'utf8');
}).catch(error => {
  console.error(`Error: ${error}`)
});
