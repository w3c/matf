import { Plugin } from './plugin.js';
import markdownit from 'markdown-it';

/**
 * The AdmonitionPlugin plugin adds a new markdown tag to render an Admonition.
 * 
 * For example, the `[tag:markdown]` markdown will render an Admonition containing the given `markdown`.
 */
export class AdmonitionPlugin extends Plugin {
  constructor(tag) {
    super(tag);
    this.md = markdownit({ 
      html: true 
    })
  }

  /**
   * Defines the regex for matching `[note:<markdown>]`.
   * @returns {RegExp} - The regex for matching the note syntax.
   */
  regex() {
    return new RegExp(`\\[${this.tag}:(.*)\\]`);
  }

  /**
   * Processes the matched content and populates the token with raw markdown.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    token.content = match[1].trim(); // Extract the markdown content from the match
  }

  /**
   * Renders the token into HTML by converting markdown to HTML for the content.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    // Use markdown-it to render the content into HTML
    const html = this.md.render(token.content);
    return this.content(html);
  }

  /**
   * Renders the content for the type of admonition.
   * @param {string} html - The pre-rendered HTML string.
   * @returns {string} - The rendered content, embedded the HTML string.
   */
  content(html) {
    throw new Error(`Subclass ${this.name} must implement 'content()'`);
  }
}
