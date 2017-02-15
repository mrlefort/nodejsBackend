/**
 * Created by dino on 07-10-2016.
 */


var db = require('./DataBaseCreation.js');
var Sequelize = require('sequelize'); // Requires
var Role = require('./Role.js'); // Requires
var User = require('./User.js'); // Requires
var OrderItem = require('./OrderItem.js'); // Requires
var LoyaltyCards = require('./LoyaltyCard.js'); // Requires
var CoffeeBrand = require('./CoffeeBrand.js'); // Requires
var Order = require('./Order.js'); // Requires
var CoffeeShop = require('./CoffeeShop.js'); // Requires
var CoffeeShopUsers = require('./CoffeeShopUser.js'); // Requires
var validate = require('./Validator');


var sequelize = db.connect(); // Establishing connection to the MySQL database schema called keebin

sequelize.authenticate().then(function (err) {
        if (err) {
            console.log('There is connection in ERROR');
        } else {
            console.log('Connection has been established successfully');
        }
    }
); // Authenticating connection to the MySQL database connection above


function _createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, callback) {
    validate.valBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, function (data) {
        if (data) {
            CoffeeBrand.createCoffeeBrand(CoffeeBrandName, NumbersOfCoffeesNeeded, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })


}

function _deleteCoffeeBrand(CoffeeBrandID, callback) {
    validate.valID(CoffeeBrandID, function (data) {
        if (data) {
            CoffeeBrand.deleteCoffeeBrand(CoffeeBrandID, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })

}


function _getCoffeeBrand(CoffeeBrandID, callback) {
    validate.valID(CoffeeBrandID, function (data) {
        if (data) {
            CoffeeBrand.getCoffeeBrand(CoffeeBrandID, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}


function _getAllCoffeeBrand(callback) {

    CoffeeBrand.getAllCoffeeBrands(function (data) {
        return callback(data)
    })


};  // this one "gets" all CoffeeShops.

function _putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, callback) {
    validate.valBrand(CoffeeBrandID, CoffeeBrandName, CoffeeBrandName, function (data) {
        if (data) {
            CoffeeBrand.putCoffeeBrand(CoffeeBrandID, CoffeeBrandName, numberOfCoffeeNeeded, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })

}

function _deleteLoyaltyCard(ID, callback) {
    validate.valID(ID, function (data) {
        if (data) {
            LoyaltyCards.deleteLoyaltyCard(ID, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}

function _createLoyaltyCard(brandId, userID, numberOfCoffeesBought, callback) {
    validate.valID(userID, function (data) {
        if (data) {
            validate.valBrand(brandId, numberOfCoffeesBought, function (data) {
                if (data) {
                    LoyaltyCards.createLoyaltyCard(brandId, userID, numberOfCoffeesBought, function (data2) {
                        callback(data2)
                    })
                } else callback(false)
            })
        } else callback(false)
    })

}


function _getLoyaltyCard(ID, callback) {
    validate.valID(ID, function (data) {
        if (data) {
            LoyaltyCards.getLoyaltyCard(ID, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}


function _getAllloyaltyCards(userId, callback) {

    LoyaltyCards.getAllloyaltyCards(userId, function (data2) {
        callback(data2)
    })

};  // this one "gets" all CoffeeShops.


function _putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, callback) {
    validate.valID(LoyaltyCardID, function (data) {
        if (data) {
            validate.valID(userID, function (data) {
                if (data) {
                    LoyaltyCards.putLoyaltyCard(LoyaltyCardID, brandName, userID, numberOfCoffeesBought, function (data2) {
                        callback(data2)
                    })
                } else callback(false)
            })
        } else callback(false)
    })

}

function _createRole(RoleN, callback) {
    validate.valRole(RoleN, function (data) {
        if (data) {
            Role.createRole(RoleN, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
};  //create role if roleN does not exist already.


function _deleteRole(RoleId, callback) {
    validate.valID(RoleId, function (data) {
        if (data) {
            Role.deleteRole(RoleId, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
};  //create role if roleN does not exist already.

function _putRole(RoleId, NewRoleName, callback) {
    validate.valID(RoleId, function (data) {
        if (data) {
            validate.valRole(NewRoleName, function (data) {
                if (data) {
                    Role.putRole(RoleId, NewRoleName, function (data2) {
                        callback(data2)
                    })
                } else callback(false)
            })
        } else callback(false)
    })
};  //create role if roleN does not exist already.

function _getRole(RoleId, callback) {
    validate.valID(RoleId, function (data) {
        if (data) {
            Role.getRole(RoleId, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
};  //create role if roleN does not exist already.

function _getAllRoles(callback) {

    Role.getAllRoles(function (data2) {
        callback(data2)
    })

};  //create role if roleN does not exist already.

function _createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, callback) // this creates a user
{
    console.log("createUser1")
    validate.valUser(Email, password, Role, function (data) {
        if (data) {
            console.log("create user 2")
            User.createUser(FirstName, LastName, Email, Role, Birthday, Sex, password, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}


function _putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback) {
    console.log("kommer vi ind her? :D")
    validate.valUser(email, role, password, function (data) {
        console.log("kommer vi ind i validate?")
        if (data) {
            User.putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })

}; // this edits user based on email.


function _deleteUser(userEmail, callback) {
    validate.valEmail(userEmail, function (data) {
        if (data) {
            User.deleteUser(userEmail, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}; //this one deletes user based on email.


function _getUser(userEmail, callback) {

    validate.valEmail(userEmail, function (data) {
        if (data) {
            User.getUser(userEmail, function (data2) {
                callback(data2)
            })

        } else callback(false)
    })
}; // this one "gets" a user based on email.


function _getAllUsers(callback) {

    User.getAllUsers(function (data2) {
        callback(data2)
    })

};  // this one "gets" all CoffeeShops.

function _getUserById(userId, callback) {
    validate.valID(userId, function (data) {
        if (data) {
            User.getUserById(userId, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}; //get one user from the DB by ID.

function _createCoffeeShop(email, brandId, address, phone, coffeeCode, longitude, latitude, callback) // this creates a new CoffeeShop
{

    validate.valCoffeeshop(email, brandId, address, phone, coffeeCode, longitude, latitude, function (data) {
        if (data) {
            CoffeeShop.createCoffeeShop(email, brandId, address, phone, coffeeCode, longitude, latitude, function (data2) {

                callback(data2)
            })
        } else callback(false)
    })

}

function _deleteCoffeeShop(coffeeShopEmail, callback) {
    validate.valEmail(coffeeShopEmail, function (data) {
        if (data) {
            CoffeeShop.deleteCoffeeShop(coffeeShopEmail, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}; //this one deletes order based on id.


function _getCoffeeShop(coffeeShopEmail, callback) {
    validate.valEmail(coffeeShopEmail, function (data) {
        if (data) {
            CoffeeShop.getCoffeeShop(coffeeShopEmail, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
};  // this one "gets" a CoffeeSHop based on CoffeeShop Email.


function _getAllCoffeeShops(callback) {

    CoffeeShop.getAllCoffeeShops(function (data2) {
        callback(data2)
    })

};  // this one "gets" all CoffeeShops.


function _putCoffeeShop(coffeeShopEmail, email, brandId, address, phone, coffeeCode, longitude, latitude, callback) {
    validate.valCoffeeshop(coffeeShopEmail, brandId, address, phone, coffeeCode, longitude, latitude, function (data) {
        if (data) {
            CoffeeShop.putCoffeeShop(coffeeShopEmail, email, brandId, address, phone,
                coffeeCode, longitude, latitude, function (data2) {
                    callback(data2)
                })
        } else callback(false)
    })


}; // this edits CoffeeShop based on email.


function _createOrder(currentUser, coffeeShopId, platform, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    validate.valOrder(currentUser, coffeeShopId, platform, function (data) {
        if (data) {
            Order.createOrder(currentUser, coffeeShopId, platform, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}

function _deleteOrder(orderId, callback) {
    validate.valID(orderId, function (data) {
        if (data) {
            Order.deleteOrder(orderId, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
};  //this one deletes order based on id.

function _getOrder(orderId, callback) {
    validate.valID(orderId, function (data) {
        if (data) {
            Order.getOrder(orderId, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })
}; // this one "gets" an order based on orderId.

function _getAllOrdersByUser(userEmail, callback) {

    Order.getAllOrdersByUser(userEmail, function (data2) {
        callback(data2)
    })


};  // this one "gets" all CoffeeShops.

function _createOrderItem(orderId, coffeeKindId, quantity, callback) // This creates a new order - belonging to a user through the userId and a coffeeShop through CoffeeShopId
{
    validate.valOrderItem(orderId, coffeeKindId, quantity, function (data) {
        if (data) {
            OrderItem.createOrderItem(orderId, coffeeKindId, quantity, function (data2) {
                callback(data2)
            })
        } else callback(false)
    })

}


//COFFEESHOPUSER STARTS HERE
function _createCoffeeShopUser(userEmail, coffeeShopEmail, callback) {

    validate.valEmail(userEmail, function (data) {
        if (data) {
            CoffeeShopUsers.createCoffeeShopUser(userEmail, coffeeShopEmail, function (data2) {
                callback(data2)
            })
        } else {
            callback(false)
        }
    })
    // CoffeeShopUsers.createCoffeeShopUser(userEmail, coffeeShopEmail, callback)
    // }else return false
};


function _getAllCoffeeShopUserByCoffeeShop(coffeeShopId, callback) {

    CoffeeShopUsers.getAllCoffeeShopUserByCoffeeShop(coffeeShopId, function (data2) {
        callback(data2)
    })

};

function _coffeeBought(userID, coffeeCode, numberOfCoffeesBought, callback) {
    //Springer steppet med CoffeeCode over. den skal finde Brandname for mig
    validate.valID(userID, function (d) {
        if (d) {
            validate.valNumber(numberOfCoffeesBought, function (data) {

                if (data) {
                    CoffeeShop.getCoffeeShopByCoffeeCode(coffeeCode, function (coffeeData) {


                        if (coffeeData) {
                            CoffeeBrand.getCoffeeBrand(coffeeData.brandName, function (brandData) {


                                LoyaltyCards.getLoyaltyCardByUserAndBrand(userID, brandData.id, function (data) {

                                    if (!data) {


                                        LoyaltyCards.createLoyaltyCard(coffeeData.brandName, userID, numberOfCoffeesBought, function (createData) {
                                            _createOrder(userID, coffeeData.id, 'android', function (orderData) {
                                                _createOrderItem(orderData.id, null, numberOfCoffeesBought, function () {

                                                    return callback(createData);
                                                })

                                            })

                                        })
                                    } else {
                                        LoyaltyCards.addToNumberOfCoffeesBought(data.id, numberOfCoffeesBought, function (addData) {
                                            _createOrder(userID, coffeeData.id, 'android', function (orderData) {
                                                _createOrderItem(orderData.id, null, numberOfCoffeesBought, function () {
                                                    return callback(addData);
                                                })

                                            })
                                        })
                                    }
                                })
                            })
                        } else return callback(data)

                    })
                } else return callback(data)
            })
        } else return callback(d)
    })
}
// _createCoffeeShopUser('test1@test1.dk','test@test.dk',function(data){
//     if(data){
//         console.log(data)
//         console.log('gået godt')
//     }else console.log('gået skidt')
// })

//COFFEESHOPUSER ENDS HERE

module.exports = {
    createUser: _createUser,
    createRole: _createRole,
    putUser: _putUser,
    deleteUser: _deleteUser,
    getUser: _getUser,
    createCoffeeShop: _createCoffeeShop,
    deleteCoffeeShop: _deleteCoffeeShop,
    createOrder: _createOrder,
    createOrderItem: _createOrderItem,
    deleteOrder: _deleteOrder,
    getOrder: _getOrder,
    getCoffeeShop: _getCoffeeShop,
    putCoffeeShop: _putCoffeeShop,
    getAllCoffeeShops: _getAllCoffeeShops,
    getAllOrdersByUser: _getAllOrdersByUser,
    getAllUsers: _getAllUsers,
    createCoffeeShopUser: _createCoffeeShopUser,
    getAllcoffeeShopUser: _getAllCoffeeShopUserByCoffeeShop,
    getUserById: _getUserById,
    deleteLoyaltyCard: _deleteLoyaltyCard,
    createLoyaltyCard: _createLoyaltyCard,
    getLoyaltyCard: _getLoyaltyCard,
    getAllloyaltyCards: _getAllloyaltyCards,
    putLoyaltyCard: _putLoyaltyCard,
    createCoffeeBrand: _createCoffeeBrand,
    putCoffeeBrand: _putCoffeeBrand,
    getAllCoffeeBrand: _getAllCoffeeBrand,
    getCoffeeBrand: _getCoffeeBrand,
    deleteCoffeeBrand: _deleteCoffeeBrand,
    deleteRole: _deleteRole,
    putRole: _putRole,
    getRole: _getRole,
    getAllRoles: _getAllRoles,
    coffeeBought: _coffeeBought
}; // Export Module