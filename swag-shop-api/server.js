require("rootpath")();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const jwt = require("_helpers/jwt");
const errorHandler = require("_helpers/error-handler");
var mongoose = require("mongoose");
var cors = require("cors");
var db = mongoose.connect("mongodb://localhost/swag-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var Product = require("./model/product");
var WishList = require("./model/wishlist");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose.set("useFindAndModify", false);
// use JWT auth to secure the api
app.use(jwt());
// api routes
app.use("/users", require("./users/users.controller"));

//global error handler
app.use(errorHandler);

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

app.get("/product/delete/:id", function(request, response) {
  Product.findByIdAndRemove({ _id: request.params.id }, function(err, product) {
    if (err) response.status(500).send({ error: "Coult not remove product" });
    else response.status(200).send({ message: "OK" });
  });
});

app.get("/product/edit/:id", function(request, response) {
  let id = request.params.id;
  Product.findById(id, function(err, product) {
    if (err) {
      response.status(500).send({ error: "Could not find product" });
    } else response.status(200).send(product);
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
