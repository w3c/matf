import { AdmonitionPlugin } from './admonition.js';

/**
 * The Note plugin adds a new markdown tag to render a Note.
 * 
 * For example, the `[note:markdown]` markdown will render a Note containing the given `markdown`.
 */
export class NotePlugin extends AdmonitionPlugin {
  constructor() {
    super('note');
  }

  /**
   * Initializes the NotePlugin without any additional setup.
   * @returns {Promise<{function}>} - An initialized `NotePlugin` function.
   */
  static async init() {
    return new NotePlugin().plugin();
  }

  /**
   * Renders the content for the Note admonition.
   * @param {string} html - The pre-rendered HTML string.
   * @param {number|null} number - An optional number specifying the index.
   * @returns {string} - The rendered content, embedded the HTML string.
   */
  content(html, number) {
    // TODO: Show number in title of note
    return `
      <div class="note wcag2mobile">
        ${html}
      </div>
    `;
  }
}
