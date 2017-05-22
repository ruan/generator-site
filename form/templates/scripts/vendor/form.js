$('.form-validate').each(function (f, form) {
    var $message = $(form).find('.form-message');

    $(form).parsley().on('field:validated', function () {
        var ok = $('.parsley-error').length === 0;
        $(form).find('.form-message').toggleClass('--alert --error', !ok);
        
        var $inputRadioCheck = $(this.$element).filter('[type=radio],[type=checkbox]');
        var nameRadioCheck = $inputRadioCheck.attr('name');
        if ($inputRadioCheck.parent().hasClass('parsley-error')) {
            $(form).find('input[name='+nameRadioCheck+']').parent().addClass('parsley-error');
        } else {
            $(form).find('input[name='+nameRadioCheck+']').parent().removeClass('parsley-error');
        }

        var $select = $(this.$element).filter('select');
        if ($select.hasClass('parsley-error')) { 
            $select.parent().addClass('parsley-error');
        } else {
            $select.parent().removeClass('parsley-error');
        }

        removeAlert();
    }).on('form:submit', function () {
        var inputText = $(form).find('input[type="submit"]').val();
        $(form).find('input[type="submit"]').val('Aguarde...');
        $(form).find('input[type="submit"]').prop('disabled', true);

        var url = $(form).attr('action');
        var formData = new FormData($(form)[0]);
        $.ajax({
            url: url,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function (data) {
                $(form).find('.form-message').text(data.msg);
                if (data.status) {
                    //success
                    $(form).find('.form-message').removeClass('--error').addClass('--success');
                    $(form).find('input[type="text"]').text('');
                    $(form)[0].reset();
                    $message.addClass('--alert --success');
                } else {
                    //error
                    $(form).find('.form-message').removeClass('--success').addClass('--error');
                    $message.addClass('--alert --error');
                }
                if (data.redirect) {
                    setTimeout(function () {
                        window.location.href = data.redirect;
                    }, 300)
                }
                removeAlert();
            }
        });
        $(form).find('input[type="submit"]').val(inputText);
        $(form).find('input[type="submit"]').prop('disabled', false);
        return false;
    });

    function removeAlert() {
        setTimeout(function () {
            $message.removeClass('--alert --error --success');
        }, 4000);
    }
});