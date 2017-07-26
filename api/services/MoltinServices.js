
import { gateway as MoltinGateway } from '@moltin/sdk';


class MoltinService {

    constructor() {

        this.Moltin = MoltinGateway({
            client_id: 'oyxCijhR7offh92JVaYv11YexL6MjJxalquG42mg'
        });

    }

    getMoltin (){
        return this.Moltin;
    }

    getCart (){
        let cartPromise = this.getMoltin().Cart.Items();
        return (cartPromise);
    }

    updateCart (itemId, quantity){
        if (quantity <= 0){
            quantity = 1;
        }

        console.log (quantity);
        let cartPromise = this.getMoltin().Cart.UpdateItemQuantity(itemId, quantity);
        return (cartPromise);
    }

    addToCart (productId){

        let cartPromise = this.getMoltin().Cart.AddProduct(productId, 1);

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

    orderCreate (formData){


        let chekoutPromise = this.getMoltin().Cart.Checkout({
            customer: {
                name: formData.nome +' '+ formData.cognome,
                email: formData.email
            },
            billing_address: {
                first_name: formData.nome,
                last_name: formData.cognome,
                line_1: 'nn',
                line_2: 'nn',
                county: 'nn',
                postcode: '20128',
                country: 'IT'
            },
            shipping_address: {
                first_name: formData.nome,
                last_name: formData.cognome,
                line_1: 'nn',
                line_2: 'nn',
                county: 'nn',
                postcode: 'nn',
                country: 'IT'
            }
        });

        return chekoutPromise;
    }
}


export default new MoltinService();