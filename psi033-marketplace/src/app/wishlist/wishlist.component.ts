import { Component, OnInit } from '@angular/core';
import { Game } from '../game';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { User } from '../user';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  wishlist: Game[] = [];
  user: User | null = null;

  constructor(
    private userService: UserService,
    private wishlistService: WishlistService,
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('loggedInUser');
    if (userId) {
      this.userService.getById(userId).subscribe(user => {
        this.user = user;
        this.getWishlist();
        console.log(user);
      });
    }
  }

  getWishlist(): void {
    if (!this.user) {
      console.log('User not defined');
      return;
    }

    this.wishlistService.getWishlist(this.user._id).subscribe(
      response => {
        this.wishlist = response;
        console.log('Wishlist retrieved:', this.wishlist);
      },
      error => {
        console.error('Error retrieving cart:', error);
      }
    );
  }

  removeGameFromWishlist(_t5: Game) {
    throw new Error('Method not implemented.');
  }
}
