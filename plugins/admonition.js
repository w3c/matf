import { Plugin } from './plugin.js';
import markdownit from 'markdown-it';

/**
 * The AdmonitionPlugin plugin adds a new markdown tag to render an Admonition.
 * 
 * For example:
 * - `[tag:markdown]` renders an Admonition for the given markdown 
 * - `[tag1:markdown]` renders an Admonition with the number 1 for the given markdown
 */
export class AdmonitionPlugin extends Plugin {
  constructor(tag) {
    super(tag);
    this.md = markdownit({ 
      html: true 
    })
  }

  /**
   * Defines the regex for matching `[tag<number?>:<markdown>]`.
   * @returns {RegExp} - The regex for matching the admonition syntax.
   */
  regex() {
    return new RegExp(`\\[${this.tag}(\\d*):(.*)\\]`);
  }

  /**
   * Processes the matched content and populates the token with raw markdown.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    // Extract the number, if available
    token.number = match[1] ? parseInt(match[1], 10) : null;
     // Extract the markdown content
    token.content = match[2].trim();
  }

  /**
   * Renders the token into HTML by converting markdown to HTML for the content.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    // Use markdown-it to render the content into HTML
    const html = this.md.render(token.content);
    return this.content(html, token.number);
  }

  /**
   * Renders the content for the type of admonition.
   * @param {string} html - The pre-rendered HTML string.
   * @param {number|null} number - An optional number specifying the index.
   * @returns {string} - The rendered content, embedded the HTML string.
   */
  content(html, number) {
    throw new Error(`Subclass ${this.name} must implement 'content()'`);
  }
}
