$(document).ready(function(){
    var $bgMenuMobile = $('.bg-menu-mobile');
    var $btMenuMobile = $('.bt-menu-mobile');
    var $menuMobile = $('#menu');

    $btMenuMobile.click(function () {
        $(this).toggleClass('--open');
        if ($(this).hasClass('--open')) {
            $bgMenuMobile.stop().fadeIn();
            $menuMobile.addClass('--open');
        } else {
            $bgMenuMobile.stop().fadeOut();
            $menuMobile.removeClass('--open');
        }
    });
});
