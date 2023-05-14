import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Game } from '../game';

import { CartService } from '../cart.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  user: User | null = null;
  cart: Game[] = [];
  cartItems: { game: Game, quantity: number }[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const userId = localStorage.getItem('loggedInUser');
    if (userId) {
      this.userService.getById(userId).subscribe(user => {
        this.user = user;
        this.getCart();
        console.log(user);
      });
    }
  }

  getCart(): void {
    if (!this.user) {
      console.log('User not defined');
      return;
    }
    this.cartService.getCart(this.user._id).subscribe(
      response => {
        this.cart = response;
        console.log('Cart retrieved:', this.cart);
        this.getCartItems();
        this.getTotalPrice();
      },
      error => {
        console.error('Error retrieving cart:', error);
      }
    );
  }

  getCartItems(): void {
    const cartItemsMap = new Map<string, { game: Game, quantity: number }>();
    console.log(this.cart)
    if (this.cart && this.cart.length > 0) {
      for (const cartItem of this.cart) {
        const key = cartItem._id;
        if (cartItemsMap.has(key)) {
          const item = cartItemsMap.get(key);
          if (item) {
            item.quantity += 1;
          }
        } else {
          cartItemsMap.set(key, { game: cartItem, quantity: 1 });
        }
      }
      this.cartItems = Array.from(cartItemsMap.values());
      console.log('cartItems', this.cartItems)
    } else {
      this.cartItems = [];
    }
  }

  getTotalPrice(): number {
    this.totalPrice = 0;
    for (let game of this.cartItems) {
      console.log("game price", game.game.price, game.quantity)
      this.totalPrice += game.game.price * game.quantity;
    }
    return this.totalPrice;
  }

  incrementQuantity(game: Game): void {
    if (!this.user) {
      console.log('User not defined');
      return;
    }

    this.cartService.addToCart(this.user._id, game).subscribe(response => {
      console.log('Game added successfully:', response);
      this.cart = response;
      this.getCart();
    },
      error => {
        console.error('Error adding game:', error);
      }
    );
  }

  decrementQuantity(game: Game): void {
    if (!this.user) {
      console.log('User not defined');
      return;
    }

    this.cartService.removeFromCart(this.user._id, game).subscribe(response => {
      console.log('Game deleted successfully:', response);
      this.cart = response;
      this.getCart();
    },
      error => {
        console.error('Error deleting game:', error);
      }
    );
  }

  emptyCart(): void {
    if (!this.user) {
      console.log('User not defined');
      return;
    }

    this.cartService.emptyCart(this.user._id).subscribe(
      response => {
        console.log('Cart emptied successfully:', response);
        // clear the local cart and cartItems arrays
        this.cart = [];
        this.cartItems = [];
        // reset the total price
        this.totalPrice = 0;
        // get the updated cart
        this.getCart();
      },
      error => {
        console.error('Error emptying cart:', error);
      }
    );
  }
}
