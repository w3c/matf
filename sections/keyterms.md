## Key Terms

WCAG2Mobile defines key glossary terms to refine the broader scope of WCAG2ICT for mobile applications. It introduces terms that do not exist in WCAG2ICT or WCAG but are important to define for a mobile application context.

“Content” and “user agent” are glossary terms from WCAG2ICT that need to be interpreted significantly differently when applied to mobile applications.

The glossary terms “document” and “software” in WCAG2ICT are replaced with the defined terms “screen” and “view”. The glossary terms “set of web pages”, “set of documents” and “set of software programs” are replaced with the defined term “set of screens”.

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
<dt>changes of context</dt>
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

[note:A change of content is not always a change of context. Changes in content, such as an expanding outline, dynamic menu, or a tab bar control do not necessarily change the context, unless they also change one of the above (e.g., focus).]

[example1:Opening a new application, moving focus to a different component, going to a new page (including anything that would look to a user as if they had moved to a new page), or significantly re-arranging the content of a page are examples of changes of context.]

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

### User agent

The term **user agent**, as used in WCAG2Mobile, has the meaning below:

<dl>
<dt>user agent</dt>
<dd>
(work in progress)
</div>
</dd>
</dl>