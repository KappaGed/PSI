import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  searchTerm: string = '';
  searchResults: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void { }

  search() {
    console.log('Search button clicked! term ' + this.searchTerm);
    this.userService.searchUsers(this.searchTerm).subscribe((results: User[]) => {
      this.searchResults = results;
      this.router.navigate(['/search'], { queryParams: { term: this.searchTerm }});
    });
  }


}
