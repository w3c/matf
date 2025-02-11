var respecConfig = {
	// embed RDFa data in the output
	trace: true,
	doRDFa: '1.1',
	includePermalinks: true,
	permalinkEdge: true,
	permalinkHide: false,
  noRecTrack: true,

	// specification status (e.g., WD, LC, NOTE, etc.). If in doubt use ED.
	specStatus: "ED",
	//crEnd:                "2012-04-30",
	//perEnd:               "2013-07-23",
	//publishDate:          "2024-05-28",
	
	// the specifications short name, as in https://www.w3.org/TR/short-name/
	shortName: "wcag2mobile",
	
	// if you wish the publication date to be other than today, set this
	// publishDate:  "2009-08-06",
	copyrightStart: "2022",
	license: "document",
	
	// if there a publicly available Editors Draft, this is the link
	edDraftURI: "https://w3c.github.io/matf/",
	
	// if this is a LCWD, uncomment and set the end of its review period
	// lcEnd: "2012-02-21",
	
	// editors, add as many as you like
	// only "name" is required
	editors: [ 
    {
      name: "Jan Jaap de Groot",
      mailto: "janjaap@abra.ai",
      company: "Abra",
      companyURI: "https://abra.ai",
      w3cid: 137024
	  },
    {
      name: "Jamie Herrera"
    },
    {
      name: "Joe Humbert"
    },
    {
      name: "Julian Kittelson-Aldred"
    },
    {
      name: "Jon Gibbins"
    }
  ],
	
	// authors, add as many as you like.
	// This is optional, uncomment if you have authors as well as editors.
	// only "name" is required. Same format as editors.
	
	//authors:  [
	//    { name: "Your Name", url: "http://example.org/",
	//      company: "Your Company", companyURI: "http://example.com/" },
	//],
	
	/*
	alternateFormats: [
	{ uri: 'aria-diff.html', label: "Diff from Previous Recommendation" } ,
	{ uri: 'aria.ps', label: "PostScript version" },
	{ uri: 'aria.pdf', label: "PDF version" }
	],
	 */
	
	// errata: 'https://www.w3.org/2010/02/rdfa/errata.html',
	
	group: "ag",
	github: "w3c/matf",
  
  // name (without the @w3.org) of the public mailing to which comments are due
  wgPublicList: "public-mobile-a11y-tf",

	maxTocLevel: 3,

	postProcess: [postRespec],
};
