import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

/**
 * The WCAG plugin adds a new markdown tag which can render sections of WCAG.
 * For example, the `[wcag:status-messages]` markdown can render the `status-messages` section.
 */
export class WcagPlugin {
  /**
   * Internal constructor to initialize with tag, url, html.
   * @param {string} tag - The tag used in markdown, e.g. `wcag`
   * @param {string} url - The URL to fetch content from, e.g. `https://www.w3.org/TR/WCAG22/`
   * @param {string} html - The fetched HTML content.
   */
  constructor(tag, url, html) {
    this.tag = tag;
    this.url = url;
    this.html = html;

    // Initialize cheerio once for the HTML content
    this.$ = cheerio.load(this.html);
  }

  /**
   * Initializes the plugin by fetching the HTML and creating the plugin.
   * @param {string} tag - The tag used in markdown, e.g. `wcag`
   * @param {string} url - The URL to fetch content from, e.g. `https://www.w3.org/TR/WCAG22/`
   * @returns {Promise<function>} - Returns a function to be used as a markdown-it plugin.
   */
  static async init(tag, url) {
    const html = await WcagPlugin.get(url);
    const plugin = new WcagPlugin(tag, url, html);
    return plugin.create();
  }

  /**
   * Retrieves HTML content from the given URL using node-fetch and parses it with cheerio.
   * @param {string} url - The URL to fetch the content from.
   * @returns {Promise<string>} - The HTML content of the URL.
   */
  static async get(url) {
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
   * Extracts the specific section of HTML based on the given id, removes the header-wrapper within that section, 
   * and ensures all anchors have `target="_blank"` with relative links updated to full URLs.
   * @param {string} id - The ID of the section to extract from the fetched HTML.
   * @returns {string} - The outer HTML of the section or an error message if not found.
   */
  extract(id) {
    // Find the section by its ID
    const section = this.$(`#${id}`);

    // If the section exists, remove the header-wrapper from within it
    if (section.length > 0) {
      // Remove .header-wrapper, .doclinks and .conformance-level
      section.find('.header-wrapper').remove();
      section.find('.doclinks').remove();
      section.find('.conformance-level').remove();

      // Update all anchor links to include target="_blank", and handle relative links
      section.find('a').each((_, anchor) => {
        const href = this.$(anchor).attr('href');
        
        // If the anchor has a href attribute, add target="_blank"
        if (href) {
          this.$(anchor).attr('target', '_blank'); // Add target="_blank"

          // Check if href starts with a valid protocol (e.g., https://)
          if (!/^[\w]+:\/\//.test(href)) {
            // Replace relative URL with full URL
            const fullUrl = new URL(href, this.url).href;
            this.$(anchor).attr('href', fullUrl);
          }
        }
      });

      // Return the modified HTML of the section
      return section.html();
    } else {
      return `<p>Section not found: ${id}</p>`;
    }
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

        // Fetch the content from the cached HTML and remove the header-wrapper inside the section
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
