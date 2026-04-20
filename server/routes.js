
const express = require ('express');
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { Painting, Seller, User } = require('./db');
const verifyJWT = require("./middleware");
const toggleFavouriteInDB = require("./toggleFavouriteInDB");
const getUserFavourites = require("./getUserFavourites");
const getFavouritePaintingsFromDB = require("./getFavouritePaintingsFromDB");
require('dotenv').config();
const JWT_key = process.env.JWT_SECRET;


const router = express.Router(); //

router.use(express.json());
router.use(cors());



router.get('/shop', async (req,res)=>{
    const page = parseInt(req.query.page) || 1;
     const skip = (page - 1) * 20;
    const data =  await Painting.find({}).populate("Artist", "-Email -Username -Password").skip(skip).limit(20);
    res.json(data);

})

router.post("/ListPainting", async (req, res) => {
  try {
    const {
      title: Title,
      width: Width,
      height: Height,
      price: Price,
      date: PostingTime,
      urls: ImageURL,
      objectid: Artist,
      selectedtags: Tags,
    } = req.body;

    await Painting.create({
      Title,
      Width,
      Height,
      Price,
      PostingTime,
      ImageURL,
      Artist,
      Tags,
    });

    res.status(201).json({ message: "Data inserted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post('/SellerSignup', async (req,res)=>{
     try {
    const { FullName, Email, Username, Password, PhoneNumber } = req.body;

    const existingUser = await Seller.findOne({
      $or: [{ Email }, { Username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }
    const newUser = await Seller.create({
      FullName,
      Email,
      Username,
      Password,
      PhoneNumber,
    });

     const token = jwt.sign(
      { id: newUser._id, 
        role: "seller",
        fullName: newUser.FullName
     },
      JWT_key,
      { expiresIn: "7d" }
    );

      res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: newUser._id,
        Email: newUser.Email,
        Username: newUser.Username,
        FullName: newUser.FullName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
})


router.post("/SellerLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAccount = await Seller.findOne({ Email: email?.trim() });

    if (!existingAccount) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const isMatch = password === existingAccount.Password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
  {
    id: existingAccount._id,
    role: "seller",
    fullName: existingAccount.FullName, // <--- include it here
  },
  JWT_key,
  { expiresIn: "7d" }
);

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: existingAccount._id,
        email: existingAccount.Email,
        username: existingAccount.Username,
        fullName: existingAccount.FullName,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/UserSignup", async (req, res) => {
  try {
    const { FullName, Email, Username, Password, PhoneNumber } = req.body;

    const existingUser = await User.findOne({
      $or: [{ Email }, { Username }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or Username already exists",
      });
    }
    const newUser = await User.create({
      FullName,
      Email,
      Username,
      Password,
      PhoneNumber,
    });

     const token = jwt.sign(
      { id: newUser._id, 
        role: "user",
        fullName: newUser.FullName
     },
      JWT_key,
      { expiresIn: "7d" }
    );

      res.status(201).json({
      message: "Account created successfully",
      token,
      user: {
        id: newUser._id,
        Email: newUser.Email,
        Username: newUser.Username,
        FullName: newUser.FullName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/UserLogin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingAccount = await User.findOne({ Email: email?.trim() });

    if (!existingAccount) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const isMatch = password === existingAccount.Password;

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect email or password",
      });
    }

    const token = jwt.sign(
  {
    id: existingAccount._id,
    role: "user",
    fullName: existingAccount.FullName // <--- include it here
  },
  JWT_key,
  { expiresIn: "7d" }
);

    res.status(200).json({
      message: "Login successfully",
      token,
      user: {
        id: existingAccount._id,
        email: existingAccount.Email,
        username: existingAccount.Username,
        fullName: existingAccount.FullName,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/verifyToken", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_key);
    res.status(200).json(decoded);
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
});

router.post("/toggleFavourite", verifyJWT, async (req, res) => {
  try {
    const { listingId } = req.body;
    const userId = req.user.id;

    if (!listingId) {
      return res.status(400).json({
        message: "Listing ID is required",
      });
    }

    const result = await toggleFavouriteInDB(userId, listingId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Toggle favourite error:", error);

    if (
      error.message === "User not found" ||
      error.message === "Listing not found"
    ) {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Server error while updating favourites",
    });
  }
});

router.get("/getFavourites", verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id;

    const favourites = await getUserFavourites(userId);

    return res.status(200).json({
      message: "Favourites fetched successfully",
      favourites,
    });
  } catch (error) {
    console.error("Get favourites error:", error);

    if (error.message === "User not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Server error while fetching favourites",
    });
  }
});


router.get("/getFavouritePaintings", verifyJWT, async (req, res) => {
  try {
    const userId = req.user.id; // because your JWT payload uses "id"

    const paintings = await getFavouritePaintingsFromDB(userId);

    return res.status(200).json({
      message: "Favourite paintings fetched successfully",
      paintings,
    });
  } catch (error) {
    console.error("Get favourite paintings error:", error);

    if (error.message === "User not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    return res.status(500).json({
      message: "Server error while fetching favourite paintings",
    });
  }
});


module.exports = router;