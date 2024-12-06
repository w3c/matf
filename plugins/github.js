import { Plugin } from './plugin.js';

/**
 * The GithubPlugin adds a new markdown tag to render GitHub issues.
 * For example, the `[issue:71]` markdown will render issue #71 as a note with a link.
 */
export class GithubPlugin extends Plugin {
  constructor(url) {
    super('issue');
    this.url = url;
  }

  /**
   * Initializes the plugin with the specified GitHub repository URL.
   * @param {string} url - The GitHub repository URL (e.g., `https://github.com/w3c/matf`).
   * @returns {Promise<{function}>} - An initialized `GithubPlugin` function.
   */
  static async init(url) {
    return new GithubPlugin(url).plugin();
  }

  /**
   * Defines the regex for matching `[issue:<number>]`.
   * @returns {RegExp} - The regex for matching the issue syntax.
   */
  regex() {
    return /^\[issue:(\d+)\]/;
  }

  /**
   * Populates the token with issue number and link.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    const number = match[1];

    token.number = number;
    token.link = `${this.url}/issues/${number}`;
  }

  /**
   * Renders the token as a Note with a link to the issue on Github.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    return `
      <div class="note" title="Work In Progress">
        <p>
          <a href="${token.link}" target="_blank">
            Read issue #${token.number} on GitHub
          </a>
        </p>
      </div>
    `;
  }
}
