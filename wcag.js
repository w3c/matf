import fetch from 'node-fetch';
import { JSDOM } from 'jsdom';

/**
 * The WCAG plugin adds a new markdown tag which can render sections of WCAG.
 * For example, the `[wcag:status-messages]` markdown can render the `status-messages` section.
 */
export class WcagPlugin {
  /**
   * Internal constructor to initializes with tag, url, html.
   * @param {string} tag - The tag used in markdown, e.g. `wcag`
   * @param {string} url - The URL to fetch content from, e.g. `https://www.w3.org/TR/WCAG22/`
   * @param {string} html - The fetched HTML content.
   */
  constructor(tag, url, html) {
    this.tag = tag;
    this.url = url;
    this.html = html;
  }

  /**
   * Initializes the plugin by fetching the HTML and creating the plugin.
   * @param {string} tag - The tag used in markdown, e.g. `wcag`
   * @param {string} url - The URL to fetch content from, e.g. `https://www.w3.org/TR/WCAG22/`
   * @returns {Promise<function>} - Returns a function to be used as a markdown-it plugin.
   */
  static async init(tag, url) {
    const html = await fetch(url);
    const plugin = new WcagPlugin(tag, url, html);
    return plugin.create();
  }

  /**
   * Fetches HTML content from the given URL.
   * @param {string} url - The URL to fetch the content from.
   * @returns {Promise<string>} - The HTML content of the URL.
   */
  static async fetch(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      return await response.text();
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      return `
        <p>Error loading content from ${url}</p>
        <p>${error}</p>
      `; 
    }
  }

  /**
   * Extracts the specific section of HTML based on the given id.
   * @param {string} id - The ID of the section to extract from the fetched HTML.
   * @returns {string} - The outer HTML of the section or an error message if not found.
   */
  extract(id) {
    const dom = new JSDOM(this.html);
    const element = dom.window.document.querySelector(`[id="${id}"]`);
    return element ? element.outerHTML : `<p>Section not found: ${id}</p>`;
  }

  /**
   * Creates the markdown-it plugin function to process [tag:id] inline elements.
   * @returns {function} - The plugin function that can be used with markdown-it.
   */
  create() {
    return (md) => {
      md.inline.ruler.before('emphasis', this.tag, (state, silent) => {
        const startPos = state.pos;
        const maxPos = state.posMax;

        const regex = new RegExp(`\\[${this.tag}:([a-zA-Z0-9-_\\.]+)\\]`);
        const match = state.src.slice(startPos, maxPos).match(regex);

        if (!match) return false; // No match found

        const id = match[1]; // Extract the id from the markdown tag
        const link = `${this.url}#${id}`; // Generate the link to the section

        if (silent) return true; // Validate without modifying state

        const token = state.push(`${this.tag}_details`, '', 0);
        token.tag = this.tag;
        token.id = id;
        token.link = link;

        // Fetch the content from the cached HTML
        token.content = this.extract(id);

        state.pos += match[0].length; // Move the parser position forward
        return true;
      });

      // Renderer to output HTML for the matched tag
      md.renderer.rules[`${this.tag}_details`] = (tokens, id) => {
        const token = tokens[id];
        return `
          <details>
            <summary>${token.tag}: ${token.id}</summary>
            <blockquote cite="${token.link}">
              ${token.content} <!-- Insert the section content here -->
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
}
