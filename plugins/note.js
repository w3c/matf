import { Plugin } from './plugin.js';
import markdownit from 'markdown-it';

/**
 * The Note plugin adds a new markdown tag to render a Note.
 * For example, the `[note:markdown]` markdown will render a Note containing the given `markdown`.
 */
export class NotePlugin extends Plugin {
  constructor() {
    super('note');
    this.md = markdownit({ 
      html: true 
    })
  }

  /**
   * Initializes the NotePlugin without any additional setup.
   * @returns {Promise<{function}>} - An initialized `NotePlugin` function.
   */
  static async init() {
    return new NotePlugin().plugin();
  }

  /**
   * Defines the regex for matching `[note:<markdown>]`.
   * @returns {RegExp} - The regex for matching the note syntax.
   */
  regex() {
    return /\[note:(.*)?\]/;
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
    return `
      <div class="note">
        ${html}
      </div>
    `;
  }
}
