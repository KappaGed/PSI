module.exports = app => {
    const cart = require("../controllers/cart.controller");
    var router = require("express").Router();

    // Get user's cart
    router.get('/:userId/cart', cart.getCart);

    // Add item to user's cart
    router.post('/:userId/cart', cart.addToCart);

    router.delete('/:userId/cart/:gameId', cart.removeFromCart);

    router.delete('/:userId/cart', cart.emptyCart);

    router.get('/:userId/cart/:gameId', cart.findGameInCart);

    // Update item in user's cart
    //router.put('/:id/cart/:itemId', cart.updateCartItem);

    // Remove item from user's cart
    // router.delete('/:id/cart/:itemId', cart.deleteCartItem);

    app.use("/api/users", router);
}
