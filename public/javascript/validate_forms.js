// Validates form used for submitting a new hautned place
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
