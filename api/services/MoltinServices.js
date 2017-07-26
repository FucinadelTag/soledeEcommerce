
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
        let cart = this.getMoltin().Cart.Items();
        return (cart);
    }

    addToCart (productId){

        this.getMoltin().Cart.AddProduct(productId, 1).then((cart) => {
            console.log(cart);
        });

    }

    listProducts (){
        this.getMoltin().Products.All().then((products) => {
            console.log(products);
        });
    }
}


export default new MoltinService();