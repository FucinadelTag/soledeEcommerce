/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import Market from '../services/MarketCloudServices.js'

import Braintree from '../services/BrainTreeServices.js'

module.exports = {



  /**
   * `OrderController.create()`
   */
  create: function (req, res) {

    console.log (req.body);
    let formParams = req.body;
    let cartId = req.session.cart.id;

    Braintree.getClient ().then (response => {
        console.log (response);
      }).catch (error => {
        console.log (error);
      });

    // Market.orderCreate(cartId, formParams).then ((orderData) => {
    //     console.log (orderData);
    // });

    //console.log (order);



    // Moltin.orderCreate (formParams).then((order) => {
    //     console.log (order);

    //     Moltin.orderPay (order.data.id, formParams).then((payment) => {
    //         console.log (payment);
    //     }).catch((err) => {
    //         // Handle any error that occurred in any of the previous
    //         // promises in the chain.
    //         console.log (err);
    //     });
    //     //return res.redirect('/cart');
    // });

  },


  /**
   * `OrderController.pay()`
   */
  pay: function (req, res) {
    return res.json({
      todo: 'pay() is not implemented yet!'
    });
  }
};

