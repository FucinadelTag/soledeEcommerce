/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `OrderController.create()`
   */
  create: function (req, res) {

    console.log (req.body);

    return res.json({
      todo: 'create() is not implemented yet!'
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

