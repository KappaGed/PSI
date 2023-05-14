import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { GameService } from '../game.service';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent implements OnInit {
  user!: User | null;
  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private gameService: GameService,
    private cartService: CartService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getGame();
    const userId = localStorage.getItem('loggedInUser');
    if (userId) {
      this.userService.getById(userId).subscribe(user => {
        this.user = user;
        console.log(user);
      });
    }
  }

  getGame(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.gameService.getGame(id)
        .subscribe(game => this.game = game);
    }
  }

  goBack(): void {
    this.location.back();
  }

  addWishlist(): void {

  }

  addToCart(): void {
    if (this.game && this.user) {
      this.cartService.addToCart(this.user._id, this.game).subscribe(() => {
        this.router.navigate(['/cart']); // navigate to the cart page
      });
    }
  }

  public hasLink(): boolean {
    if (this.game && this.game.videoLink) {
      return !!this.game.videoLink && this.game.videoLink !== '';
    }
    return false;
  }

  getStarRating(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = Math.round(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;
    return Array(fullStars).fill(1).concat(Array(halfStars).fill(0.5)).concat(Array(emptyStars).fill(0));
  }


}
