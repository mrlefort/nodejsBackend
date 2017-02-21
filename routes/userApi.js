var express = require('express');
var router = express.Router();
var facade = require('../JS/DataBaseFacade.js');
var bcrypt = require('bcryptjs');
var Token = require('../JS/Token.js');
var jwt = require('jsonwebtoken');
var Secret = require('../JS/Secret.js');
var User = require('../JS/User.js');
var cookie = require('cookie');
var passport = require('passport');


//Deletes a user by email -- WORKS
router.delete("/user/:email", function (req, res)
{
    if (req.decoded.data.roleId === 1)  //1 = admin
    {
        console.log("param: " + req.params.email)
        facade.deleteUser(req.params.email, function (status)
        {

            if (status !== false)
            {
                res.writeHead(200, {"accessToken": req.headers.accessToken});
                res.status(200).send();
            }
            else
            {
                res.status(500).send();
            }
        });
    } else
    {
        res.status(401).send();
    }
});


//New User  -- WORKS
router.post("/user/new", function (req, res, next)
    {


        if (req.decoded.data.roleId === 1) //1 = admin
        {
            var salt = bcrypt.genSaltSync(12);
            var pw = bcrypt.hashSync(req.body.password, salt);
            var userToSave =
                {
                    "firstName": req.body.firstName,
                    "lastName": req.body.lastName,
                    "email": req.body.email,
                    "role": req.body.roleId,
                    "birthday": new Date(req.body.birthday),
                    "sex": req.body.sex,
                    "password": pw
                }
            facade.createUser(userToSave.firstName, userToSave.lastName, userToSave.email, userToSave.role, userToSave.birthday, userToSave.sex, userToSave.password, function (status)
                {

                    console.log("this is the decoded: " + req.decoded);
                    console.log("this is the headers.accessToken: " + req.headers.accessToken);
                    if (status === true)
                    {


                        res.writeHead(200, {"accessToken": req.headers.accessToken});
                        res.status(200).send();
                    }
                    else
                    {
                        res.status(500).send();
                    }
                }
            );
        } else
        {
            res.status(401).send();
        }
    }
);


// WORKS
router.post("/card/new", function (req, res, next)
    {
        facade.createLoyaltyCard(req.body.brandId, req.body.userId, req.body.numberOfCoffeesBought, function (status)
            {


                if (status === true)
                {

                    res.writeHead(200, {"accessToken": req.headers.accessToken});
                    res.status(200).send();
                }
                else
                {
                    res.status(500).send();
                }
            }
        );
    }
);
// WORKS
router.post("/card/coffeeBought", function (req, res, next)
    {
        facade.coffeeBought(req.body.userId, req.body.coffeeCode, req.body.numberOfCoffeesBought, function (status)
            {
                if (status === true)
                {
                    // res.writeHead(200, {"accessToken": req.headers.accessToken});
                    res.status(200).send();
                }else if(status==="exceeding the limit"){
                    res.status(501).send();
                }
                else
                {
                    res.status(500).send();
                }
            }
        );
    }
);


//New Role -- WORKS
router.post("/role/new", function (req, res, next)
    {
        if (req.decoded.data.roleId === 1) //1 = admin
        {

            facade.createRole(req.body.roleName, function (status)
                {

                    if (status === true)
                    {

                        res.writeHead(200, {"accessToken": req.headers.accessToken});
                        res.status(200).send();
                    }
                    else
                    {
                        res.status(500).send();
                    }

                }
            );
        } else
        {
            res.status(401).send();
        }
    }
);

//Get user by email -- WORKS
router.get("/user/:email", function (req, res, next)
    {

        //for at få fat på indholdet i req skal man sige req.get("");


        facade.getUser(req.params.email, function (data)
        {

            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

                res.end(JSON.stringify(data));
            }
            else
            {
                res.status(500).send();
            }
        });
    }
);

// WORKS
router.get("/card/:LoyaltyCardId", function (req, res)
    {
        facade.getLoyaltyCard(req.params.LoyaltyCardId, function (data)
        {

            if (data !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});

                res.end(JSON.stringify(data));
            }
            else
            {
                res.status(500).send();
            }
        });
    }
);

//Edit a user expects the full input -- WORKS (Returns the edited user)
router.put("/user/:email", function (req, res, next)
    {
        var salt = bcrypt.genSaltSync(10);
        var pw = bcrypt.hashSync(req.body.password, salt);
        var userToSave =
            {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "role": req.body.role,
                "birthday": new Date(req.body.birthday),
                "sex": req.body.sex,
                "password": pw
            }


        facade.putUser(userToSave.email, userToSave.firstName, userToSave.lastName, userToSave.email, userToSave.role, userToSave.birthday, userToSave.sex, userToSave.password, function (status)
            {
                console.log("her er status: " + status)
                if (status !== false)
                {
                    delete userToSave.password;
                    res.writeHead(200, {"accessToken": req.headers.accessToken});
                    res.write(JSON.stringify(userToSave));
                    res.status(200).send();
                }
                if (status === false)
                {
                    res.status(500).send();
                }
            }
        );
    }
);

// WORKS
router.put("/role/:roleId", function (req, res, next)
    {
        if (req.decoded.data.roleId === 1) //1 = admin
        {
            facade.putRole(req.params.roleId, req.body.roleName, function (status)
                {
                    if (status !== false)
                    {
                        res.writeHead(200, {"accessToken": req.headers.accessToken});
                        res.write(JSON.stringify(status));
                        res.status(200).send();
                    }
                    if (status === false)
                    {
                        res.status(500).send();
                    }
                }
            );
        } else
        {
            res.status(401).send();
        }

    }
);

// WORKS
router.put("/card/:LoyaltyCard", function (req, res, next)
    {
        var LoyaltyCardID = req.params.LoyaltyCard;

        facade.putLoyaltyCard(LoyaltyCardID, req.body.brandName, req.body.userId, req.body.numberOfCoffeesBought, function (status)
            {
                if (status !== false)
                {

                    res.writeHead(200, {"accessToken": req.headers.accessToken});
                    res.write(JSON.stringify(status));
                    res.status(200).send();
                }
                if (status === false)
                {
                    res.status(500).send();
                }
            }
        );

    }
);


// get all roles WORKS
router.get("/allroles/", function (req, res, next)
{
    if (req.decoded.data.roleId === 1)  //1 = admin  (her skriver du altså før at hvis decoded IKKE er admin kører den getallroles. hvilket er forkert?
    {
        facade.getAllRoles(function (status)
        {
            if (status !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.end(JSON.stringify(status));
            }
            else
            {
                res.status(500).send();
            }
        })
    } else
    {
        res.status(401).send();
    }
});


// WORKS
router.get("/allcards/", function (req, res)
{
    console.log("decodedsub" + req.decoded.data.sub)
    facade.getAllloyaltyCards(req.decoded.data.sub, function (status)
    {
        if (status !== false)
        {
            res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
            res.end(JSON.stringify(status));
        }
        else
        {
            res.status(500).send();
        }
    })
});

// WORKS
router.get("/allusers/", function (req, res)
{
    if (req.decoded.data.roleId === 1) //1 = admin
    {
        facade.getAllUsers(function (status)
        {
            if (status !== false)
            {
                res.writeHead(200, {"Content-Type": "application/json", "accessToken": req.headers.accessToken});
                res.end(JSON.stringify(status));
            }
            else
            {
                res.status(500).send();
            }
        })
    } else
    {
        res.status(401).send();
    }
});


router.post("/user/logout", function (req, res)
{
    console.log("kører api/logout")
    User.logoutUser(req.body.email, function (data)
    {
        if (data)
        {
            res.status(200).send("du er nu logget ud");
        } else
        {
            console.log("det gik galt")
        }
    })
});


//Steffen userLogin, userAuth og userLogout slut


module.exports = router;
