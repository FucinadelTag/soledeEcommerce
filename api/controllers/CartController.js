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

    console.log (req.params);

    let params = req.params;

    Moltin.addToCart (params.productId);
    return res.redirect('/cart');
  },


  /**
   * `CartController.view()`
   */
  view: function (req, res) {

    Moltin.getCart().then((cart) => {

      console.log(cart);

      console.log (cart.meta.display_price.with_tax.formatted);

      return res.view('cart', cart);
    });
  },


  /**
   * `CartController.update()`
   */
  update: function (req, res) {
    return res.json({
      todo: 'update() is not implemented yet!'
    });
  }
};

