/**
 * Plugin: A base class with shared logic for custom markdown-it plugins.
 */
export class Plugin {
  constructor(tag) {
    this.tag = tag;
  }

  /**
   * Initializes the plugin with any required setup.
   * Subclasses should override this method to return a fully initialized plugin.
   * @param {...*} args - Arguments required to initialize the plugin.
   * @returns {Promise<Plugin>} - A promise resolving to an initialized plugin instance.
   */
  static async init(...args) {
    throw new Error(`Subclass ${this.name} must implement 'async static init(... args)'`);
  }

  /**
   * Returns the markdown-it plugin function.
   * @returns {function} - A markdown-it plugin function.
   */
  plugin() {
    return (md) => {
      // Register the parsing rule for the tag
      md.inline.ruler.before('emphasis', this.tag, (state, silent) => {
        const regex = this.regex();
        const match = state.src.slice(state.pos, state.posMax).match(regex);

        if (!match) return false; // No match found
        if (silent) return true; // Validate without modifying state

        const token = state.push(`${this.tag}_details`, '', 0);
        this.process(match, token);

        state.pos += match[0].length; // Move the parser position forward
        return true;
      });

      // Register the rendering rule for the tag
      md.renderer.rules[`${this.tag}_details`] = (tokens, idx) => {
        const token = tokens[idx];
        return this.render(token);
      };
    };
  }

  /**
   * Returns the regex for matching the tag.
   * Subclasses should override this method.
   * @returns {RegExp} - The regex for matching the tag.
   */
  regex() {
    throw new Error(`Subclass ${this.name} must implement 'regex()'`);
  }

  /**
   * Processes the regex match and populates the token with data.
   * Subclasses should override this method.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    throw new Error(`Subclass ${this.name} must implement 'process(match, token)'`);
  }

  /**
   * Renders the token to HTML.
   * Subclasses should override this method.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    throw new Error(`Subclass ${this.name} must implement 'render(token)'`);
  }
}
