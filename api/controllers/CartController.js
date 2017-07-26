/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import Moltin from '../services/MoltinServices.js'

module.exports = {



  /**
   * `CartController.add()`
   */
  add: function (req, res) {

    let formParams = req.body;

    Moltin.addToCart (formParams.productId).then((cart) => {
      return res.redirect('/cart');
    });

  },


  /**
   * `CartController.view()`
   */
  view: function (req, res) {

    Moltin.getCart().then((cart) => {

      console.log(cart);

      console.log (cart.data);

      return res.view('cart', cart);
    });
  },


  /**
   * `CartController.update()`
   */
  update: function (req, res) {
    let formParams = req.body;

    console.log (formParams);

    Moltin.updateCart (formParams.itemId, formParams.quantity).then((cart) => {
      return res.redirect('/cart');
    });
  }
};

