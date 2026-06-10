import { Plugin } from './plugin.js';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

/**
 * The WCAG plugin adds a new markdown tag which can render sections of WCAG.
 * For example, the `[wcag:status-messages]` markdown will render the `status-messages` section.
 */
export class WcagPlugin extends Plugin {
  constructor(tag, url, html) {
    super(tag);
    this.url = url;
    this.html = html;
    this.$ = cheerio.load(html);
  }

  /**
   * Initializes the WcagPlugin by fetching HTML from a local file derived from the provided URL.
   * @param {string} tag - The tag used in markdown (e.g., `wcag` or `wcag2ict`).
   * @param {string} url - The URL to derive filename from (e.g., `https://www.w3.org/TR/2024/REC-WCAG22-20241212/`).
   * @returns {Promise<function>} - An initialized `WcagPlugin` function.
   */
  static async init(tag, url) {
    const html = await WcagPlugin.fetchHTML(url);
    return new WcagPlugin(tag, url, html).plugin();
  }

  /**
   * Loads HTML from a local file derived from the URL.
   * @param {string} url - The URL to derive filename from.
   * @returns {Promise<string>} - The HTML content.
   */
  static async fetchHTML(url) {
    const filename = new URL(url).pathname.split('/').filter(Boolean).pop();
    const directory = path.dirname(new URL(import.meta.url).pathname);
    
    const filePath = path.join(directory, `${filename}.html`);
    console.log(`Loading HTML from: ${filePath}`);
    
    try {
      const resolvedPath = path.resolve(filePath);
      
      if (!fs.existsSync(resolvedPath)) {
        throw new Error(`File not found: ${resolvedPath}`);
      }

      const html = await fs.promises.readFile(resolvedPath, 'utf-8');
      return html;
    } catch (error) {
      console.error(`Error loading ${filePath}:`, error);
      throw new Error(`Error loading content from ${filePath}: ${error.message}`);
    }
  }

  /**
   * Defines the regex for matching `[<tag>:<identifier>]`.
   * @returns {RegExp} - The regex for matching the note syntax.
   */
  regex() {
    return new RegExp(`\\[${this.tag}:([a-zA-Z0-9-_\\.]+)\\]`);
  }

  /**
   * Processes the matched content and populates the token with id, link, header and content.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    const id = match[1];
    const section = this.extract(id);

    token.id = id;
    token.link = `${this.url}#${id}`;
    token.header = section.header;
    token.content = section.content;
  }

  /**
   * Renders the token into HTML with an expand/collapse component.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    // Add the tag as a prefix to avoid id conflicts
    const $content = cheerio.load(token.content, null, false);
    $content('[id]').each((_, element) => {
      const currentId = $content(element).attr('id');
      $content(element).attr('id', `${this.tag}-${currentId}`);
    });
    token.content = $content.html();

    return `
      <details class="wcag">
        <summary>
          <strong>${this.tag.toUpperCase()}:</strong> ${token.header}
        </summary>
        <blockquote cite="${token.link}">
          <div>${token.content}</div>
        </blockquote>
        <footer>
          <cite>
            <a href="${token.link}" target="_blank">${token.link}</a>
          </cite>
        </footer>
      </details>
    `;
  }

  /**
   * Extracts a section by ID from the loaded HTML.
   * @param {string} id - The identifier for the section.
   * @returns {object} - An object containing the `header` and `content` of the section.
   */
  extract(id) {
    const $section = this.$(`#${id}`);
    if (!$section.length) {
      throw new Error(`Section not found: ${id}`);
    }

    const header = $section.find('h1, h2, h3, h4, h5, h6').first().text();
    $section.find('.header-wrapper, .doclinks, .conformance-level').remove();
    $section.find('a').each((_, anchor) => {
      const href = this.$(anchor).attr('href');
      if (href) {
        this.$(anchor).attr('target', '_blank');
        // Skip if already absolute URL
        if (!/^[\w]+:\/\//.test(href)) {
          const fullUrl = new URL(href, this.url).href;
          this.$(anchor).attr('href', fullUrl);
        }
      }
    });

    return {
      header,
      content: $section.html(),
    };
  }
}