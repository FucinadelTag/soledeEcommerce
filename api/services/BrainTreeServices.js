var braintree = require("braintree");
var braintreeWeb = require("braintree-web");


class BrainTreeService {

    constructor() {
        this.gateway = braintree.connect({
            environment: braintree.Environment.Sandbox,
            merchantId: "qbbdrsz2pjdq25d5",
            publicKey: "gvs739pw5y6h88pv",
            privateKey: "4d43f994f1fd9390d7df015f888dd4a0"
        });
    }

    getClient (){
        let BrainClientPromise = braintreeWeb.client.create({
            authorization: 'sandbox_fywvymd4_qbbdrsz2pjdq25d5'
        });

        return BrainClientPromise;
    }

    nounceCreate (){
        this.getClient ().then ((client) => {
            console.log (client)
        });

    }
}



export default new BrainTreeService();