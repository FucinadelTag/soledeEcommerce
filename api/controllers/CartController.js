/**
 * CartController
 *
 * @description :: Server-side logic for managing carts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

import Market from '../services/MarketCloudServices.js'

module.exports = {


  /**
   * `CartController.add()`
   */
  add: function (req, res) {

    let formParams = req.body;

    Market.addToCart (req.session.cart, formParams.productId).then((cart) => {

        req.session.cart = cart.data;

        return res.redirect('/cart');
    });

  },


  /**
   * `CartController.view()`
   */
  view: function (req, res) {

    let cart = Market.getCart(req.session.cart);

    console.log (cart);

    return res.view('cart', cart);
  },


  /**
   * `CartController.update()`
   */
  update: function (req, res) {
    let formParams = req.body;

    Market.updateCart (req.session.cart, formParams.itemId, formParams.quantity).then((cart) => {
      req.session.cart = cart.data;

      return res.redirect('/cart');
    });
  }
};

