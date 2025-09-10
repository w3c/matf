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

  content(html) {
    return `
      <div class="example wcag2mobile">
        <div class="marker">Example</div>
        ${html}
      </div>
    `;
  }
}
