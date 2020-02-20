var phonenoPattern = /^\d{10}$/;
var emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//jQuery(document).ready(function($) {
$(document).ready(function() {
    event.preventDefault();
    console.log("Entering button request..........");
    var code;
    var code1;
    var code2;
    var $form = $("form[id='frmFileUp']");
    $form.on("change", "[type='file']", function() {
        console.log("On Changing file................");
        var fileExtension = ['pdf', 'doc', 'docx', 'odt'];
        if ($.inArray($(this).val().split('.').pop().toLowerCase(), fileExtension) == -1) {
	    if (document.getElementById('resume').value != ""){
		document.getElementById('your_resume').innerHTML = "This file type is not allowed.";
		document.getElementById('resume').value = "";
		return false;
	    }else if(document.getElementById('resume1').value != ""){
		document.getElementById('your_resume1').innerHTML = "This file type is not allowed.";
		document.getElementById('resume1').value = "";
		return false;
	    }else if(document.getElementById('resume2').value != ""){
		document.getElementById('your_resume2').innerHTML = "This file type is not allowed.";
		document.getElementById('resume2').value = "";
		return false;
	    }
        }else{
		document.getElementById('your_resume').innerHTML = "";
		document.getElementById('your_resume1').innerHTML = "";
		document.getElementById('your_resume2').innerHTML = "";
	}

        var $input = $(this);
        var input = $input.get(0);
        if (input.files.length) {
            input.filedata = {
                "files_data": []
            }; //Initialize as json array.
            window.file_reading = true;
            $.each(input.files, function(key, value) {
                setupReader(value, input);
            });
            window.file_reading = false;
        }
    });
    createCaptcha();

    function createCaptcha() { //creating captchaCode Component starts..
        //clear the contents of captcha div first 
        document.getElementById('captcha').innerHTML = "";
        document.getElementById('captcha1').innerHTML = "";
        document.getElementById('captcha2').innerHTML = "";
        var charsArray = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJK0123456789LMNOPQRSTUVWXYZ";
        var charsArray1 = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var charsArray2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var lengthOtp = 4;
        var captcha = [];
        var captcha1 = [];
        var captcha2 = [];
        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array	 
            if (captcha.indexOf(charsArray[index]) == -1)
                captcha.push(charsArray[index]);
            else i--;
        }

        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index1 = Math.floor(Math.random() * charsArray1.length + 1); //get the next character from the array
            if (captcha1.indexOf(charsArray1[index1]) == -1)
                captcha1.push(charsArray1[index1]);
            else i--;
        }

        for (var i = 0; i < lengthOtp; i++) {
            //below code will not allow Repetition of Characters
            var index2 = Math.floor(Math.random() * charsArray2.length + 1); //get the next character from the array
            if (captcha2.indexOf(charsArray2[index2]) == -1)
                captcha2.push(charsArray2[index2]);
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

        var canv1 = document.createElement("canvas");
        canv1.id = "captcha1";
        canv1.width = 100;
        canv1.height = 50;
        canv1.color = "red";
        var ctx1 = canv1.getContext("2d");
        ctx1.color = "red";
        ctx1.font = "25px Georgia";
        ctx1.strokeText(captcha1.join(""), 0, 30);
        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        code1 = captcha1.join("");
        document.getElementById("captcha1").appendChild(canv1);

        var canv2 = document.createElement("canvas");
        canv2.id = "captcha2";
        canv2.width = 100;
        canv2.height = 50;
        canv2.color = "red";
        var ctx2 = canv2.getContext("2d");
        ctx2.color = "red";
        ctx2.font = "25px Georgia";
        ctx2.strokeText(captcha2.join(""), 0, 30);
        //storing captcha so that can validate you can save it somewhere else according to your specific requirements
        code2 = captcha2.join("");
        document.getElementById("captcha2").appendChild(canv2);
    } //end of creating CaptchaCode Component..

    function setupReader(file, input) {
        var name = file.name;
        var reader = new FileReader();
        reader.onload = function(e) {
            input.filedata.files_data.push({
                "__file_attachment": 1,
                "filename": file.name,
                "dataurl": reader.result
            })
        }
        reader.readAsDataURL(file);
    }

    function attachFile(filedata, docname) {
        frappe.call({
            method: "kaynes_website.www.utils.attach_file",
            args: {
                "filedata": filedata,
                "doc": docname
            },
            freeze: true,
            async: false,
            callback: function(r) {}
        }); //end of frappe..

    } //end of attachFile..


    function makeJobApplicant(params, requested_form) {
        frappe.call({
            method: "kaynes_website.www.utils.make_job_applicant",
            args: {
                "params": params
            },
            async: false,
            callback: function(r) {
                if (r.message) {
                    var docname = r.message;
                    var filedata = "";
                    console.log("Recent form.........." + requested_form);
                    if (requested_form == "Job") {
                        console.log("Recently Created Job Opportunities Id.........." + r.message);
                        filedata = $('#resume').prop('filedata');
                        attachFile(filedata, docname);

                        document.getElementById('your-name').value = "";
                        document.getElementById('company-email').value = "";
                        document.getElementById('phoneno').value = "";
                        document.getElementById('address').value = "";
                        document.getElementById('cpatchaTextBox').value = "";
                        document.getElementById('salary').value = "";
                        document.getElementById('experience').value = "";
                        document.getElementById('position').value = "";
                        document.getElementById('skills').value = "";
                        document.getElementById('resume').value = "";
                    } else if (requested_form == "Internship") {
                        filedata = $('#resume1').prop('filedata');
                        attachFile(filedata, docname);

                        document.getElementById('your-name1').value = "";
                        document.getElementById('company-email1').value = "";
                        document.getElementById('phoneno1').value = "";
                        document.getElementById('address1').value = "";
                        document.getElementById('cpatchaTextBox1').value = "";
                        document.getElementById('skills1').value = "";
                        document.getElementById('resume1').value = "";
                    } else if (requested_form == "Apprentice Training") {
                        filedata = $('#resume2').prop('filedata');
                        attachFile(filedata, docname);

                        document.getElementById('your-name2').value = "";
                        document.getElementById('company-email2').value = "";
                        document.getElementById('phoneno2').value = "";
                        document.getElementById('address2').value = "";
                        document.getElementById('cpatchaTextBox2').value = "";
                        document.getElementById('skills2').value = "";
                        document.getElementById('resume2').value = "";
                    }
                    createCaptcha();
                    frappe.msgprint("Your message was sent successfully. Thanks.");
                } //end of if...
            } //end of callback.
        }); //end of frappe call.
    } //end of makeJobApplicant..

    $('.send_button').click(function() {
        var requested_form = "Job";
        console.log("Entering button request..........");
        event.preventDefault();
        if (document.getElementById("cpatchaTextBox").value == code) {
            var name = document.getElementById('your-name').value;
            var email = document.getElementById('company-email').value;
            var phoneno = document.getElementById('phoneno').value;
            var address = document.getElementById('address').value;
            var captchaCode = document.getElementById('cpatchaTextBox').value;
            var key_skills = document.getElementById('skills').value;
            var work_experience = document.getElementById('experience').value;
            var position_applied_for = document.getElementById('position').value;
            var expected_salary = document.getElementById('salary').value;
	    var resume = document.getElementById('resume').value;

            if (name != "" && email != "" && phoneno != "" && work_experience != "" && emailPattern.test(email) && phonenoPattern.test(phoneno) && position_applied_for != "" && key_skills != "" && expected_salary != "" && resume != "") {
                console.log("Entering Job Opportunities Doc......");
                var params = {
                    "name": name,
                    "phoneno": phoneno,
                    "email": email,
                    "address": address,
                    "work_experience": work_experience,
                    "captchaCode": captchaCode,
                    "position_applied_for": position_applied_for,
                    "key_skills": key_skills,
                    "expected_salary": expected_salary
                };
                console.log("After Captcha.....");
                makeJobApplicant(params, requested_form);
            }
        } else {
            //alert("Your entered code is incorrect.");
            document.getElementById('catcha_code').innerHTML = " ";
            document.getElementById('catcha_code').innerHTML = "Your entered code is incorrect.";
            document.getElementById('cpatchaTextBox').value = "";
            createCaptcha();
            return false;
        } //end of validate captchacode..
    }); //end of send button functionality..

    $('.send_button1').click(function() {
        var requested_form = "Internship";
        console.log("Entering button request.......1...");
        event.preventDefault();
        if (document.getElementById("cpatchaTextBox1").value == code1) {
            var name = document.getElementById('your-name1').value;
            var email = document.getElementById('company-email1').value;
            var phoneno = document.getElementById('phoneno1').value;
            var address = document.getElementById('address1').value;
            var captchaCode = document.getElementById('cpatchaTextBox1').value;
            var key_skills = document.getElementById('skills1').value;
	    var resume = document.getElementById('resume1').value;

            if (name != "" && email != "" && phoneno != "" && emailPattern.test(email) && phonenoPattern.test(phoneno) && key_skills != "" && resume != "") {
                console.log("Entering Job Opportunities Doc......");
                var params = {
                    "name": name,
                    "phoneno": phoneno,
                    "email": email,
                    "address": address,
                    "work_experience": 0,
                    "captchaCode": captchaCode,
                    "position_applied_for": "Internship",
                    "key_skills": key_skills,
                    "expected_salary": ""
                };
                console.log("After Captcha.....");
                makeJobApplicant(params, requested_form);
            }
        } else {
            //alert("Your entered code is incorrect.");
            document.getElementById('catcha_code1').innerHTML = " ";
            document.getElementById('catcha_code1').innerHTML = "Your entered code is incorrect.";
            document.getElementById('cpatchaTextBox1').value = "";
            createCaptcha();
            return false;
        } //end of validate captchacode..
    }); //end of send button1 functionality..

    $('.send_button2').click(function() {
        var requested_form = "Apprentice Training";
        console.log("Entering button request.......2...");
        event.preventDefault();
        if (document.getElementById("cpatchaTextBox2").value == code2) {
            var name = document.getElementById('your-name2').value;
            var email = document.getElementById('company-email2').value;
            var phoneno = document.getElementById('phoneno2').value;
            var address = document.getElementById('address2').value;
            var captchaCode = document.getElementById('cpatchaTextBox2').value;
            var key_skills = document.getElementById('skills2').value;
	    var resume = document.getElementById('resume2').value;

            if (name != "" && email != "" && phoneno != "" && emailPattern.test(email) && phonenoPattern.test(phoneno) && key_skills != "" && resume != "") {
                console.log("Entering Job Opportunities Doc......");
                var params = {
                    "name": name,
                    "phoneno": phoneno,
                    "email": email,
                    "address": address,
                    "work_experience": 0,
                    "captchaCode": captchaCode,
                    "position_applied_for": "Apprentice Training",
                    "key_skills": key_skills,
                    "expected_salary": ""
                };
                console.log("After Captcha.....");
                makeJobApplicant(params, requested_form);
            }
        } else {
            //alert("Your entered code is incorrect.");
            document.getElementById('catcha_code2').innerHTML = " ";
            document.getElementById('catcha_code2').innerHTML = "Your entered code is incorrect.";
            document.getElementById('cpatchaTextBox2').value = "";
            createCaptcha();
            return false;
        } //end of validate captchacode..
    }); //end of send button1 functionality..
}); // end of document ready function..


function validateMandatoryFieldsForJob() { //validating mandatory fields component start..
    event.preventDefault();
    console.log("Entering checkFields......" + document.getElementById("your-name").value);
    if (document.getElementById("your-name").value == "") {
        document.getElementById('name').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('name').innerHTML = " ";
    }

    if (document.getElementById("phoneno").value == "") {
        document.getElementById('phone').innerHTML = "Please fill in the required field.";
    } else if (!phonenoPattern.test(document.getElementById("phoneno").value)) {
        document.getElementById('phone').innerHTML = "Telephone number seems invalid.";
    } else {
        document.getElementById('phone').innerHTML = " ";
    }
    if (document.getElementById("company-email").value == "" || document.getElementById('company-email').value == null) {
        document.getElementById('email').innerHTML = "Please fill in the required field.";
    } else if (!emailPattern.test(document.getElementById("company-email").value)) {
        document.getElementById('email').innerHTML = "Email address seems invalid.";
    } else {
        document.getElementById('email').innerHTML = " ";
    }

    if (document.getElementById("experience").value == "") {
        document.getElementById('work_experience').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('work_experience').innerHTML = " ";
    }

    if (document.getElementById("position").value == "") {
        document.getElementById('position_applied').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('position_applied').innerHTML = " ";
    }

    if (document.getElementById("skills").value == "") {

        document.getElementById('key_skills').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('key_skills').innerHTML = " ";
    }

    if (document.getElementById("salary").value == "") {
        document.getElementById('expected_salary').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('expected_salary').innerHTML = " ";
    }

    if (document.getElementById("resume").value == "") {
        document.getElementById('your_resume').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('your_resume').innerHTML = " ";
    }

    if (document.getElementById("cpatchaTextBox").value == "") {
        document.getElementById('catcha_code').innerHTML = "Your entered code is incorrect.";
    } else {
        document.getElementById('catcha_code').innerHTML = " ";
    }
} //End of mandatory fields validations..


function validateMandatoryFieldsForInternship() { //validating mandatory fields component start..
    event.preventDefault();
    if (document.getElementById("your-name1").value == "") {
        document.getElementById('name1').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('name1').innerHTML = " ";
    }

    if (document.getElementById("phoneno1").value == "") {
        document.getElementById('phone1').innerHTML = "Please fill in the required field.";
    } else if (!phonenoPattern.test(document.getElementById("phoneno1").value)) {
        document.getElementById('phone1').innerHTML = "Telephone number seems invalid.";
    } else {
        document.getElementById('phone1').innerHTML = " ";
    }

    if (document.getElementById("company-email1").value == "" || document.getElementById('company-email1').value == null) {
        document.getElementById('email1').innerHTML = "Please fill in the required field.";
    } else if (!emailPattern.test(document.getElementById("company-email1").value)) {
        document.getElementById('email1').innerHTML = "Email address seems invalid.";
    } else {
        document.getElementById('email1').innerHTML = " ";
    }

    if (document.getElementById("skills1").value == "") {
        document.getElementById('key_skills1').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('key_skills1').innerHTML = " ";
    }

    if (document.getElementById("resume1").value == "") {
        document.getElementById('your_resume1').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('your_resume1').innerHTML = " ";
    }

    if (document.getElementById("cpatchaTextBox1").value == "") {
        document.getElementById('catcha_code1').innerHTML = "Your entered code is incorrect.";
    } else {
        document.getElementById('catcha_code1').innerHTML = " ";
    }
} //End of mandatory fields validations..

function validateMandatoryFieldsForApprentice() { //validating mandatory fields component start..
    event.preventDefault();
    if (document.getElementById("your-name2").value == "") {
        document.getElementById('name2').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('name2').innerHTML = " ";
    }

    if (document.getElementById("phoneno2").value == "") {
        document.getElementById('phone2').innerHTML = "Please fill in the required field.";
    } else if (!phonenoPattern.test(document.getElementById("phoneno2").value)) {
        document.getElementById('phone2').innerHTML = "Telephone number seems invalid.";
    } else {
        document.getElementById('phone2').innerHTML = " ";
    }

    if (document.getElementById("company-email2").value == "" || document.getElementById('company-email2').value == null) {
        document.getElementById('email2').innerHTML = "Please fill in the required field.";
    } else if (!emailPattern.test(document.getElementById("company-email2").value)) {
        document.getElementById('email2').innerHTML = "Email address seems invalid.";
    } else {
        document.getElementById('email2').innerHTML = " ";
    }


    if (document.getElementById("skills2").value == "") {
        document.getElementById('key_skills2').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('key_skills2').innerHTML = " ";
    }

    if (document.getElementById("resume2").value == "") {
        document.getElementById('your_resume2').innerHTML = "Please fill in the required field.";
    } else {
        document.getElementById('your_resume2').innerHTML = " ";
    }

    if (document.getElementById("cpatchaTextBox2").value == "") {
        console.log("Entering checkFields......2");
        document.getElementById('catcha_code2').innerHTML = "Your entered code is incorrect.";
    } else {
        document.getElementById('catcha_code2').innerHTML = " ";
    }
} //End of mandatory fields validations..
