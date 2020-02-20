var phonePattern = /^\d{10}$/;
//jQuery(document).ready(function($) {
$(document).ready(function() {
    event.preventDefault();
    console.log("Entering button request..........");
    var code;
    createCaptcha();

    function createCaptcha() { //creating captchaCode Component starts..
        //clear the contents of captcha div first 
        document.getElementById('captcha').innerHTML = "";
        var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var lengthOtp = 4;
        var captcha = [];
        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }
        var canv = document.createElement("canvas");
        canv.id = "captcha";
        canv.width = 100;
        canv.height = 50;
        canv.color = "red";
        var ctx = canv.getContext("2d");
        ctx.color = "red";
        ctx.font = "25px Georgia";
        ctx.strokeText(captcha.join(""), 0, 30);
        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        code = captcha.join("");
        document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
    } //end of creating CaptchaCode Component..

    $('.send_button').click(function() {
        console.log("Entering button request..........");
        event.preventDefault();
        //debugger
        if (document.getElementById("cpatchaTextBox").value == code) {
            var name = document.getElementById('your-name').value;
            var email = document.getElementById('company-email').value;
            var phoneno = document.getElementById('phoneno').value;
            var services = document.getElementById('Services').value;
            var captchaCode = document.getElementById('cpatchaTextBox').value;
            var message = document.getElementById('message').value;
            console.log("email..." + email);
            console.log("phoneno..." + phoneno);

            if (name != "" && email != "" && phoneno != "" && services != "" && valid_email(email) && phonePattern.test(phoneno)) {
                console.log("After Captcha.....");
                frappe.call({
                    method: "kaynes_website.www.utils.make_lead",
                    args: {
                        "name": name,
                        "email": email,
                        "phoneno": phoneno,
                        "services": services,
                        "captchaCode": captchaCode,
                        "message": message
                    },
                    async: false,
                    callback: function(r) {
                        document.getElementById('your-name').value = "";
                        document.getElementById('company-email').value = "";
                        document.getElementById('phoneno').value = "";
                        document.getElementById('Services').value = "";
                        document.getElementById('cpatchaTextBox').value = "";
			document.getElementById('message').value = "";
                        createCaptcha();
                        frappe.msgprint("Your message was sent successfully. Thanks.");
                    } //end of callback.
                }); //end of frappe call.
            } //end of inner if..
            document.getElementById('catcha_code').innerHTML = " ";
        } else {
            //alert("Your entered code is incorrect.");
            document.getElementById('catcha_code').innerHTML = " ";
            document.getElementById('catcha_code').innerHTML = "Your entered code is incorrect.";
            document.getElementById('cpatchaTextBox').value = "";
            createCaptcha();
            return false;
        }

    }); //end of send button functionality..
}); // end of document ready function..



function validateMandatoryFields() { //validating mandatory fields component start..
    if (document.getElementById("your-name").value == "") {
        
        document.getElementById('name').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('name').innerHTML = " ";
    }

    if (document.getElementById("phoneno").value == "") {
        
        document.getElementById('phone').innerHTML = "Please fill in the required field.";
    } else if (!phonePattern.test(document.getElementById("phoneno").value)) {
        document.getElementById('phone').innerHTML = "Telephone number seems invalid.";
    } else {
        document.getElementById('phone').innerHTML = " ";
    }
    if (document.getElementById("company-email").value == "") {
        
        document.getElementById('email').innerHTML = "Please fill in the required field.";
    } else if (!valid_email(document.getElementById("company-email").value)) {
        document.getElementById('email').innerHTML = "Email address seems invalid.";
    } else {
        document.getElementById('email').innerHTML = " ";
    }

    if (document.getElementById("Services").value == "") {
        
        document.getElementById('services').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('services').innerHTML = " ";
    }

    if (document.getElementById("cpatchaTextBox").value == "") {
        
        document.getElementById('catcha_code').innerHTML = "Your entered code is incorrect.";
    } else {
        document.getElementById('catcha_code').innerHTML = " ";
    }
} //End of mandatory fields validations..
