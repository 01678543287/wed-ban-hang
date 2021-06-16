var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
const Order = require('../models/Order');
const Revenue = require('../models/Revenue');



class UpdateController{
    updateDatabase(res, req, next){
        var nameProducts = [];
        var soldProducts = [];
        var tam = 0;
        var moneys = Number(0);
        Order.find({updatedAt : {
            "$gte": new Date(year, month , day-1, ), 
            "$lt": new Date(year, month, day)
            }
        }, function(err, order){
            for(var i = 0; i<order.length; i++){
                for (var property in order[i].cart.items){
                    var index = nameProducts.findIndex(element => element === property);
                    if(index  == -1){
                        nameProducts.push(property);
                        soldProducts.push(order[i].cart.items[property].qty);
                    }
                    else{
                        tam = order[i].cart.items[property].qty + soldProducts[index];
                        soldProducts[index] = tam;
                    }
                    moneys += (order[i].cart.items[property].qty*order[i].cart.items[property].price);
                }
            }
            
            date = new Date(year, month, day+1);
            const revenue = new Revenue({
                type : 'day',
                money : moneys,
                date : date,
                products : nameProducts,
                amounts : soldProducts,
            })
            // revenue.save();
        })
        date = new Date();
        
        if(month != date.getMonth()){
            if(year != date.getFullYear()){
                var totalMoney = 0;
                Revenue.find({
                    date : {
                        "$gte": new Date(year, 0 , 0, ), 
                        "$lt": new Date(year+1, 0, 0)
                    },
                    type : 'month'
                }, function(err, revenue){
                    for(var i = 0; i< revenue.length; i++){
                        totalMoney += revenue[i].money;
                    }
                    date = new Date(year, month, day);
                    const revenueYear = new Revenue({
                        type : 'year',
                        money : totalMoney,
                        date : date,
                    })
                    revenueYear.save();
                })
            }


            var totalMoney = 0;
            Revenue.find({
                date : {
                    "$gte": new Date(year, month , 0, ), 
                    "$lt": new Date(year, month+1, 0)
                },
                type : 'day'
            }, function(err, revenue){
                for(var i = 0; i< revenue.length; i++){
                    totalMoney = revenue[i].money + totalMoney;
                }
                date = new Date(year, month, day);
                const revenueMonth = new Revenue({
                    type : 'month',
                    money : totalMoney,
                    date : date,
                })
                revenueMonth.save();
            })        
        }
        date = new Date();
        month = date.getMonth();
        day = date.getDate();
        year = date.getFullYear();
    }
}

module.exports = new UpdateController();

function revenueEveryDay(year, month, day){
    var nameProducts = [];
    var soldProducts = [];
    var moneys = 0;
    Order.find({updatedAt : {
        "$gte": new Date(year, month , day, ), 
        "$lt": new Date(year, month, day+1)
        }
    }, function(err, order){
        for(var i = 0; i<order.length; i++){
            for (var property in order[i].cart.items){
                var index = nameProducts.findIndex(element => element === property);
                if(index  == -1){
                    nameProducts.push(property);
                    soldProducts.push(order[i].cart.items[property].qty);
                }
                else{
                    soldProducts[index] = order[i].cart.items[property].qty + soldProducts[index];
                }
                moneys += (order[i].cart.items[property].qty*order[i].cart.items[property].price);
            }
        }
        
        const revenue = new Revenue({
            type : 'day',
            money : moneys,
            date : Date(year, month, day+1),
            products : nameProducts,
            amounts : soldProducts,
        })
        revenue.save();
    })
}

function revenueEveryMonth(year, month){
    var totalMoney = 0;
    Revenue.find({
        date : {
            "$gte": new Date(year , month, 0 ), 
            "$lt": new Date(year, month+1, 0)
        },
        type : 'day',
    }, function(err, revenue){
        var products = [];
        var amounts = [];
        for(var i = 0; i< revenue.length; i++){
            var arrayProducts = revenue[i].products;
            var arrayAmounts = revenue[i].amounts;

            for(var j = 0; j <arrayProducts.length; j++){
                var index = products.findIndex(element => element === arrayProducts[j]);
                if(index  == -1){
                    products.push(arrayProducts[j]);
                    amounts.push(arrayAmounts[j]);
                }
                else{
                    amounts[index] = amounts[index] + arrayAmounts[j];
                }
            }
            totalMoney = revenue[i].money + totalMoney;
            // console.log(totalMoney);
        }
        const revenueYear = new Revenue({
            type : 'month',
            money : totalMoney,
            date : new Date(year, month, day+1),
            products : products,
            amounts : amounts,

        })
        revenueYear.save();
    })        
}

function revenueEveryYear(year){
    var totalMoney = 0;
    Revenue.find({
        date : {
            "$gte": new Date(year , 0, 0 ), 
            "$lt": new Date(year + 1, 0, 0)
        },
        type : 'month',
    }, function(err, revenue){
        var products = [];
        var amounts = [];
        for(var i = 0; i< revenue.length; i++){
            var arrayProducts = revenue[i].products;
            var arrayAmounts = revenue[i].amounts;

            for(var j = 0; j <arrayProducts.length; j++){
                var index = products.findIndex(element => element === arrayProducts[j]);
                if(index  == -1){
                    products.push(arrayProducts[j]);
                    amounts.push(arrayAmounts[j]);
                }
                else{
                    amounts[index] = amounts[index] + arrayAmounts[j];
                }
            }
            totalMoney = revenue[i].money + totalMoney;
            // console.log(totalMoney);
        }
        const revenueYear = new Revenue({
            type : 'year',
            money : totalMoney,
            date : new Date(year, month, day+1),
            products : products,
            amounts : amounts,

        })
        revenueYear.save();
    }) 
}