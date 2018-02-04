var ValidFrom = function () {

    var handleEmailAddressEditValid = function () {

        //validate 設定
        //Reference
        //http://kudakurage.hatenadiary.com/entry/20091211/1260521031
        //http://jqueryvalidation.org/documentation/
        $("#mobile_one_email_address_edit_form").validate({
            debug: false, //debug mode
            //errorElement: "p", // element tag
            //wrapper: "label", // wrapper tag
            //errorClass: 'fadeIn animated error-msg',
            rules: {
                "mailAddress": {
                    email: true,
                    required: true
                }
            },
            messages: {
                "mailAddress": {
                    email: "<p class='fadeIn animated error-msg'><span class='ico_error'></span>正しいEmailアドレスを入力して下さい。</p>",
                    required: "<p class='fadeIn animated error-msg'><span class='ico_error'></span>Emailアドレスを入力して下さい。</p>"
                }
            }
        });
    };
    // init function
    return {
        init: function () {
            handleEmailAddressEditValid(); // handle handleEmailAddressEditValid
        }
    };
}();


jQuery(document).ready(function() {
    ValidFrom.init(); // init ValidFrom core componets
});
