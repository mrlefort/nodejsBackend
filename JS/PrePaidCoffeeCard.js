/**
 * Created by dino on 07-02-2017.
 */

var db = require('./DataBaseCreation.js');
var conn = db.connect();
var sequelize = db.connect();
var user = db.User();
var prePaidCard = db.PrePaidCard();
var prePaidCoffeeCard = db.PrePaidCoffeeCard();
//


// _createPrePaidCard(1,2, function (data) {
//
// })

buycard(12, 1, 2, function (data)
{
    console.log(data)
});


// der skal forbindelse mellem coffeecode og
function buycard(coffeeCode, cardID, userID, callback)
{
    var uses = 0
    var usesoncard = 0
    this.cardID = cardID
    this.userID = userID;


    prePaidCard.find({where: {PrePaidCoffeeCardId: cardID, userId: userID}}).then(function (data)
    { // we have run the callback inside the .then

        if (data !== null)
        {

            uses = data.usesleft
            prePaidCoffeeCard.find({where: {id: cardID}}).then(function (data1)
            { // we have run the callback inside the .then

                usesoncard = data1.count
                if (data1 !== null)
                {
                    // logic if found

                    return sequelize.transaction(function (t)
                    {

                        // chain all your queries here. make sure you return them.
                        return data.updateAttributes({
                            usesleft: uses + usesoncard

                        }, {transaction: t})

                    }).then(function (result)
                    {
                        callback("Tilføjet " + usesoncard + "til brugeren med et nyt antal klip: " + (parseInt(uses) + parseInt(usesoncard)))
                    }).catch(function (err)
                    {
                        callback("noget gik galt... prøv igen")
                        console.log("her er fejl fra PrepaidCoffeeCard.js update.. --- " + err)

                        // Transaction has been rolled back
                        // err is whatever rejected the promise chain returned to the transaction callback
                    });

                }
                else
                {
                    callback("der er ikke noget klippekort ")
                    // burde aldrig komme herned.
                    // logic if card is not present equalivant to the one bought.
                }

                console.log("total uses after update: " + (parseInt(uses) + parseInt(usesoncard)))

            })
        }
        else
        {
            // logic if it has to be created.

            user.find({where: {id: userID}}).then(function (data)
            { // we have run the callback inside the .then

                if (data !== null)
                {

                    prePaidCoffeeCard.find({where: {id: cardID}}).then(function (data1)
                    { // we have run the callback inside the .then

                        if (data1 !== null)
                        {
                            return conn.transaction(function (t)
                            {
                                return prePaidCard.create({
                                    PrePaidCoffeeCardId: cardID,
                                    userId: userID,
                                    usesleft: data1.count
                                }, {transaction: t})

                            }).then(function (result)
                            {
                                callback("Oprettet nyt kort til brugeren.")
                            }).catch(function (err)
                            {
                                console.log("something went wrong")
                            })
                        }
                        else
                        {
                            console.log("no such card..")
                            // logic if no store has such a card.
                        }
                    })
                }
                else
                {
                    console.log("no user with the given ID")
                    // logic for user to see.

                }
            })
        }
    })
}

module.exports = {};
