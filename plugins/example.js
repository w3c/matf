import { AdmonitionPlugin } from './admonition.js';

/**
 * The Example plugin adds a new markdown tag to render an Example.
 * 
 * For example, the `[example:markdown]` markdown will render an Example containing the given `markdown`.
 */
export class ExamplePlugin extends AdmonitionPlugin {
  constructor() {
    super('example');
  }

  /**
   * Initializes the ExamplePlugin without any additional setup.
   * @returns {Promise<{function}>} - An initialized `ExamplePlugin` function.
   */
  static async init() {
    return new ExamplePlugin().plugin();
  }

  /**
   * Renders the content for the Example admonition.
   * @param {string} html - The pre-rendered HTML string.
   * @param {number|null} number - An optional number specifying the index.
   * @returns {string} - The rendered content, embedded the HTML string.
   */
  content(html, number) {
    const title = number !== null ? `Example ${number}` : 'Example';
    return `
      <div class="example wcag2mobile">
        <div class="marker">${title}</div>
        ${html}
      </div>
    `;
  }
}
