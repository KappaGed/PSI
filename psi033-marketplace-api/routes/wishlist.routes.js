module.exports = app => {
    const wishlist = require("../controllers/wishlist.controller");
    var router = require("express").Router();

    // Get user's cart
    router.get('/:userId/wishlist', wishlist.getWishlist);

    // Add item to user's wishlist
    router.post('/:userId/wishlist', wishlist.addToWishlist);

    router.delete('/:userId/wishlist', wishlist.emptyWislist);
    // router.delete('/:userId/cart/:gameId', cart.removeFromCart);

    router.get('/:userId/wishlist/:gameId', wishlist.isOnWishlist);


    // Remove item from user's cart
    // router.delete('/:id/cart/:itemId', cart.deleteCartItem);

    app.use("/api/users", router);
}
