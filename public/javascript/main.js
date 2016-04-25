/*
 * Copyright (c) 2014 Mike King (@micjamking)
 *
 * jQuery Succinct plugin
 * Version 1.1.0 (October 2014)
 *
 * Licensed under the MIT License
 */
/*global jQuery*/
!function(a){"use strict";a.fn.succinct=function(b){var c=a.extend({size:240,omission:"...",ignore:!0},b);return this.each(function(){var b,d,e=a(this),f=/[!-\/:-@\[-`{-~]$/,g=function(){e.each(function(){b=a(this).html(),b.length>c.size&&(d=a.trim(b).substring(0,c.size).split(" ").slice(0,-1).join(" "),c.ignore&&(d=d.replace(f,"")),a(this).html(d+c.omission))})};g()})}}(jQuery);

// ---------------------------------------------------------------

/*Truncates each description on the index page to be no more than 135 characters and follows it with an ellipsis*/
$(function(){
    $('.galleryDescriptionText').succinct({
        size: 90
    });
});

// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------


// FORM VALIDATION - uses jQuery Validaton plugin

$(document).ready(function () {

// ==============================
//     Add Haunted Place Form 
// ==============================

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
            required: true,
            minlength: 25,
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


// ==============================
//     Register Form 
// ==============================

// Used for passwordCheck function. 
var passwordStrength = {
    length: false,
    uppercaseChar: false,
    lowercaseChar: false,
    number: false
};

// Checks to see if the values in passwordStrength are all true
var passwordCheck = function(){
    console.log("running");
    for (var condition in passwordStrength){
        if (passwordStrength[condition] === false){
            return false;
        }
    }
    return true;
};

// Custom method for jquery Validation plugin
// Uses passwordCheck function to check if all conditions for password are met. 
$.validator.addMethod("strongPassword", function(value,element){
    return this.optional(element) || passwordCheck();
}, "Your password does not meet the requirements.");

// Validates form used for submitting a new haunted place using jQuery Validation plugin
$("#registerForm").validate({
    rules: {
        username: {
            required: true,
            maxlength: 30
        },
        password: {
            required: true,
            strongPassword: true
        },
        confirmPassword: {
            required: true,
            equalTo: "#registerPassword"
        }
    },
    messages: {
        username: {
            maxlength: "Username cannot exceed 30 characters."
        },
        password: {
            required: "Please enter a password."
        },
        confirmPassword: {
            equalTo: "The passwords do not match."
        }
    },
    errorClass: "my-error-class"
});

// Displays an information box showing if user has met all password requirements
// Shows a 'X' icon font to invalid classes
// Shows a checkmark icon font to valid classes
// Updates corresponding passwordStrength values to true if condition is met
$("#registerPassword").keyup(function() {
    var password = $(this).val();
    // check for length of at least 8 characters
    if (password.length >= 8){
        $("#pwLength").removeClass("invalid").addClass('valid').find('.glyphicon-ok').show();
        $("#pwLength").find('.glyphicon-remove').hide();
        passwordStrength.length = true;

    } else{
        $("#pwLength").removeClass("valid").addClass("invalid").find('.glyphicon-remove').show();
        $("#pwLength").find('.glyphicon-ok').hide();
        passwordStrength.length = false;
    }
    // check for uppercase letter
    if ( password.match(/[A-Z]/) ) {
        $('#pwUppercase').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwUppercase").find('.glyphicon-remove').hide();
        passwordStrength.uppercaseChar = true;
    } else {
        $('#pwUppercase').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwUppercase").find('.glyphicon-ok').hide();
        passwordStrength.uppercaseChar = false;
    }
    // check for lowercase letter
    if ( password.match(/[a-z]/) ) {
        $('#pwLowercase').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwLowercase").find('.glyphicon-remove').hide();
        passwordStrength.lowercaseChar = true;
    } else {
        $('#pwLowercase').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwLowercase").find('.glyphicon-ok').hide();
        passwordStrength.lowercaseChar = false;
    }
    // check for number
    if ( password.match(/[0-9]/) ) {
        $('#pwNumber').removeClass('invalid').addClass('valid').find('.glyphicon-ok').show();
        $("#pwNumber").find('.glyphicon-remove').hide();
        passwordStrength.number = true;
    } else {
        $('#pwNumber').removeClass('valid').addClass('invalid').find('.glyphicon-remove').show();
        $("#pwNumber").find('.glyphicon-ok').hide();
        passwordStrength.number = false;
    }
// shows info box when user focused on password inputs
}).focus(function() {
    $("#passwordInfo").show();

// hides info box when user not focused on password inputs
}).blur(function() {
    $("#passwordInfo").hide();
});


}); // End of $(document).ready(function () {
