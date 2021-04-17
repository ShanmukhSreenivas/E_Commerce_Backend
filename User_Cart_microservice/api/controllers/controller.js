const UserCart = require("../models/model");

const fetch = require('node-fetch');

exports.listUserCart = async (req, res) => { 
    await UserCart.find({ userId: req.params.id }, (err, cart) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(200).json(cart);
    });
};

exports.createUpdateUserCart = (req, res) => {
    var amount, name

    fetch(`http://localhost:3000/rest/v1/products/`, {
        method: 'GET',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
    .then(response => response.json())
    .then(response => {
        let pCount = 0
        for (var i = 0; i < response.length; i++) {
            if (response[i].productId == req.body.productId) {
                pCount += 1
                if ((response[i].availableQuantity - req.body.quantity) <= 0) {
                    req.body.quantity = response[i].availableQuantity 
                }
                amount = req.body.quantity * response[i].price
                name = response[i].productName
            } 
        }
        if (pCount == 0) {
            throw new Error("productId not found.")
        }

        req.body = { productId: req.body.productId, productName: name, quantity: req.body.quantity, amount: amount }

        fetch(`http://localhost:4000/rest/v1/users/${req.params.id}/cart`, {
            method: 'GET',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        })
        .then(responseCart => responseCart.json())
        .then(responseCart => {
            let cCount = 0
            for (var i = 0; i < responseCart[0].cart.length; i++) {
                if (responseCart[0].cart[i].productId == req.body.productId) {
                    cCount += 1
                } 
            }
            if (cCount >= 1 && req.body.quantity != 0) {
                UserCart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { "cart.$": req.body }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            } 
            if (cCount == 0 && req.body.quantity != 0) {
                UserCart.findOneAndUpdate({ userId: req.params.id }, { $addToSet: { "cart": req.body } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            }
            if (cCount >= 1 && req.body.quantity == 0) {
                UserCart.findOneAndUpdate({ "userId": req.params.id, "cart.productId": req.body.productId }, { $pull: { "cart": { "productId": req.body.productId } } }, { new: true }, (err, cart) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(200).json(cart.cart);
                });
            }
            if (cCount == 0 && req.body.quantity == 0) {
                throw new Error ("Quantity can't be null.")
            }
        });
    });
};

exports.createUser = async (req, res) => {
    let newUser = new UserCart (req.body);
    await newUser.save ((err, cart) => {
        if (err) {
            res.status(500).send(err);
        }
        res.status(201).json(cart);
    });
};
