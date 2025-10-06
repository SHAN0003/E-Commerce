const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const nodemailer = require('nodemailer');

app.use(express.json());
app.use(cors());

// Database connection with mongoDB
mongoose.connect(
  // "mongodb+srv://Shan:Ecommerce003@cluster0.oanda.mongodb.net/e-commerce"
  "mongodb+srv://Shan:Ecommerce003@cluster0.oanda.mongodb.net/e-commerce"
);

// API creation
app.get("/", (req, res) => {
  res.send("Express app is running");
});

// image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// create upload endpoint inmages------------------------------------------------------------------------
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  // Check if the file was uploaded
  if (!req.file) {
    return res.status(400).json({
      success: 0,
      message: "No file uploaded",
    });
  }

  // Respond with success and file URL if the upload was successful
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

//product schema-------------------------------------------------------------------------
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    require: true,
  },

  name: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  new_price: {
    type: Number,
    require: true,
  },
  old_price: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avilable: {
    type: Boolean,
    default: true,
  },
});

//users schema-----------------------------------------------------------------------
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

//creating endpiont for users registretion--------------------------------------------
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      error: "existing user found with same email address",
    });
  }

  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }

  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });

  await user.save();

  //jwt authentication---------------------------------------------------------------------------
  const data = {
    user: {
      id: user.id,
    },
  };

  const token = jwt.sign(data, "secret_ecom");
  res.json({ success: true, token });
});

//creating enpoint for user login-----------------------------------------------------------------
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "Wrong Password" });
    }
  } else {
    res.json({ success: false, errors: "Wrong Email Address" });
  }
});

//Create API for getting all users-------------------------------------------------------
app.get("/signup", async (req, res) => {
  let users = await Users.find({});
  console.log("All Users Fetched");
  res.send(users);
});

//endpoint for add products------------------------------------------------------------
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  } else {
    id = 1;
  }

  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  console.log(product);
  await product.save();
  console.log("saved");

  res.json({
    success: true,
    name: req.body.name,
  });
});

// for deleting product----------------------------------------------------------------
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");

  res.json({
    success: true,
    name: req.body.name,
  });
});

//for deleting user------------------------------------------
app.post("/removeuser", async (req, res) => {
  await Users.findOneAndDelete({ email: req.body.email });
  console.log("Removed");

  res.json({
    success: true,
    name: req.body.email,
  });
});

// Create API for getting all products-----------------------------------------------------
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Product Fetched");
  res.send(products);
});

// creating endpoint for new-collection data-------------------------------------------------
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(1).slice(-8);
  console.log("NewCollections fetched");
  res.send(newcollection);
});

//creating endpoint for popular in women section------------------------------------------------
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_in_women = products.slice(0, 4);
  console.log("Popular in women fetched");
  res.send(popular_in_women);
});

//creating middleware to fetch user---------------------------------------------------------------
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      req.status(401).send({ errors: "Please authenticate using valid token" });
    }
  }
};

//creating endpoint for adding in cartdata---------------------------------------------------
// Add to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  console.log("Added", req.body.itemId);

  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userData.cartData) {
      userData.cartData = {};
    }

    if (!userData.cartData[req.body.itemId]) {
      userData.cartData[req.body.itemId] = 0;
    }

    userData.cartData[req.body.itemId] += 1;

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Added");
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  console.log("Removed", req.body.itemId);

  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!userData.cartData) {
      return res.status(404).json({ error: 'Cart data not found' });
    }

    if (userData.cartData[req.body.itemId] > 0) {
      userData.cartData[req.body.itemId] -= 1;
    }

    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData }
    );
    res.send("Removed");
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get cart data
app.post("/getcart", fetchUser, async (req, res) => {
  console.log("GetCart");

  try {
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userData.cartData || {});
  } catch (error) {
    console.error('Error getting cart data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port " + port);
  } else {
    console.log("Error: " + error);
  }
});
