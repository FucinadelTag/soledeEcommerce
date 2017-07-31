var Marketcloud = require('marketcloud-node');
import BrainTree from '../services/BrainTreeServices.js'


class MarketcloudService {

    constructor() {

        this.Marketcloud = new Marketcloud.Client({
            "public_key" : "3453bfe9-0252-45ba-a6fe-bba5f8b34120",
            "secret_key" : "YvKlKxu0nvDeBAIHsz7Y/4Lz+g0zno/A1GzaTJNOEQs="
        })

    }

    getMarket (){
        return this.Marketcloud;
    }

    getCart (cart){
        return cart;
    }

    updateCart (cart, itemId, quantity){
        if (quantity <= 0){
            quantity = 1;
        }

        let cartId = cart.id*1;

        let cartPromise = this.getMarket().carts.update(cartId,[
            {'product_id':itemId,'quantity':quantity}
        ]);

        return (cartPromise);
    }

    addToCart (cart, productId){

        console.log (productId);

        if (typeof cart === "undefined"){
            var cartPromise = this.getMarket().carts.create({
                items:[{'product_id':productId*1,'quantity':1}]
            })
        } else {
            let cartObject = cart;
            console.log (cart);
            var cartPromise = this.getMarket().carts.add(cartObject.id,
                [{'product_id':productId*1,'quantity':1}]
            )
        }


        return cartPromise;


    }

    listProducts (){
        this.getMoltin().Products.All().then((products) => {
            console.log(products);
        });
    }

    orderPay (orderId, formData){

        let payment = this.getMoltin().Orders.Payment(orderId, {
            gateway: 'braintree',
            method: 'purchase',
            first_name: formData.nome,
            last_name: formData.cognome,
            number: formData.number,
            month: '02',
            year: '2020',
            verification_value: formData.cvc
        });

        return (payment);
    }

    async orderCreate (cartId, formData){

        let order_data = {
            cart_id: cartId,
            //payment_method_id: paymentMethodId,
            billing_address: {
                full_name: 'Prova',
                email: 'lorenzo@fucinadeltag.it',
                country: 'Italia',
                city: 'mmmm',
                address1: 'mmm',
                postal_code: 'mmm'


            }
        }

        let response = await this.getMarket().orders.create(order_data);

        return (response.data);

        // this.getMarket().orders.create(order_data).then ((response)=> {
        //     console.log (response);
        // });

        //return response.data;

    }
}


export default new MarketcloudService();