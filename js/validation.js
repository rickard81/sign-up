/* ====================================================

 @contributor: Rickard Andersson
 @content: form validation

======================================================= */

/**
  * Validates any form, fields that should be validated should be marked with class 'req'.
  * The function returns number of errors
  *
  * @returns: int
  * @usage:
  * var errors = validateform($('FORM OBJECT'));
 **/

function validateform(form) {

    var $fields = $('.req', form),
        errors = 0,
        reg_mail = /^(.+)@(.+){1,}\.(.+){2,}$/,
        reg_dk_phone = /((^\d{8})|(^\d{2}[ ]\d{2}[ ]\d{2}[ ]\d{2})|(^\d{4}[ ]\d{4}))$/;

    $('.req', form).removeClass('error');
    $('.form-error', form).addClass('hide');

    $fields.each(function () {

        var $this = $(this),
            $parent = $this.parent();

        // Checkboxes
        if ($this.attr('type') == 'checkbox' && $this.is(':checked') == false) {
            $this.addClass('error');
            $parent.find('.form-error').removeClass('hide');
            errors++;
        }
        // Radio buttons
        else if ($this.is('fieldset') && $this.hasClass('radios')) {
            if (!$('input[name=' + $('input[type="radio"]', $this).attr('name') + ']:checked', $this).val()) {
                $this.addClass('error');
                $this.find('.form-error').removeClass('hide');
                errors++;
            }
        }
        // Empty check
        else if ($this.val() == '' && !$this.hasClass('phone')) {
            $this.addClass('error');
            $this.next('.form-error').removeClass('hide');
            errors++;
        }
        // Phone check
        else if ($this.hasClass('phone') && $this.val() != '' && !reg_dk_phone.test($this.val())) {
            console.log('ads');
            $this.addClass('error');
            $this.next('.form-error').removeClass('hide');
            errors++;
        }
        // Email check
        else if ($this.hasClass('email') && !reg_mail.test($this.val())) {
            $this.addClass('error');
            $this.next('.form-error').removeClass('hide');
            errors++;
        }

    });

    return errors;

}