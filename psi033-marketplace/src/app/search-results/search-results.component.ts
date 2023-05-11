import { Component, Input } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  searchTerm!: string;
  searchResults!: User[];
  errorMessage: string = '';

  // pagination
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pagedResults: User[] = [];
  totalPages: number = 0;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      console.log("search term: " + this.searchTerm);
      this.userService.searchUsers(this.searchTerm).subscribe(
        (results: User[]) => {
          this.searchResults = results;
          this.errorMessage = '';
          this.updatePagination(); // Update pagination after receiving search results
          this.updatePagedResults(); // Update paged results after receiving search results
        },
        error => {
          this.errorMessage = error.error.message;
          this.searchResults = [];
        }
      );
    });
  }

  viewProfile(username: string) {
    this.router.navigate(['/profile', username]);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagedResults();
    }
  }

  updatePagedResults() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.pagedResults = this.searchResults.slice(startIndex, endIndex);
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.searchResults.length / this.itemsPerPage);
    this.currentPage = 1; // Reset to the first page when updating the search results
    this.updatePagedResults();
  }

  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }
}
