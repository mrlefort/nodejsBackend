/**
 * Created by Dino on 10/27/2016.
 */
var express = require('express');
var router = express.Router();
var facade = require("../JS/DataBaseFacade.js");
var bcrypt = require('bcryptjs');


//Deletes a CoffeeBrand by ID -- Works
router.delete("/brand/:CoffeeBrandID", function (req, res) {
    if (req.decoded.data.roleId === 1) {
        console.log("param: " + req.params.CoffeeBrandID)
        facade.deleteCoffeeBrand(req.params.CoffeeBrandID, function (status) {

            if (status !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.status(200).send();
            }
            else {
                res.status(500).send();
            }
        });
    }
    else {
        res.status(401).send();
    }
});

// delete a coffe shop on the email -- WOrks
router.delete("/shop/:CoffeeShopEmail", function (req, res) {
    if (req.decoded.data.roleId === 1) {
        console.log("param: " + req.params.CoffeeShopEmail)
        facade.deleteCoffeeShop(req.params.CoffeeShopEmail, function (status) {
            if (status !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.status(200).send();
            }
            else {
                res.status(500).send();
            }
        });
    }
    else {
        res.status(401).send();
    }
});


//New Brand -- WORKS

router.post("/brand/new", function (req, res, next) {
        if (req.decoded.data.roleId === 1) {
            facade.createCoffeeBrand(req.body.brandName, req.body.numberOfCoffeeNeeded, function (status) {
                    if (status === true) {
                        res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                        res.status(200).send();
                    }
                    else {
                        res.status(500).send();
                    }

                }
            );
        }
        else {
            res.status(401).send();
        }
    }
);

// WORKS

router.post("/shop/new", function (req, res, next) {
        if (req.decoded.data.roleId === 1) {
            facade.createCoffeeShop(req.body.email, req.body.brandName, req.body.address, req.body.phone, function (status) {
                    if (status === true) {
                        res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                        res.status(200).send();
                    }
                    else {
                        res.status(500).send();
                    }

                }
            );
        }
        else {
            res.status(401).send();
        }
    }
);

// WORKS -- takes the Email of a user and a shop.
router.post("/shopuser/new", function (req, res, next) {

        facade.createCoffeeShopUser(req.body.userEmail, req.body.coffeeShopEmail, function (status) {
                if (status === true) {
                    res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                    res.status(200).send();
                }
                else {
                    res.status(500).send();
                }
            }
        );
    }
);


//Get brand by brandID -- WORKS

router.get("/brand/:brandName", function (req, res, next) {
        facade.getCoffeeBrand(req.params.brandName, function (data) {
            if (data !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

                res.end(JSON.stringify(data));
            }
            else {
                res.status(500).send();
            }
        });
    }
);

// get a coffeshop by email -- WORKS
router.get("/shop/:email", function (req, res, next) {
        facade.getCoffeeShop(req.params.email, function (data) {
            if (data !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

                res.end(JSON.stringify(data));
            }
            else {
                res.status(500).send();
            }
        });
    }
);

// WORKS
router.get("/allshops/", function (req, res, next) {

    facade.getAllCoffeeShops(function (status) {
        if (status !== false) {
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
            res.end(JSON.stringify(status));
        }
        else {
            res.status(500).send();
        }
    })
});

// WORKS
router.get("/allbrands/", function (req, res, next) {

    facade.getAllCoffeeBrand(function (status) {
        if (status !== false) {
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
            res.end(JSON.stringify(status));
        }
        else {
            res.status(500).send();
        }
    })
});

// WORKS
router.get("/allshopusers/:shopID", function (req, res, next) {
    if (req.decoded.data.roleId === 1) {
        console.log(req.params.shopID);
        facade.getAllcoffeeShopUser(req.params.shopID, function (status) {
            if (status !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.end(JSON.stringify(status));
            }
            else {
                res.status(500).send();
            }
        })
    }
    else {
        res.status(401).send();
    }
});

//Edit a brand expects the full input -- WORKS

router.put("/brand/:brandId", function (req, res, next) {
        if (req.decoded.data.roleId === 1) {
            facade.putCoffeeBrand(req.params.brandId, brandName, req.body.numberOfCoffeeNeeded, function (status) {
                    console.log("her er status: " + status)
                    if (status !== false) {
                        res.write(JSON.stringify(status));
                        res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                        res.status(200).send();
                    }
                    if (status === false) {
                        res.status(500).send();
                    }
                }
            );

        }
        else {
            res.status(401).send();
        }

    }
);

// Edit a coffeeshop using their email.. -- WORKS
router.put("/shop/:coffeeShopEmail", function (req, res, next) {
    if (req.decoded.data.roleId === 1) {
        facade.putCoffeeShop(req.params.coffeeShopEmail, req.body.email, req.body.brandID, req.body.address, req.body.phone, function (status) {
            console.log("her er status: " + status)
            if (status !== false) {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.write(JSON.stringify(status));
                res.status(200).send();
            }
            if (status === false) {
                res.status(500).send();
            }
        })

    }
    else {
        res.status(401).send();
    }


});


//creates a new link between the given customers email and the coffeshops email (can do it with full user
// and coffeShop objects too, but this info will be available in client, and will save network traffic
/*
 Example JSON:
 {
 "userEmail" : "lars1@gmail.com",
 "coffeeShopEmail" : "a@a.dk"
 }
 */


// var returner = function (res, returnString)
// {
//     console.log("her fra returner: " + returnString);
//     res.writeHead(200, {'Content-Type': 'application/json', 'Content-Length': returnString.length + ''});
//     res.write(returnString);
//     res.end();
// }


module.exports = router;
