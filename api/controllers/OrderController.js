/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import Moltin from '../services/MoltinServices.js'

module.exports = {



  /**
   * `OrderController.create()`
   */
  create: function (req, res) {

    console.log (req.body);
    let formParams = req.body;

    Moltin.orderCreate (formParams).then((order) => {
        console.log (order);

        Moltin.orderPay (order.data.id, formParams).then((payment) => {
            console.log (payment);
        }).catch((err) => {
            // Handle any error that occurred in any of the previous
            // promises in the chain.
            console.log (err);
        });
        //return res.redirect('/cart');
    });

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

