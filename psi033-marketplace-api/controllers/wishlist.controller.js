const Game = require('../models/game.model');
const User = require('../models/user.model');

// Get user's wishlist
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.wishlist);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.addToWishlist = async (req, res) => {
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

        // Check if the game is already in the wishlist
        if (user.wishlist.some(wishlistGame => wishlistGame._id.equals(game._id))) {
            return res.status(400).json({ message: 'Game already in wishlist' });
        }

        // Add the game to the wishlist
        user.wishlist.push(game);
        await user.save();

        return res.status(200).json({ message: 'Game added to wishlist' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

exports.isOnWishlist = async (req, res) => {
    const { userId, gameId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: `User with id ${userId} not found` });
        }
        const isOnWishlist = user.wishlist.some(game => game._id.toString() === gameId);
        return res.status(200).json({ isOnWishlist });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while checking the wishlist' });
    }
};

exports.emptyWislist = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: `User with id ${userId} not found` });
        }
        user.wishlist = [];
        await user.save();
        return res.status(200).json({ message: 'Wishlist cleared successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while emptying the wishlist' });
    }
};