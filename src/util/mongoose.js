module.exports = {
    mutipleMongooseToObject: function(mongooses) {
        return mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
    mutipleOrderToRevenue : function(mongooses){
        var revenue = 0;
        mongooses.map(mongoose => {
            revenue +=  mongoose.cart.totalPrice;
            require.revenue = revenue;
        })
        return revenue;
    }
};
