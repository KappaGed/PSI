import { Component, Input } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  searchTerm!: string;
  searchResults!: User[];

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['q'];
      console.log("search term: " + this.searchTerm);
      this.userService.searchUsers(this.searchTerm).subscribe((results: User[]) => {
        this.searchResults = results;
      });
    });
  }
}
