$(document).ready(function(){
    
    var windowHeight = $(window).height();
    var navbarHeight = $('nav').outerHeight(true);
    var footerHeight = $('footer').outerHeight(true);
    
    var frontLeft = $('.front-left').outerHeight(true);
    var vcenter = $('.vcenter').outerHeight(true);

    var contentHeight = windowHeight - (navbarHeight + footerHeight);
    
    $('.front-left').css('padding-top', (contentHeight - frontLeft) / 2.5);
    $('.vcenter').css('padding-top', (contentHeight - vcenter) / 2.5);

    


});