const Game = require("../models/game.model");

const games = [
    {
        _id: "645d5775862e5aedc5ac5664",
        name: "Minecraft",
        type: "Game",
        description: "kill dragon",
        platform: "PC, XBOX, Playstation",
        languages: "English, Portuguese",
        price: 19.99,
        generalRating: 4,
        reviews: [
            "great game",
            "so cool"
        ],
        imageUrl: "https://image.api.playstation.com/vulcan/img/cfn/11307uYG0CXzRuA9aryByTHYrQLFz-HVQ3VVl7aAysxK15HMpqjkAIcC_R5vdfZt52hAXQNHoYhSuoSq_46_MT_tDBcLu49I.png",
        otherImages: [
            "https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/4/28/bjoyslzjb3uxqyg82uz2/minecraft",
            "https://www.global-esports.news/wp-content/webp-express/webp-images/uploads/2022/05/Minecraft-2022-Guide.jpg.webp"
        ],
        videoLink: "https://www.youtube.com/watch?v=MmB9b5njVbA",
    },
    {
        _id: "645dbab85cb76a5f5b170ef6",
        name: "Fortnite",
        type: "Game",
        description: "build t3",
        platform: "PC, XBOX, Playstation",
        languages: "English, Portuguese",
        price: 0,
        generalRating: 3,
        reviews: [
            "very cool house"
        ],
        imageUrl: "https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_Fortnite_Chapter4_Season2.jpg",
        otherImages: [],
        videoLink: "",
    },
    {
        _id: "645dbe0d5cb76a5f5b170fc2",
        name: "Rocket League",
        type: "Game",
        description: "car score goal",
        platform: "PC, XBOX, Playstation",
        languages: "English, Portuguese",
        price: 0,
        generalRating: 2,
        reviews: [
            "very cool car",
            "boost so loud :o"
        ],
        imageUrl: "https://cdn1.epicgames.com/offer/9773aa1aa54f4f7b80e44bef04986cea/EGS_RocketLeague_PsyonixLLC_S3_2560x1440-1434001758900f513cab0c885121744a",
        otherImages: [
            "https://cdn.proactiveinvestors.com/eyJidWNrZXQiOiJwYS1jZG4iLCJrZXkiOiJ1cGxvYWRcL05ld3NcL0ltYWdlXC8yMDIyXzA5XC8yMDIyLTA5LTE1LTA5LTEyLTExLTY5MWEzZjBlNDkzYTVmYTk5YzZjZWRiMmE0NTU1ZDFjLmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0Ijo2MzAsImZpdCI6ImNvdmVyIn19fQ==",
            "https://www.magazine-hd.com/apps/wp/wp-content/uploads/2020/07/rocket-league.jpg"
        ],
        videoLink: "",
    },
    {
        _id: "645fd669c1bae5a8b2fa9a96",
        name: "God of War",
        type: "Game",
        description: "god kill many things",
        platform: "PC, XBOX, Playstation",
        languages: "English",
        price: 49.99,
        generalRating: 4,
        reviews: [
            "wow so strong",
            "talking head very funny"
        ],
        imageUrl: "https://cdn.akamai.steamstatic.com/steam/apps/1593500/capsule_616x353.jpg?t=1650554420",
        otherImages: [
            "https://images.immediate.co.uk/production/volatile/sites/3/2022/11/God-of-War-Ragnarok-PC-9a16340.jpg",
            "https://cdn.mos.cms.futurecdn.net/3u8ViUJsgQFtZtt86ij42Z.jpg"
        ],
        videoLink: "https://www.youtube.com/watch?v=K0u_kAWLJOA",
    },
    {
        _id: "645fd841c1bae5a8b2fa9aa5",
        name: "Hogwarts Legacy",
        type: "Game",
        description: "Magic in school save animals, make friends",
        platform: "PC, XBOX, Playstation",
        languages: "English",
        price: 59.99,
        generalRating: 4,
        reviews: [
            "very magic",
            "i like the cabbages "
        ],
        imageUrl: "https://cdn.cloudflare.steamstatic.com/steam/apps/990080/capsule_616x353.jpg?t=1680647016",
        otherImages: [
            "https://cdn-hogwartslegacy.warnerbrosgames.com/media/launch-trailer.jpg",
            "https://www.gematsu.com/wp-content/uploads/2022/12/Hogwarts-Legacy-Play_12-14-22.jpg"
        ],
        videoLink: "https://www.youtube.com/watch?v=BtyBjOW8sGY",
    },
    {
        _id: "645fdae4c1bae5a8b2fa9afa",
        name: "PES 6",
        type: "Game",
        description: "Soccer Game",
        platform: "PC",
        languages: "English, Portuguese, Spanish",
        price: 120.72,
        generalRating: 5,
        reviews: [
            "ronaldo machine",
            "Liedson is so good :o "
        ],
        imageUrl: "https://www.playnplay.net/wp-content/uploads/2017/01/pro-evolution-soccer-6-ps2.jpg",
        otherImages: [
            "https://www.nme.com/wp-content/uploads/2022/01/Adriano-PES-6.jpg",
            "https://gamefabrique.com/storage/screenshots/xbox360/pro-evolution-soccer-6-04.png"
        ],
        videoLink: "",
    },
    {
        _id: "645fe02ec1bae5a8b2fa9b6b",
        name: "Snake",
        type: "Game",
        description: "The player controls a snake, which roams around on a bordered plane, picking up food. Each time the snake eats a piece of food, its tail grows longer, making the game increasingly difficult.",
        platform: "PC, Android, iPhone",
        languages: "English,",
        price: 0,
        generalRating: 4,
        reviews: [
            "bit my own tail :(",
            "apple is very tasty"
        ],
        imageUrl: "https://im.indiatimes.in/media/content/2018/Aug/snake_game_1533210447.jpg",
        otherImages: [],
        videoLink: "",
    }
];

exports.createDb = async (req, res) => {
    try {
        const db = await Game.insertMany(games);
        res.status(200).json('Data base created successfuly!', db);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

