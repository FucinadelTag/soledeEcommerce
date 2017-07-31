'use strict';

import 'jquery.payment';
import 'form-serializer';


import braintree from 'braintree-web';

jQuery(function($) {
      $('.cc-number').payment('formatCardNumber');
      $('.cc-exp').payment('formatCardExpiry');
      $('.cc-cvc').payment('formatCardCVC');

      $.fn.toggleInputError = function(erred) {
        this.toggleClass('is-invalid-input', erred);
        this.next('.form-error').toggleClass('is-visible', erred);
        return this;
      };

      $('.cc-number').keyup(function(e) {
        let cardType = $.payment.cardType($('.cc-number').val());

        $('#iconaCarta').removeClass(function(index, className) {
            return (className.match(/(^|\s)fa-cc-\S+/g) || []).join(' ');
        });

        if (cardType === null){
            $('#iconaCarta').addClass('fa-credit-card');

        } else {
            let cardIcon = 'fa-cc-' + cardType;

            $('#iconaCarta').addClass(cardIcon);
        }
      });


    $('#formOrdine').submit(function(e) {
        e.preventDefault();

        let cardType = $.payment.cardType($('.cc-number').val());
        $('.cc-number').toggleInputError(!$.payment.validateCardNumber($('.cc-number').val()));
        $('.cc-exp').toggleInputError(!$.payment.validateCardExpiry($('.cc-exp').payment('cardExpiryVal')));
        $('.cc-cvc').toggleInputError(!$.payment.validateCardCVC($('.cc-cvc').val(), cardType));
        $('.validation').removeClass('text-danger text-success');
        $('.validation').addClass($('.has-error').length ? 'text-danger' : 'text-success');

        console.log ($('.is-invalid-input').length);

        if ($('.is-invalid-input').length <= 0) {
            braintree.client.create ({
                authorization: 'sandbox_fywvymd4_qbbdrsz2pjdq25d5'
            },function (createErr, clientInstance) {
                var formData = $('form#formOrdine').serializeObject();

                var data = {
                    creditCard: {
                        number: formData.number,
                        cvv: formData.cvc,
                        expirationDate: formData.exp.replace(/\s/g, ''),
                        billingAddress: {
                            postalCode: '20128'
                        },
                        options: {
                            validate: false
                        }
                    }
                };

                clientInstance.request({
                    endpoint: 'payment_methods/credit_cards',
                    method: 'post',
                    data: data
                }, function (requestErr, response) {
                    // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
                    if (requestErr) { throw new Error(requestErr); }

                    // saveCreditCardResponse (response.creditCards[0]);
                    // createOrder (formData);
                    console.log('Got nonce:', response.creditCards[0].nonce);
                });

            });
        }

      });
    });