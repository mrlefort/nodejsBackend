/**
 * Created by dino on 29-09-2016.
 */

var db = require('./DataBaseCreation.js');
var sequelize = db.connect();
var User = db.User();

var Sequelize = require('sequelize'); // Requires
var firstName = "";
var lastName = "";
var email = "";
var role = "";
var birthday = "";
var sex = "";
var password = ""; // Variable Creation

function _newUser(firstName, lastName, email, role, birthday, sex, password) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.role = role;
    this.birthday = birthday;
    this.sex = sex;
    this.password = password;

} // Export Functions


function _createUser(firstName, lastName, email, role, birthday, sex, password, callback) // this creates a user
{
    var userCreated = false;

    console.log("createUser is running. ")
    User.find({where: {Email: email}}).then(function (data) { // we have run the callback inside the .then
        if (data !== null) {
            console.log("user found - email exists already - " + data.email)
            callback(userCreated);
        } else {
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return User.create({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    roleId: role,
                    birthday: birthday,
                    sex: sex,
                    password: password

                }, {transaction: t})

            }).then(function (result) {
                console.log("Transaction has been committed - user has been saved to the DB");
                userCreated = true;
                callback(userCreated);

                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(userCreated);
                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            })
        }
    })
}


function _putUser(userEmail, firstName, lastName, email, role, birthday, sex, password, callback) {

    var userUpdated = false;

    console.log("userPutFind is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
            if (data !== null) {
                console.log("user found - ready to edit");


                return sequelize.transaction(function (t) {

                    // chain all your queries here. make sure you return them.
                    return data.updateAttributes({
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        roleId: role,
                        birthday: birthday,
                        sex: sex,
                        password: password

                    }, {transaction: t})

                }).then(function (result) {
                    console.log("Transaction has been committed - user with email: " + result.email + ", has been updated and saved to the DB");
                    callback(result);

                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err);
                    callback(userUpdated);
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                });
            } else {

                console.log(err);
                console.log("could not find: " + editUser.email);
                callback(userUpdated);
            }


        }
    )


}; // this edits user based on email.


function _deleteUser(userEmail, callback) {
    var userDeleted = false;

    console.log("_deleteUser is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
        if (data !== null) {
            console.log("user found - ready to DELETE");
            return sequelize.transaction(function (t) {

                // chain all your queries here. make sure you return them.
                return data.destroy({},
                    {transaction: t})

            }).then(function () {
                console.log("Transaction has been committed - user with email: " + userEmail + ", has been DELETED");
                userDeleted = true;
                callback(userDeleted);


                // Transaction has been committed
                // result is whatever the result of the promise chain returned to the transaction callback
            }).catch(function (err) {
                console.log(err);
                callback(userDeleted);

                // Transaction has been rolled back
                // err is whatever rejected the promise chain returned to the transaction callback
            });


        } else {
            console.log(err);
            console.log("could not find: " + userEmail);
            callback(userDeleted);
        }


    })


}; //this one deletes user based on email.


function _getUser(userEmail, callback) {
    var userFound3 = false;

    console.log("_getUser is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
            if (data !== null) {
                console.log("user with email: " + userEmail + " found. Name is: " + data.firstName);
                callback(data);

            } else {
                console.log(err);
                console.log("could not find: " + userEmail);
                callback(userFound3);


            }


        }
    )


}; // this one "gets" a user based on email.

function _getUserByRefreshToken(refreshToken, callback) {
    var userFound = false;

    //her tjekker vi om præcis den refreshToken findes hos en user.
    console.log("_getUserByRefreshToken is running. Finding: " + refreshToken);
    User.find({where: {refreshToken: refreshToken}}).then(function (data, err) {
            if (data !== null) {
                console.log("user with refreshToken: " + refreshToken + " found. Name is: " + data.firstName);
                userFound = true;
                callback(data);

            } else {
                console.log(err);
                console.log("could not find: " + refreshToken);
                callback(userFound);


            }


        }
    )


}; // this one "gets" a user based on email.


function _getAllUsers(callback) {
    var allUsers = [];

    var log = function (inst) {

        allUsers.push(inst.get());
    }

    console.log("getAllUsers is running.");
    User.findAll().then(function (data, err) {
        if (data !== null) {
            console.log("her er Users: " + data)
            data.forEach(log);
            callback(allUsers);

        } else {
            console.log(err);
            console.log("could not find any Users");
            callback(false);

        }


    })


};  // this one "gets" all CoffeeShops.


function _getUserById(userId, callback) {
    var userFound3 = false;

    console.log("_userGet is running. Finding: " + userId);
    User.find({where: {id: userId}}).then(function (data, err) {
            if (data !== null) {
                console.log("user with email: " + userId + " found. Name is: " + data.firstName);
                callback(data);

            } else {
                console.log(err);
                console.log("could not find: " + userId);
                callback(userFound3);
            }
        }
    )
}; //get one user from the DB by ID.


function _logoutUser(userEmail, callback) {


    console.log("_logoutUser is running. Finding: " + userEmail);
    User.find({where: {Email: userEmail}}).then(function (data, err) {
            if (data !== null) {
                console.log("user found - ready to Logout");

                return sequelize.transaction(function (t) {

                    // chain all your queries here. make sure you return them.
                    return data.updateAttributes({

                        refreshToken: null


                    }, {transaction: t})

                }).then(function (result) {
                    console.log("Transaction has been committed - user with email: " + result.email + ", has been logged out and refreshToken deleted in the DB");
                    callback(result);

                    // Transaction has been committed
                    // result is whatever the result of the promise chain returned to the transaction callback
                }).catch(function (err) {
                    console.log(err);
                    callback(false);
                    // Transaction has been rolled back
                    // err is whatever rejected the promise chain returned to the transaction callback
                });
            } else {

                console.log(err);
                console.log("could not find: " + editUser.email);
                callback(false);
            }


        }
    )


}; // this logs out user by deleting refreshToken.


module.exports = {
    createNewUserObject: _newUser,
    getUserById: _getUserById,
    createUser: _createUser,
    putUser: _putUser,
    deleteUser: _deleteUser,
    getUser: _getUser,
    getAllUsers: _getAllUsers,
    getUserByRefreshToken: _getUserByRefreshToken,
    logoutUser: _logoutUser
}; // Export Module




