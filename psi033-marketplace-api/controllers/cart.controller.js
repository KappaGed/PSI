const User = require('../models/user.model');
const Game = require('../models/game.model');

// Get user's cart
exports.getCart = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('cart');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
};




// Add item to user's cart
exports.addToCart = async (req, res) => {
    try {
        const { game_id } = req.body;
        const { userId } = req.params;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const game = await Game.findById(game_id);
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        // Check if the cart exists for the user
        if (!user.cart) {
            // If the cart doesn't exist, initialize it as an empty array
            user.cart = [];
        }
        // Add the game to the cart
        user.cart.push(game);
        await user.save();

        return res.status(200).json({ message: 'Game added to cart' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.emptyCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: `User with id ${userId} not found` });
        }
        user.cart = [];
        await user.save();
        return res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while emptying the cart' });
    }
};



