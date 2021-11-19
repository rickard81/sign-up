/* ====================================================

 @contributor: Rickard Andersson
 @content: sign up form

======================================================= */

$(document).on('ready', function () {


    $('form#signup-form').on('submit', function (e) {
        
        e.preventDefault();

        var errors = validateform($(this)),
            $btn = $('input[type="submit"]', $(this));

        // Prevent duplicated submissions
        if ($btn.hasClass('disabled')) {
            e.preventDefault();
            return false;
        }

        if (errors > 0) {
            $btn.removeClass('disabled');
        }
        else {
            $btn.addClass('disabled');


            var formData = $(this).serialize();

            $.ajax({
                traditional: true,
                dataType: "json",
                url: 'https://reqres.in/api/users',
                data: {
                    formdata: formData
                },
                success: function (data) {
                    console.log('Yes');
                    $('#signup-form').addClass('hide');
                    $('#signup-success').removeClass('hide');
                },
                error: function (data) {
                    console.log('No');
                }
            });
        }

    });

});