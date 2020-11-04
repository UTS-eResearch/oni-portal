//  Utility for managing faceted search state


const SearchPath = {

	// Arguments are (search, newSearch) and it returns a URI which can 
	// be put in a link
	//
	// search is an object representing the current filters
	//
	// ie { author: "John Smith" }
	//
	// newSearch is an object representing a change to the state
	//
	// to add a new facet(s): { year: "2013" [, other facets...] }
	//
	// to change an existing facet(s): { author: "Jane Roe" }
	//
	// to clear an existing facet(s): { author: "" }
	//
	// to clear all: pass an empty object for change
	//
	// to keep the current search: pass a falsey value for change


	toURI: function(search, change, start=0, page=1) {
		const searchURI = `/#search/${start}/${page}/`;
		if( change && Object.keys(change).length === 0 ) {
			return searchURI;
		}
		const newSearch = Object.assign({}, search); 
		if( change ) {
			for( let field in change ) {
				if( change[field] ) {
					newSearch[field] = change[field]
				} else {
					delete newSearch[field];
				}
			}
		}		
		const params = Object.keys(newSearch).map((k) => k + '=' + encodeURIComponent(newSearch[k]));
		if( params.length > 0 ) {
			const url = searchURI + params.join('/');
			return url;
		} else {
			return searchURI;
		}
	},

	fromURI: function(defaultStart, defaultPage, query) {
		const splits = query.split('/');
      	const start = splits[0] || defaultStart;
      	const page = splits[1] || defaultPage;
      	const params = splits.slice(2);
      	if( params.length > 0 ) {
      		const search = {};
      		for( let param of params ) {
      			const searchparts = param.split('=');
      			if( searchparts.length === 2 ) {
        			search[searchparts[0]] = decodeURIComponent(searchparts[1]);
        		}
        	}
      		return { start: start, page: page, search: search };
      	} else {
      		return { start: start, page: page, search: {} };
      	}
    }


};

module.exports = SearchPath;