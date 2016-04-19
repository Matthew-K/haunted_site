$(document).ready(function () {

// Validates form used for submitting a new haunted place
$("#newHauntForm").validate({
	rules: {
        name: {
            minlength: 3,
            maxlength: 30,
            required: true
        },
        image: {
        	required: true
        },
        description: {
        	maxlength: 15000,
        }
    },
    messages: {
    	description: {
    		maxlength: "Your description is too long. Please shorten it."
    	}
    },
    errorClass: "my-error-class"
});

// Checks password strength when a new user registers. Middleware was used to validate other aspects of this form just to get practice with flash messages.

/*At least 8 characters—the more characters, the better
A mixture of both uppercase and lowercase letters
A mixture of letters and numbers
Inclusion of at least one special character, e.g., ! @ # ? ]*/ 


// $.validator.addMethod("passwordStrength", function(value, element){
//     return this.optional(element) 
//     || value.length >= 8
//     && /\d/.test(value)
//     && /[a-z]/.test(value)
//     &&/[A-Z]/.test(value)
// }, "Password must at least: <li>be 8 characters long</li> <li>contain an uppercase letter</li> <li>contain a lowercase letter</li><li>contain a number</li>"
// );

// $("#registerForm").validate({
//     rules: {
//         password: {
//             required: true,
//             maxlength: 10
//         }
//     },
//     errorClass: "my-error-class"
// });


// Displays an information box showing if user has met all password requirements
// Shows a 'X' icon font to invalid classes
// Shows a checkmark icon font to valid classes
$("input[type=password]").keyup(function() {
    var password = $(this).val();
    // check for length of at least 8 characters
    if (password.length >= 8){
        $("#pwLength").removeClass("invalid").addClass('valid').find('.glyphicon-ok').show();
        $("#pwLength").find('.glyphicon-remove').hide();

    } else{
        $("#pwLength").removeClass("valid").addClass("invalid").find('.glyphicon-remove').show();
        $("#pwLength").find('.glyphicon-ok').hide();
    }
    // check for uppercase letter
    if ( password.match(/[A-Z]/) ) {
        $('#pwUppercase').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwUppercase").find('.glyphicon-remove').hide();
    } else {
        $('#pwUppercase').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwUppercase").find('.glyphicon-ok').hide();
    }
    // check for lowercase letter
    if ( password.match(/[a-z]/) ) {
        $('#pwLowercase').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwLowercase").find('.glyphicon-remove').hide();
    } else {
        $('#pwLowercase').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwLowercase").find('.glyphicon-ok').hide();
    }
    // check for number
    if ( password.match(/[0-9]/) ) {
        $('#pwNumber').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwNumber").find('.glyphicon-remove').hide();
    } else {
        $('#pwNumber').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwNumber").find('.glyphicon-ok').hide();
    }
// shows info box when user focused on password inputs
}).focus(function() {
    $("#passwordInfo").show();

// hides info box when user not focused on password inputs
}).blur(function() {
    $("#passwordInfo").hide();
});

}); // End of $(document).ready(function () {