import { Plugin } from './plugin.js';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';

/**
 * The WCAG plugin adds a new markdown tag which can render sections of WCAG.
 * For example, the `[wcag:status-messages]` markdown will render the `status-messages` section.
 */
export class WcagPlugin extends Plugin {
  constructor(tag, url, html) {
    super(tag);
    this.url = url;
    this.html = html;
    this.$ = cheerio.load(html);
  }

  /**
   * Initializes the WcagPlugin by fetching and preparing the HTML content from the provided URL.
   * @param {string} tag - The tag used in markdown (e.g., `wcag` or `wcag2ict`).
   * @param {string} url - The URL to fetch content from (e.g., `https://www.w3.org/TR/WCAG22/`).
   * @returns {Promise<{function}>} - An initialized `WcagPlugin` function.
   */
  static async init(tag, url) {
    const html = await WcagPlugin.fetchHtml(url);
    return new WcagPlugin(tag, url, html).plugin();
  }

  /**
   * Fetches the rendered HTML from the given URL using Puppeteer.
   * @param {string} url - The URL to fetch.
   * @returns {Promise<string>} - The rendered HTML content.
   */
  static async fetchHtml(url) {
    console.log(`Fetching rendered HTML for: ${url}`);
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
      await page.goto(url, { waitUntil: ['load', 'networkidle0'] });
      const html = await page.content();
      await browser.close();
      return html;
    } catch (error) {
      console.error(`Error fetching ${url}:`, error);
      await browser.close();
      return `<p>Error loading content from ${url}</p><p>${error}</p>`;
    }
  }

   /**
   * Defines the regex for matching `[<tag>:<identifier>]`.
   * @returns {RegExp} - The regex for matching the note syntax.
   */
  regex() {
    return new RegExp(`\\[${this.tag}:([a-zA-Z0-9-_\\.]+)\\]`);
  }

  /**
   * Processes the matched content and populates the token with id, link, header and content.
   * @param {Array} match - The regex match result.
   * @param {object} token - The token to populate.
   */
  process(match, token) {
    const id = match[1];
    const section = this.extract(id);

    token.id = id;
    token.link = `${this.url}#${id}`;
    token.header = section.header;
    token.content = section.content;
  }

  /**
   * Renders the token into HTML with an expand/collapse component.
   * @param {object} token - The token to render.
   * @returns {string} - The rendered HTML string.
   */
  render(token) {
    return `
      <details class="wcag">
        <summary>
          <strong>${this.tag.toUpperCase()}:</strong> ${token.header}
        </summary>
        <blockquote cite="${token.link}">
          <div>${token.content}</div>
        </blockquote>
        <footer>
          <cite>
            <a href="${token.link}" target="_blank">${token.link}</a>
          </cite>
        </footer>
      </details>
    `;
  }

  /**
   * Renders the token into HTML by converting markdown to HTML for the content.
   * @param {string} id - The identifier for the section.
   * @returns {object} - An object containing the `header` and `content` of the section.
   */
  extract(id) {
    const $section = this.$(`#${id}`);
    if (!$section.length) {
      throw new Error(`Section not found: ${id}`);
    }

    const header = $section.find('h1, h2, h3, h4, h5, h6').first().text();
    $section.find('.header-wrapper, .doclinks, .conformance-level').remove();
    $section.find('a').each((_, anchor) => {
      const href = this.$(anchor).attr('href');
      if (href) {
        this.$(anchor).attr('target', '_blank');
        if (!/^[\w]+:\/\//.test(href)) {
          const fullUrl = new URL(href, this.url).href;
          this.$(anchor).attr('href', fullUrl);
        }
      }
    });

    return {
      header,
      content: $section.html(),
    };
  }
}
