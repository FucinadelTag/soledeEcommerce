
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
}


export default new MoltinService();