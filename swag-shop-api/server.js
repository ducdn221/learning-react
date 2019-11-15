var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://localhost/swag-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var Product = require("./model/product");
var WishList = require("./model/wishlist");
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(function (error, req, res, next) {
//     if(error instanceof SyntaxError){ //Handle SyntaxError here.
//       return res.status(500).send({data : "Invalid data"});
//     } else {
//       next();
//     }
//   });

app.post("/product", function(request, response) {
  var product = new Product();
  product.title = request.body.title;
  product.price = request.body.price;

  product.save(function(err, savedProduct) {
    if (err) {
      response.status(500).send({ error: "Could not save product" });
    } else {
      response.send(savedProduct);
    }
  });
});

app.get("/product", function(request, response) {
  Product.find({}, function(err, products) {
    if (err) {
      response.status(500).send({ error: "Could not fetching product" });
    } else {
      // response.send(response);
      response.status(200).send(products);
    }
  });
});

app.get("/wishlist", function(request, response) {
  //   WishList.find({}, function(err, wishList) {
  //     if (err) {
  //       response.status(500).send({ error: "Could not fetching wishlist" });
  //     } else {
  //       response.send(wishList);
  //     }
  //   });
  WishList.find({})
    .populate({ path: "products", model: "Product" })
    .exec(function(err, wishLists) {
      if (err) {
        response.status(500).send({ error: "Could not fetching wishlist" });
      } else {
        response.send(wishLists);
      }
    });
});

app.post("/wishlist", function(request, response) {
  var wishList = new WishList();
  wishList.title = request.body.title;

  wishList.save(function(err, newWishList) {
    if (err) {
      response.status(500).send({ error: "Could not create wishlist" });
    } else {
      response.send(newWishList);
    }
  });
});

app.put("/wishlist/product/add", function(request, response) {
  Product.findOne({ _id: request.body.productId }, function(err, product) {
    if (err) {
      response.status(500).send({ error: "Could not add item to wish list" });
    } else {
      WishList.update(
        { _id: request.body.wishListId },
        { $addToSet: { products: product._id } },
        function(err, wishList) {
          if (err) {
            response
              .status(500)
              .send({ error: "Could not add item to wish list" });
          } else {
            response.send(wishList);
          }
        }
      );
    }
  });
});

app.listen(3004, function() {
  console.log("Swag Shop API running on port 3004...");
});
