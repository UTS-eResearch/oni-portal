const Search = function (data) {
  return `
    <div class="search-header">
      <div class="row no-gutters align-items-center h-100">
        <div class="col-md-2"></div>
        <div class="col-md-8">
          <div class="input-group mb-3" *ngIf="currentParam">
            <input [(ngModel)]="currentParam.searchText" type="text" class="form-control form-control-lg"
                   [attr.aria-label]="${data.search.searchText}" [attr.placeholder]="${data.search.searchText}"
                   (keyup.enter)="goSearch()" (keyup)="checkSearchText()">
            <div class="input-group-append">
              <button [disabled]="isSearching || !currentParam.searchText || invalidSearchText" [innerHTML]="searchLabelStr"
                      (click)="goSearch()" class="btn btn-secondary btn-lg" type="submit">${data.search.searchText}</button>
              <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split btn-lg"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span class="sr-only">Toggle Search Type</span>
              </button>
              <div class="dropdown-menu">
                <button *ngFor="let rType of availableRecordTypes" class="dropdown-item" (click)="setRecordType(rType)"
                        [innerHTML]="getSearchRecordTypeLabel(rType)"></button>
              </div>
            </div>
          </div>
          <div *ngIf="searchError" class="alert alert-danger" role="alert">
            ${data.search.error}
          </div>
          <div *ngIf="invalidSearchText" class="alert alert-danger" role="alert">
            ${data.search.invalidSearch}
          </div>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  `;
};
module.exports = Search;