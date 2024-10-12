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
  console.log(`File map: ${map}`);

  const keys = Array.from(map.keys()).sort(semver.compare);
  console.log(`Sorted keys: ${keys}`);

  let files = [];
  for (const key of keys) {
    const html = md.render(map.get(key));

    files.push({
      key: key,
      html: html
    })
  }
  console.log(`Successfully rendered ${files.length} files to HTML`)

  const templateFile = path.join(root, 'index.ejs');
  console.log(`Reading template from ${templateFile}`)
  const template = await fs.readFile(templateFile, 'utf8');

  console.log(`Rendering template...`)
  const html = ejs.render(template, { files: files });

  const indexFile = path.join(root, 'index.html');
  console.log(`Writing output to ${indexFile}`);

  await fs.writeFile(indexFile, html, 'utf8');
}).catch(error => {
  console.error(`Error: ${error}`)
});
