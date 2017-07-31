const Schema = require('schema-client');

class SchemaService {

    constructor() {
        this.Schema = new Schema.Client('solede', '9MIxSZQhgVfEY3RVUEfkAjPGqXEA8Lfh');
    }

    addToCart (cart, productId){

        if (typeof cart === "undefined") {
            var cartPromise = this.Schema.post('/carts',{
                items:[{'product_id':productId,'quantity':1}]
            });

            return cartPromise;
        } else {

            var cartPromise = this.Schema.put('/carts/' + cart.id , {items:[{'product_id':productId,'quantity':1}]});

            return cartPromise


        }
        // this.Schema.post('/carts', {
        //     items:[{'product_id':productId,'quantity':1}]
        // }).then((response)=>{
        //     console.log (response)
        // }).catch (err => {
        //     console.log (err)
        // }

        // );

        // if (typeof cart === "undefined"){
        //     var cartPromise = this.getMarket().carts.create({
        //         items:[{'product_id':productId,'quantity':1}]
        //     })
        // } else {
        //     let cartObject = cart;
        //     var cartPromise = this.getMarket().carts.add(cartObject.id,
        //         [{'product_id':productId,'quantity':1}]
        //     )
        // }


        //return cartPromise;


    }

    getCart (cart){
        return cart;
    }

}



export default new SchemaService();