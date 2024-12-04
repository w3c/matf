/**
 * The GithubPlugin adds a new markdown tag which can render GitHub issues.
 * For example, the `[issue:71]` markdown can render issue #71 as a link.
 */
export class GithubPlugin {
  /**
   * Initializes the plugin with the given repository URL.
   * @param {string} repoUrl - The GitHub repository URL, e.g., `https://github.com/w3c/matf`.
   * @returns {function} - A markdown-it plugin function.
   */
  static init(repoUrl) {
    return (md) => {
      md.inline.ruler.before('emphasis', 'issue', (state, silent) => {
        const regex = new RegExp(`\\[issue:(\\d+)\\]`);
        const match = state.src.slice(state.pos, state.posMax).match(regex);

        if (!match) return false; // No match found
        if (silent) return true; // Validate without modifying state

        const issue = state.push('github_issue', '', 0);
        issue.number = match[1]; // Extract the issue number
        issue.link = `${repoUrl}/issues/${issue.number}`; // Generate link to the issue

        state.pos += match[0].length; // Move the parser position forward
        return true;
      });

      // Renderer to output HTML for the matched tag
      md.renderer.rules['github_issue'] = (tokens, id) => {
        const issue = tokens[id];
        return `
          <div class="note" title="Work In Progress">
            <a href="${issue.link}" target="_blank">
              Read issue #${issue.number} on Github
            </a>
          </div>
        `;
      };
    };
  }
}
