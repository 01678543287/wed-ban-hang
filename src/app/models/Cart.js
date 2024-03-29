const Product = require('../models/Product');

module.exports = function Cart(oldCart) {
    this.items = oldCart.items || {};
    this.totalQty = oldCart.totalQty || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id, size) {
        var storedItem = this.items[id];
        if(!storedItem) {
            storedItem = this.items[id] = {item: item, qty: 0, price: 0, size: ""};
        }

        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        storedItem.size += size+ " ";

        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    }

    this.reduceByOne = function(id) {
        var storedItem = this.items[id];

        storedItem.qty--;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty--;
        this.totalPrice -= storedItem.item.price;

        if(this.items[id].qty <= 0) {
            delete this.items[id];
        }
    };
    this.removeAll = function(id) {
        this.totalQty -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };
    this.addByOne = function(id) {
        var storedItem = this.items[id];

        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQty++;
        this.totalPrice += storedItem.item.price;
    };

    this.generateArray = function() {
        var arr = [];
        for(var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};