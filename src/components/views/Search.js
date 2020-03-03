const SearchPath = require("../SearchPath");

const Search = function (data) {
  return `
    <div class="container">
    <div class="row"><br/></div>
      <div class="row no-gutters align-items-center">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="input-group mb-3" *ngIf="currentParam">
            <input id="text-to-search" type="text" class="form-control form-control-lg"
                   [attr.aria-label]="${data.search.searchText}" [attr.placeholder]="${data.search.searchText}"
                   (keyup.enter)="goSearch()" (keyup)="checkSearchText()">
            <div class="input-group-append">
              <button id="search-text" [disabled]="isSearching || !currentParam.searchText || invalidSearchText" [innerHTML]="searchLabelStr"
                      (click)="goSearch()" class="btn btn-secondary btn-lg" type="submit">${data.search.searchText}</button>
<!--              <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split btn-lg"-->
<!--                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">-->
<!--                <span class="sr-only">Toggle Search Type</span>-->
<!--              </button>-->
<!--              <div class="dropdown-menu">-->
<!--                <button *ngFor="let rType of availableRecordTypes" class="dropdown-item" (click)="setRecordType(rType)"-->
<!--                        [innerHTML]="getSearchRecordTypeLabel(rType)"></button>-->
<!--              </div>-->
            </div>
          </div>
          <div>${currentFilters(data)}</div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  `;
};


function currentFilters(data) {
  if( data.main.currentSearch ) {
    let html = '<ul class="list-group list-group-horizontal">';
    for( let field in data.main.currentSearch ) {
      const removeLink = SearchPath.toURI(data.main.currentSearch, { [field]: null });
      html += `<li class="facetFilter">${data.main.currentSearch[field]} <a href="${removeLink}">x</a></li>\n`;
    }
    html += '</ul>';
    return html;
  }
}


module.exports = Search;