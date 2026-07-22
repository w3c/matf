## Key Terms

WCAG2Mobile defines key glossary terms to refine the broader scope for mobile applications. It introduces terms that do not exist in WCAG2ICT or WCAG but are important to define for a mobile application context.

“[Content](#content)” and “[user agent](#user-agent)” are glossary terms from WCAG 2 that need to be interpreted significantly differently when applied to mobile applications. Similar to WCAG2ICT, the term “user agent” has a more limited meaning when applied to mobile apps. WCAG 2 assumes content is presented by a separate user agent, typically a web browser, which also exposes the content to assistive technologies. Mobile apps present their own content, and assistive technologies obtain programmatic information through the accessibility services of the platform software. In WCAG2Mobile, “user agent” therefore refers only to separate software that retrieves and presents web content, such as a mobile web browser; web content presented within an app through an embedded web view is treated as software. Where success criteria refer to functionality provided by the user agent, in mobile apps that functionality is typically provided by the platform software; in those cases the guidance reads “user agent” as “user agent or platform software”.

The software layers involved in mobile apps are shown in [Figure 1](#figure1). The lowest layer is the “underlying layer”, consisting of the device hardware. The [platform software](#platform-software)⁠ operates on the underlying layer and provides services used by [software⁠](#software) running on the device, including the accessibility interface. Software includes native apps, cross-platform apps, apps containing embedded web views, and separate user agents such as mobile web browsers. Software presents content and exposes semantic information through the accessibility interface, which assistive technologies use to obtain that information and perform user actions. Users interact with content either directly or through assistive technologies.

<div class="figure">
  <figure id="figure1">
    <img
      src="layers.svg"
      alt="Diagram: six software layers connecting a user to a mobile app, with each layer's blocks coloured by who is responsible for them."
      aria-details="layers-desc" />
    <figcaption>
      Software layers and accessibility responsibility in mobile apps.
    </figcaption>
  </figure>

  <details id="layers-desc">
    <summary>Description of Figure 1</summary>
    <p>
      A top-to-bottom stack of six layers involved when a person interacts with an application.
      Each layer contains one or more blocks, and every block is coloured to show who is responsible for it: author, vendor, assistive technology vendor, or out of scope. 
      Arrows between the layers show that information flows both up and down the stack.
    </p>
    <p>
    From top to bottom:
    </p>
    <dl>
      <div>
        <dt>1. User</dt>
        <dd>
          <dl>
            <div><dt>Person</dt><dd>Out of scope.</dd></div>
          </dl>
        </dd>
      </div>
      <div>
        <dt>2. Assistive technology</dt>
        <dd>
          <dl>
            <div><dt>Assistive software</dt><dd>Assistive technology vendor.</dd></div>
            <div><dt>Assistive hardware</dt><dd>Assistive technology vendor.</dd></div>
          </dl>
        </dd>
      </div>
      <div>
        <dt>3. Content</dt>
        <dd>
          <dl>
            <div><dt>Structure</dt><dd>Author.</dd></div>
            <div><dt>Presentation</dt><dd>Author.</dd></div>
            <div><dt>Interaction</dt><dd>Author.</dd></div>
          </dl>
        </dd>
      </div>
      <div>
        <dt>4. Software (“the app”) or User Agent</dt>
        <dd>
          <dl>
            <div><dt>Native program</dt><dd>Author.</dd></div>
            <div><dt>Cross-platform program</dt><dd>Author.</dd></div>
            <div><dt>Embedded web view</dt><dd>Author.</dd></div>
            <div><dt>Browser</dt><dd>Vendor.</dd></div>
          </dl>
          <p>The embedded web view and browser together form the User Agent.</p>
        </dd>
      </div>
      <div>
        <dt>5. Platform software</dt>
        <dd>
          <dl>
            <div><dt>Operating system</dt><dd>Vendor.</dd></div>
          </dl>
        </dd>
      </div>
      <div>
        <dt>6. “Underlying layer”</dt>
        <dd>
          <dl>
            <div><dt>Device</dt><dd>Out of scope.</dd></div>
          </dl>
        </dd>
      </div>
    </dl>
  </details>
</div>

Accessibility responsibilities correspond to these software layers. Authors are responsible for the accessibility of the content and software they provide, including native apps, cross-platform apps, and apps containing embedded web views. Platform vendors are responsible for accessibility functionality provided by the platform software, including accessibility services and unmodified platform software components. User agent vendors are responsible for functionality provided by separate user agents, such as mobile web browsers. Assistive technology vendors are responsible for the accessibility of assistive technologies.

The glossary terms “document” and “software” of WCAG2ICT are replaced with the defined term “[page](#page)”. The glossary terms “set of web pages”, “set of documents” and “set of software programs” are replaced with the defined term “[set of pages](#set-of-pages)”.

The term “accessibility services of platform software”, introduced by WCAG2ICT, has been modified to reflect its different use in mobile applications. Additionally, “closed functionality” has a different meaning in the context of mobile applications.

The remaining glossary terms from WCAG2ICT and WCAG 2 are addressed in [WCAG2ICT: Comments on Definitions in WCAG 2 Glossary](https://www.w3.org/TR/wcag2ict-22/#comments-on-definitions-in-wcag-2-glossary).

Terms defined and used in WCAG2Mobile are applicable only to the interpretation of the guidance in this document. The particular definitions should not be interpreted as having applicability to situations beyond the scope of WCAG2Mobile. Further information on usage of these terms follows.

[note:**Work in Progress**. See [Issues labeled as 'definition' on GitHub](https://github.com/w3c/matf/issues?q=is%3Aissue%20state%3Aopen%20label%3Adefinition).]

### Content

The term **content**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>content</dt>
<dd>
(work in progress)
</div>
</dd>
</dl>

### Change of context

The term **change of context**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>change of context</dt>
<dd>
Changes of context are major changes that, if made without user awareness, can disorient users who are not able to view the entire page simultaneously.
Changes in context include changes of:

- application;
- [user agent](#user-agent);
- viewport;
- focus;
- [content](#content) that changes the meaning of the page.
</dd>
</dl>

[note1:A change of content is not always a change of context. Changes in content, such as an expanding outline, dynamic menu, or a tab bar control do not necessarily change the context, unless they also change one of the above (e.g., focus).]

[example1:Opening a new application, moving focus to a different component, going to a new page (including anything that would look to a user as if they had moved to a new page), or significantly re-arranging the content of a page are examples of changes of context.]

### Keyboard interface

The term **keyboard interface**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>keyboard interface</dt>
<dd>
Interface used by software to obtain keystroke input.
</dd>
</dl>

[note1:A keyboard interface allows users to provide keystroke input to programs even if the native technology does not contain a keyboard.]

[example1:A touchscreen device has an on-screen-keyboard (OSK) interface built into its operating system as well as a way to connect external keyboards. Applications can use the interface to obtain keystroke input either from the OSK, from an external keyboard or from other applications that provide simulated keyboard output, such as handwriting interpreters or speech-to-text applications with "keyboard emulation" functionality.]

[note2:Using the keyboard, or a virtual keyboard, to replicate mouse input does not qualify as a keyboard interface.]

[note3:For the purposes of mobile software, references to a keyboard interface include the “accessibility interface”. The accessibility interface is used by assistive technologies to obtain semantic information about content and interact with mobile applications. Although it provides broader capabilities than a keyboard interface, it fulfils the same purpose as a keyboard interface where it enables keyboard-equivalent operation.]

### Page

The term **page**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>page</dt>
<dd>
A page is a distinct part of a mobile application that presents specific content or functionality and is rendered together with its associated resources. Users navigate between pages to complete actions or access different features.
</dd>
</dl>

[note:Interface elements that rely on the underlying page for context (such as dialogs, modals, navigation menus, and similar components) are typically considered part of that page rather than standalone pages. However, interface elements that significantly change the majority of screen content or function as independent navigational destinations may be considered separate pages.]

[example1:A native banking app's account overview screen that displays account balances, recent transactions and interactive charts. The screen includes native components for all interface elements, all rendered together as a single interface.]

[example2:A mobile web banking app's account overview page that displays account balances, recent transactions and interactive charts. The page includes web components for all interface elements, all rendered together in the mobile browser.]

[example3:A hybrid banking app's account overview screen that displays account balances, recent transactions and interactive charts. The screen includes native components for account balances and recent transactions, plus web components for interactive charts, all rendered together as a unified interface.]

### Platform software

The term **platform software**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>platform software</dt>
<dd>
Software that runs on an underlying software or hardware layer and that provides a set of software services to other software components.
</dd>
</dl>

[note1:The platform software is typically the operating system of the mobile device together with its system user interface and the documented accessibility services that mobile apps use.]

[note2:[User interface components](#user-interface-component) whose rendering is performed by platform software are considered platform software. This includes native user interface components provided by the operating system. Components whose rendering is performed by application-level rendering logic, including bundled frameworks, libraries, design systems, or custom components, are [software](#software) rather than platform software.]

### Set of pages

The term **Set of pages**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>set of pages</dt>
<dd>
Any collection of <a href="page">pages</a> within a single mobile app that share a common purpose through their structure and interaction, which are employed within a software program to meet specific needs.

Reusable page templates are the typical method that mobile apps use to enforce consistency and create a set of pages.
</dd>
</dl>

[example1:An e-commerce app shows products in a set of pages that all share the same navigation and present information in the same way. When progressing to the checkout process, the template changes: the navigation is removed, the content replaced with inputs to enter or select information, and buttons to move through the process. The set of pages used in the checkout process distinct from the set of pages used to show products.]

[example2:The settings of a mobile app. These pages are typically designed to be outside of the behavior of the rest of the software program itself and usually have a completely different display template without banner ads, or the primary navigation, which is more optimized to view and change a large set of control inputs.]

### Software

The term **software**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>software</dt>
<dd>
Software products, or software aspects of hardware-software products, that have a user interface and do not depend upon a separate user agent to present any of their content.
</div>
</dd>
</dl>

[note1:On mobile devices, software is typically the mobile app itself, whether built using native or cross-platform frameworks. The mobile app is responsible for presenting its content and user interface to users.]

[note2:Web content presented through an embedded web view is treated as software. Although the embedded web view may rely on platform-provided browser technology to render the content, it is treated as software rather than a separate user agent because the content is presented within the mobile app. The mobile app author remains responsible for its accessibility.]

### User agent

The term **user agent**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>user agent</dt>
<dd>
Any software that retrieves and presents web content for users.
</div>
</dd>
</dl>

[note1:In WCAG2Mobile the term user agent is limited to software that presents web content to the user, e.g. a separate user agent, such as a web browser. Software that only presents the content contained within it is treated as software rather than as a separate user agent. Everything else, such as the native user interface, and web content the app itself hosts, including web views, are covered by the term “software”.]

[note2:When an application presents web content through an embedded web view (e.g. <code>WebView</code> on Android or <code>WKWebView</code> on iOS), the embedded web view is treated as software because the content is presented within the application rather than by a separate user agent. Although it may rely on platform-provided browser technology to render the content, the application author remains responsible for its accessibility.]

### User interface component

The term **user interface component**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>user interface component</dt>
<dd>
A part of the <a href="#content">content</a> that is perceived by users as a single control for a distinct function.
</dd>
</dl>

[note1:Multiple user interface components may be implemented as a single programmatic element. "Components" here is not tied to programming techniques, but rather to what the user perceives as separate controls.]

[note2:User interface components include form elements, buttons, and links as well as components generated by code.]

[note3:What is meant by "component" or "user interface component" here is also sometimes called "user interface element".]

[example1: A carousel is a container that could have three distinct user interface controls. A "pause" button to prevent automatic scrolling, and a "next" and "previous" button for manual navigation. Each of these three are be considered separate and unique elements.]
