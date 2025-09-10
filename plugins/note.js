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

  content(html) {
    return `
      <div class="note wcag2mobile">
        ${html}
      </div>
    `;
  }
}
